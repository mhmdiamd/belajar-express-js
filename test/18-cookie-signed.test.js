import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use(cookieParser('SECRETKEY'));

app.get('/', (req, res) => {
  const name = req.signedCookies['Login'];
  res.cookie('Login', name, { path: '/' });
  res.send(`Hello ${name}`);
});

app.get('/login', (req, res) => {
  const name = req.body.name;
  res.cookie('Login', name, { path: '/', signed: true });
  res.send(`Hello ${name}`);
});

test('Cookie', async () => {
  const response = await request(app).get('/').set('Cookie', 'Login=s%3AIlham.q2mGUrXrPHGGrTxN5yO%2F7ecRbnUFS6uZUHeeOQRoSmE; Path=/');
  expect(response.get('Set-Cookie').toString()).toBe('Login=Ilham; Path=/');
  expect(response.text).toBe('Hello Ilham');
});

test('Signed Cookie', async () => {
  const response = await request(app).get('/login').send({ name: 'Ilham' });
  // expect(response.get('Set-Cookie').toString()).toBe('Login=Ilham; Path=/');
  // expect(response.get('Set-Cookie').toString()).toBe()
  console.log(response.get('Set-Cookie'));
  expect(response.text).toBe('Hello Ilham');
});
