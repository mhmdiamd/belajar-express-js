import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  if (req.query.name) {
    res.status(200).send(`Hello ${req.query.name}`);
  } else {
    res.status(401).send(`Unauthorized`);
  }
});

test('Response Status', async () => {
  let response = await request(app).get('/').query({ name: 'Muhamad Ilham' });
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello Muhamad Ilham');

  response = await request(app).get('/');
  expect(response.status).toBe(401);
  expect(response.text).toBe('Unauthorized');
});
