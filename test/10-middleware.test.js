import express from 'express';
import request from 'supertest';

const logger = (req, res, next) => {
  console.info(`Recive Request : ${req.method}, ${req.originalUrl}`);
  next();
};

const addPoweredBy = (req, res, next) => {
  res.set('X-Powered-By', 'Muhamad Ilham');
  next();
};

// Middleware dengan query params yaitu apiKey
const checkApiKey = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Middleware Request Manipulation, mendapatkan waktu request
const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();
app.use(logger);
app.use(checkApiKey);
app.use(addPoweredBy);
app.use(requestTimeMiddleware);

app.get('/', (req, res) => {
  res.send('Hello Response');
});

app.get('/time', (req, res) => {
  res.send(`Hello, is it Time : ${req.requestTime}`);
});

// Unit Testing jika tidak ada Query API KEY
test('Middleware', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(401);
  expect(response.text).toBe('Unauthorized');
});

// Unit Testing jika mempunyai API KEY
test('Middleware check API KEY', async () => {
  const response = await request(app).get('/').query({ apiKey: '12345' });
  expect(response.get('X-Powered-By')).toBe('Muhamad Ilham');
  expect(response.text).toBe('Hello Response');
});

// Unit Testing Request Manipulation
test('Middleware Manipuation Request', async () => {
  const response = await request(app).get('/time').query({ apiKey: '12345' });
  expect(response.text).toContain('Hello, is it Time : ');
});
