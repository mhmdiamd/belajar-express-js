import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.send(req.query);
});

test('Request Query', async () => {
  const response = await request(app).get('/').query({ firstName: 'Muhamad Ilham', lastName: 'Darmawan' });

  expect(response.text).toBe('Hello Muhamad Ilham Darmawan');
});
