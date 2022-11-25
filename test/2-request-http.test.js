import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

test('request url', async () => {
  const response = await request(app).get('/').query({ name: 'Muhamad Ilham Darmawan' });
  expect(response.text).toBe('Hello Muhamad Ilham Darmawan');
});
