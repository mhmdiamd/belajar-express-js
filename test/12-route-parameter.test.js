import express, { response } from 'express';
import request from 'supertest';

const app = express();

// Untuk menggunakan parameter pada endpoint, maka gunakan prefix : (titik dua) sebelum penamaan parameternya, hal ini berfungsi untuk mendapatkan data yang ada pada parameter tersebut
app.get('/product/:idProduct', (req, res) => {
  res.send(req.params.idProduct);
});

// Kita juga bisa menambahkan format regex untuk mengatur data apa saja yang diperbolehkan untuk mengspesifikan data apa yang boleh menjadi parameter kita
app.get('/users/:idUser(\\d+)', (req, res) => {
  res.send(req.params.idUser);
});

app.get('/product/:idProduct/user/:idUser', (req, res) => {
  res.send(`Hello ${req.params.idProduct}, ${req.params.idUser}`);
});

test('Route Parameter', async () => {
  // Untuk mengecek parameter dengan nama idProduct
  let response = await request(app).get('/product/2');
  expect(response.text).toBe('2');

  // Validasi untuk endpoint yang terdapat format regexnya
  response = await request(app).get('/users/salah');
  expect(response.status).toBe(404);

  // Multiple parameter
  response = await request(app).get('/product/2/user/3');
  expect(response.text).toBe('Hello 2, 3');
});
