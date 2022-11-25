import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/json', (req, res) => {
  const name = req.body.name;
  res.send(`Hello ${name}`);
});

app.post('/json/get-data-json', (req, res) => {
  const name = req.body.name;
  res.json({
    name: name,
  });
});

app.post('/form', (req, res) => {
  const name = req.body.name;
  res.json({
    name: `Hello ${name}`,
  });
});

test('Request body JSON', async () => {
  let response = await request(app).post('/json').set('Content-Type', 'application/json').send({ name: 'Ilham' });

  expect(response.text).toBe('Hello Ilham');

  response = await request(app).post('/json/get-data-json').send({ name: 'Muhamad Ilham Darmawan' });
  expect(response.body).toEqual({
    name: 'Muhamad Ilham Darmawan',
  });
});

test('Request body FORM', async () => {
  const response = await request(app).post('/form').set('Cotent-Type', 'applicatiaon/x-www-form-urlencoded').send('name=Muhamad Ilham Darmawan');
  expect(response.body).toEqual({
    name: 'Hello Muhamad Ilham Darmawan',
  });
});
