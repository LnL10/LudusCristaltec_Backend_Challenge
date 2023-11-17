const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/v1/tags', async (req, res) => {
  try {
    const response = await axios.get('https://cataas.com/api/tags');
    const tags = response.data;
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint 2: GET - /api/v1/cats/filter
app.get('/api/v1/cats/filter', async (req, res) => {
  const { tag, omit, total } = req.query;

  const errors = [];

  if (!tag) {
    errors.push( 'Tag is missing' );
  } else if (typeof tag !== 'string') {
    errors.push('Tag must be a string' );
  }

  if (!omit) {
    errors.push('Omit is missing' );
  } else if (isNaN(omit)) {
    errors.push( 'Omit must be a number');
  }

  if (!total) {
    errors.push( 'Total is missing' );
  } else if (isNaN(total)) {
    errors.push('Total must be a number' );
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } 
  else {
    try{
      const response = await axios.get(`https://cataas.com/api/cats?tags=${tag}`);

      
      const allCats = response.data;

      if (allCats.length == 0) {
        return res.status(404).json({ error: 'Tag not found' });
      }

      const startIndex = parseInt(omit);
      const endIndex = startIndex + parseInt(total);
      const matchingCats = allCats.slice(startIndex, endIndex);
      
      res.json(matchingCats);
      
    } catch(error){
      res.status(500).json({ error: ' Server Error' });
    }
  }
});

// Endpoint 3: GET - /api/v1/cats/match
app.get('/api/v1/cats/match', async (req, res) => {
  const { string } = req.query;

  if (!string) {
    return res.status(400).json({ error: 'Missing parameter: substr' });
  }

  try {
   
    const response = await axios.get('https://cataas.com/api/cats?limit=50'); // Por default o limit é 10
    const allCats = response.data;                                            //  aumentei para ter mais resultados com qualquer string. 

    const matchingCats = allCats.filter(cat => {
      return cat.tags.some(tag => tag.includes(string));
    });
    
    res.json(matchingCats);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}, Try the API in Postman!`);
});

module.exports = {server,app};
