import express from 'express';
import request from 'supertest';

const app = express();

// kita bisa menggunakan middleware untuk enghandle error 404 atau route yang tidak tersedia pada route path yang diakses

app.get('/', (req, res) => {
  res.send('Halaman ditemukan');
});

app.use((req, res, next) => {
  res.status(404).send('404 Tidak ditemukan Euy');
});

test('not found error handler', async () => {});
