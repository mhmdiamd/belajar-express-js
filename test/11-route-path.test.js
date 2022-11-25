import express from 'express';
import request from 'supertest';

const app = express();

app.get('/products/*.json', (req, res) => {
  res.send(req.originalUrl);
});

// Fungsi Regex (\\d+) adalah sebagai middleware dimana endpoint yang akan ditembak harus berupa desimal
// Contoh : /categories/1234.json
app.get('/categories/*(\\d+).json', (req, res) => {
  res.send(req.originalUrl);
});

test('Route path to regex', async () => {
  let response = await request(app).get('/products/ilham.json');
  expect(response.text).toBe('/products/ilham.json');

  response = await request(app).get('/products/salah.json');
  expect(response.text).toBe('/products/salah.json');

  response = await request(app).get('/categories/1234.json');
  expect(response.text).toBe('/categories/1234.json');

  // Untuk mengecek jika tidak menggunakan desimal pada endpoint yang dikasih regex
  response = await request(app).get('/categories/salah.json');
  expect(response.status).toBe(404);
  // outputnya success, yang mana tidak ditemukan route /categories/salah.json, hal ini terjadi karena kita menggunakan Regex format untuk membuat endpoint kita hanya bisa diakses oleh decimal (\\d+)
});
