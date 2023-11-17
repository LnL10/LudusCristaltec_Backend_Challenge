const request = require('supertest');
const { app, server } = require('../server');


describe('Cat Controller Test', () => {
  it('Get all cats', async () => {
    const response = await request(app).get('/api/cats');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.cats)).toBe(true);
  });

  it('Create Cat', async () => {
    const catData = {
      name: 'Leonel',
      age: 2,
      weight: 5,
      tags: ['Cute', 'Big'],
    };

    const response = await request(app)
      .post('/api/cats')
      .send(catData)
      .expect(200);
      
    expect(response.body).toHaveProperty('message', `Cat ${catData.name} created`);
    expect(response.body).toHaveProperty('cat');
  });

  it('Return an error for missing parameters', async () => {
    const invalidCatData = {
    };

    const response = await request(app)
      .post('/api/cats')
      .send(invalidCatData)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Invalid parameters: name, age, weight, and tags are mandatory.');
  });

  it('Return cat details by ID', async () => {
    
    const response = await request(app)
      .get("/api/cats/1")
      .expect(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('age');
    expect(response.body).toHaveProperty('weight');
    expect(response.body).toHaveProperty('tags');
    
  });

  it('Update cat details', async () => {

    const updateData = {
      name: 'Teixeira',
      age: 4,
      weight: 7,
      tags: ['Small', 'White'],
    };

    const response = await request(app)
      .put("/api/cats/6")
      .send(updateData)
      .expect(200);

    expect(response.body).toHaveProperty('name',updateData.name);
    expect(response.body).toHaveProperty('age', updateData.age);
    expect(response.body).toHaveProperty('weight', updateData.weight);
  
  });

  it('Delete cat ', async () => {

    const response = await request(app)
      .delete("/api/cats/6")
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Cat deleted successfully');
  });

  it('Return an error for non-existing cat ID', async () => {

    const response = await request(app)
      .delete("/api/cats/1999")
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Cat not found');
  });

  it('Return a random cat', async () => {
    const response = await request(app)
      .get('/api/cats/random')
      .expect(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('age');
    expect(response.body).toHaveProperty('weight');
    expect(response.body).toHaveProperty('tags');
  });

  it('Search cat by name', async () => {
    const response = await request(app)
      .get('/api/cats/search')
      .query({ name: 'Faisca' }) 
      .expect(200);

      const cats = response.body;

      expect(cats.length).toBeGreaterThan(0);
  
      expect(cats[0]).toHaveProperty('name', 'Faisca');
  });

  it('Return tag counts', async () => {
    const response = await request(app).get('/api/cats/tags');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tag Counts:');
    expect(response.body).toHaveProperty('tags');
    expect(response.body.tags).toBeInstanceOf(Object);

  });

  it('Return cat ratings', async () => {
    const response = await request(app).get('/api/cats/1/ratings');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('average');
    expect(response.body).toHaveProperty('ratings');
  });

  /*it('Return a list of cats', async () => {
    const response = await request(app).get('/api/cats/ratings/average');

    expect(response.status).toBe(200);

    for (const cat of response.body) {
      expect(cat).toHaveProperty('averageRating');
    }
  });*/








    

  afterAll(async () => {
    server.close();
  });
});