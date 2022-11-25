import express from 'express';
import request from 'supertest';

// Untuk Error handling kita bisa menggunakan Error Handling Middleware, yang mana pada error handling middleware ini kita butuh 4 parameter, yaitu error, request, response, dan next
// Contoh : const errorMiddleware = (err, req, res, next) => {}

const app = express();

// Buat Middleware Error Handling
const errorHandling = (err, req, res, next) => {
  res.status(500).send(`Terjadi Error : ${err.message}`);
};

app.get('/', (req, res) => {
  throw new Error('Ups');
});
app.use(errorHandling);

test('Error Handling Middleware', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(500);
  expect(response.text).toBe('Terjadi Error : Ups');
});
