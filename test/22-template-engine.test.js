import express from 'express';
import mustacheExpress from 'mustache-express';
import request from 'supertest';

// Template engine adalah library yang digunakan untuk membuat template lalu mempermudah kita ketika kita ingin menampilkan data di templatenya, Biasanya templatenya dalam bentuk html, dan datanya bisa kita ubah sesuai dengan data yang ingin kita tampilkan di HTML tersebut

// Pada Materi ini kita akan menggunakan Library Template Engine pada express js yang bernama Mustache, alasan kenapa menggunakan mustache karena mustache mudah untuk digunakan

// Contoh :
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', mustacheExpress());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Muhamad Ilham Darmawan',
    name: 'Ilham',
  });
});

test('Tempate Engine', async () => {
  const response = await request(app).get('/');
  expect(response.text).toContain('Muhamad Ilham Darmawan');
  expect(response.text).toContain('Ilham');
});
