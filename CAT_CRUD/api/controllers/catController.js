const { Cat, CatRating, Tag} = require('../models'); 



const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.findAll({
      attributes: ['name', 'age', 'weight'],
      include: {
        model: Tag,
        as: 'tags',
        through: {
          attributes: [], 
        },
        attributes: ['name'],
      },
    });
    const totalCats = cats.length;

    const catsFormated = cats.map((cat) => {
      const tags = cat.tags.map((tag) => tag.name);
      return {
        name: cat.name,
        age: cat.age,
        weight: cat.weight,
        tags: tags,
      };
    });
    
    const response = {
      message: `Total cats found: ${totalCats}`,
      cats: catsFormated,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const createCat = async (req, res) => {
  try {
    const { name, age, weight, tags } = req.body;

    if (!name || !age || !weight || !tags) {
      return res.status(400).json({ error: 'Invalid parameters: name, age, weight, and tags are mandatory.' });
    }

    const cat = await Cat.create({ name, age, weight });

    const catTags = [];

    for (const tagString of tags) {
      const [tag, created] = await Tag.findOrCreate({
        where: { name: tagString },
      });
      catTags.push(tag); 
    }
    
    await cat.setTags(catTags);

    const catAttributes = {
      id: cat.id,
      name: cat.name,
      age: cat.age,
      weight: cat.weight,
      tags:tags, 
    };

    const response = {
      message: `Cat ${name} created`,
      cat: catAttributes,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


const getCatById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID. The id must be an integer' });
    }

    const cat = await Cat.findByPk(req.params.id, {
      attributes: ['name', 'age', 'weight'],
      include: {
        model: Tag,
        as: 'tags',
        through: {
          attributes: [],
        },
        attributes: ['name'],
      },
    });

    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    const tags = cat.tags.map((tag) => tag.name);

    const catResponse = {
      name: cat.name,
      age: cat.age,
      weight: cat.weight,
      tags: tags,
    };

    res.json(catResponse);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


const updateCat = async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    const { name, age, weight, tags } = req.body;

    await cat.update({ name, age, weight });

    await cat.setTags([]);

    if (tags && tags.length > 0) {
      for (const tagString of tags) {
        const [tag, created] = await Tag.findOrCreate({
          where: { name: tagString },
        });
        await cat.addTag(tag);
      }
    }
    
    cat.tags = tags;

    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


const deleteCat = async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    const catTags = await cat.getTags();
    
    if (catTags.length > 0) {
      await cat.removeTags(catTags);
    }
    await cat.destroy();
    res.json({ message: 'Cat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getRandomCat = async (req, res) => {
  try {
    const totalCats = await Cat.count();

    const randomIndex = Math.floor(Math.random() * totalCats);
    const randomCat = await Cat.findOne({
      offset: randomIndex,
      limit: 1,
      include: {
        model: Tag,
        as: 'tags',
        through: {
          attributes: [],
        },
        attributes: ['name'], 
      },
    });

    if (!randomCat) {
      res.status(404).json({ message: 'Random cat not found' });
    } else {
      const tags = randomCat.tags.map((tag) => tag.name);

      const randomCatWithTags = {
        name: randomCat.name,
        age: randomCat.age,
        weight: randomCat.weight,
        tags: tags,
      };

      res.json(randomCatWithTags);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


const searchCatByName = async (req, res) => {
  try {
    const { name } = req.query;
    const cats = await Cat.findAll({
      where: { name: name },
      include: {
        model: Tag,
        as: 'tags',
        through: {
          attributes: [], 
        },
        attributes: ['name'], 
      },
    });

    if (cats.length === 0) {
      res.status(404).json({ message: 'Cat not found' });
    } else {
      
      const catsWithTags = cats.map((cat) => {
        const tags = cat.tags.map((tag) => tag.name);
        return {
          name: cat.name,
          age: cat.age,
          weight: cat.weight,
          tags: tags,
        };
      });

      res.json(catsWithTags);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};



const getTags = async (req, res) => {
  try {
    
    const cats = await Cat.findAll({
      include: {
        model: Tag,
        as: 'tags',
        through: 'CatTag',
      },
    });
    
    const tagCounts = {};

    cats.forEach((cat) => {
      cat.tags.forEach((tag) => {
        console.log(tag)
        const tagName = tag.name;

        if (tagCounts[tagName]) {
          tagCounts[tagName] += 1;
        } else {
          tagCounts[tagName] = 1;
        }
      });
    });



    const tagCountArray = Object.entries(tagCounts);
    tagCountArray.sort((a, b) => b[1] - a[1]);

    const sortedTagCounts = {};
    tagCountArray.forEach(([tag, count]) => {
      sortedTagCounts[tag] = count;
    });

    const response = {
      message: 'Tag Counts:',
      tags: sortedTagCounts,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


const createCatRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.query;

    if (isNaN(id) || isNaN(rating)) {
      return res.status(400).json({ error: 'Invalid ID or rating. Both must be integers.' });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10.' });
    }

    const cat = await Cat.findByPk(id);

    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    const catRating = await CatRating.create({rating });

    await cat.addCatRating(catRating);

    res.json({ message: `Rating ${catRating.rating} was associated to the cat ${cat.name}`});
    
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getRatings = async(req,res) =>{
  try{
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID need to be integer.' });
    }

    const cat = await Cat.findByPk(id);
    
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }

    const ratings = await cat.getCatRatings();

    const ratingValues = ratings.map((rating) => rating.rating);
    
    let sum = 0;
    for (const rating of ratingValues) {
      sum += rating;
    }
    const average = sum / ratingValues.length;

    res.json({ name: cat.name, average, ratings: ratingValues.join(', ') });

  }catch(error){
    res.status(500).json({ error: 'Server Error' });
  }
}


const catAverage  = async(req,res) =>{
  try{
    const cats = await Cat.findAll({
      include: {
        model: CatRating,
        attributes: ['rating'],
      },
      attributes: ['name'],
    });

    const catAverages = cats
      .map((cat) => {
        const ratings = cat.CatRatings.map((rating) => rating.rating);
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        const averageRating = ratings.length > 0 ? sum / ratings.length : null;

        return { name: cat.name, averageRating };
      })
      .filter((cat) => cat.averageRating !== null);

    catAverages.sort((a, b) => b.averageRating - a.averageRating);

    res.json(catAverages);

  }catch(error){
    res.status(500).json({ error: 'Server Error' });
  }
}



module.exports = {
  getAllCats,
  createCat,
  getCatById,
  updateCat,
  deleteCat,
  getRandomCat,
  searchCatByName,
  getTags,
  createCatRating,
  getRatings,
  catAverage,
};
