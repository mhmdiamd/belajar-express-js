import express from 'express';
import request from 'supertest';

const app = express();

app.get('/http/world', (req, res) => {
  res.json({
    pathname: req.path,
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
  });
});

test('Request url test', async () => {
  const response = await request(app).get('/http/world').query({ name: 'Ilham' });
  expect(response.body).toEqual({
    pathname: '/http/world',
    originalUrl: '/http/world?name=Ilham',
    hostname: '127.0.0.1',
    protocol: 'http',
    secure: false,
  });
});
