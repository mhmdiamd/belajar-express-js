import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.redirect('/hello-page');
});

test('Response Redrect', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(302);
  expect(response.get('location')).toBe('/hello-page');
});
