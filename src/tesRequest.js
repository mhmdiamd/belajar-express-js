import express from 'express';

export class Products {
  storeProducts = [
    {
      id: 1,
      name: 'T-shirt',
      price: 30000,
      color: 'red',
    },
  ];

  getLastIdProducts = () => {
    return this.storeProducts[this.storeProducts.length - 1].id;
  };

  getProducts = () => {
    const products = [];
    this.storeProducts.forEach((product) => {
      products.push(product);
    });
    return products;
  };

  addProduct = ({ name, price, color }) => {
    this.storeProducts.push({
      name: name,
      price: price,
      color: color,
    });
  };

  updateProduct = (id, data) => {
    const products = this.getProducts();
    let dataProducts = [];
    products.forEach((product) => {
      if (product.id == id) {
        product = data;
        dataProducts.push(product);
      } else {
        dataProducts.push(product);
      }
    });
    this.storeProducts = dataProducts;
  };

  deleteProduct = (id) => {
    const products = this.getProducts();
    products.forEach((product) => {
      if (product.id == id) {
        this.storeProducts[product.id].slice();
      }
    });
  };
}

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
  });

app.listen(3000, () => {
  console.log('Server Start');
});
