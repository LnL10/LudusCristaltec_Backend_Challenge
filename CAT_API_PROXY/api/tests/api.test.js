const request = require('supertest');
const {server,app} = require('../server'); 

describe('ENDPOINTS TEST', () => {
  it('Return an array of tags /api/v1/tags', async () => {
    const response = await request(app).get('/api/v1/tags');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Return an array of tags with length = 10 /api/v1/cats/filter', async () => {
    const response = await request(app).get('/api/v1/cats/filter?tag=cute&omit=0&total=10');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(10);
  });

  it('Return an array of cats /api/v1/cats/match', async () => {
    const response = await request(app).get('/api/v1/cats/match?string=br');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Error because missing parameter substr /api/v1/cats/match', async () => {
    const response = await request(app).get('/api/v1/cats/match');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing parameter: substr' });
  });

  afterAll(async () => {
    server.close();
  });

});
