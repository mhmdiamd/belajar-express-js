import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

/*
  Cookie : 
    - Dalam HTTP, salah satu fitur yang biasa digunakan untuk pertukaran data dari server dan Client adalah Cookie
    - Banyak yang menggunakan Cookie sebagai session misalnya
    - Sayangnya, secara defualt, ExpressJS tidak mendukung Cookie, tapi jangan khawatir, kita bisa menggunakan Third-Party Middleware untuk mendukung cookie ini

    Cookie Parser : 
      - Cookie Parser adalah salah satu Third-party Middleware yang bisa kita gunakan untuk mendukung fitur Cookie, dimana dengan Cookie Parser, kita secara otomatis menyimpan data ke Cookie, atau mengambil data ke Cookie
*/

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  const name = req.cookies['name'];
  res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
  const name = req.body.name;
  res.cookie('Login', name, { path: '/' });
  res.send(`Hello ${name}`);
});

test('Test Cookie', async () => {
  const response = await request(app).get('/').set('Cookie', 'name=Muhamad Ilham Darmawan; author=Ilham');
  expect(response.text).toBe('Hello Muhamad Ilham Darmawan');
});

test('Test Cookie Write', async () => {
  const response = await request(app).post('/login').send({ name: 'Muhamad Ilham Darmawan' });
  expect(response.get('Set-Cookie').toString()).toBe('Login=Muhamad%20Ilham%20Darmawan; Path=/');
  expect(response.text).toBe('Hello Muhamad Ilham Darmawan');
});
