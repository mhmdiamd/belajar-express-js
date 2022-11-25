import express from 'express';
import { Products } from '../src/tesRequest.js';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const productsDB = new Products();

app
  .route('/product')
  .get((req, res) => {
    res.status(200);
    res.json({
      status: 'Success!',
      data: productsDB.getProducts(),
    });
  })
  .post((req, res) => {
    if (req.body) {
      productsDB.addProduct(req.body);
      res.status(200);
      res.json({
        status: 'Success!',
        data: productsDB.getProducts(),
      });
    }
    console.log(req);
  });
// .put('/:idUser', (req, res) => {
//   const idUser = req.params.idUser;
//   if (idUser) {
//     res.status(200).json({
//       status: 'Success!',
//       data: productsDB.getProducts(),
//     });
//   }
//   res.status(304).json({
//     status: 'Failed!',
//     message: 'Error',
//   });
// });

test('test get', async () => {
  const response = await request(app).get('/product').set('Content-Type', 'application/json');
  expect(response.body).toEqual({
    status: 'Success!',
    data: [
      {
        id: 1,
        name: 'T-shirt',
        price: 30000,
        color: 'red',
      },
    ],
  });
});

test('test post', async () => {
  const response = await request(app).post('/product').set('Content-Type', 'application/x-www-form-urlencoded').send('name=Muhamad Ilham Darmawan', 'price=3000');
  expect(response.body).toEqual({
    status: 'Success!',
    data: [
      {
        id: 1,
        name: 'T-shirt',
        price: 30000,
        color: 'red',
      },
      {
        id: 2,
        name: 'Muhamad Ilham Darmawan',
        price: 30000,
        color: 'red',
      },
    ],
  });
});
