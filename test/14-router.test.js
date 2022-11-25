import express from 'express';
import request from 'supertest';

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.info(`Response recive : ${req.originalUrl}`);
  next();
});
router.get('/feature/a', (req, res) => {
  res.send('feature a');
});

test('Router disabled', async () => {
  const response = await request(app).get('/feature/a');
  expect(response.status).toBe(404);
});

test('Router enable', async () => {
  app.use(router);

  const response = await request(app).get('/feature/a');
  expect(response.text).toBe('feature a');
});
clear