import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.set({
    'X-Powered-By': 'Muhamad Ilham Darmawan',
    'X-Author': 'Ilham',
  });

  res.send('Hello Response');
});

test('Response Header', async () => {
  const response = await request(app).get('/');
  expect(response.get('X-Powered-By')).toBe('Muhamad Ilham Darmawan');

  expect(response.text).toBe('Hello Response');
});
