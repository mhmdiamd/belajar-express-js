import express from 'express';
import request from 'supertest';
/*
  Type of Middleware 
  1.  Application level Middleware
      - Middleware yang digunakan di Object Application, dengan menggunakan function app.use(middleware)
      - Saat kita menggunakan Application level middleware, maka secara otomatis Middleware tersebut akan dipanggil disemua route
      - Jika kita mau menggunakan Middleware pada route path tertentu, kita bisa tambahkan route pattern  ketika mengguanakn app.use, misal app.use('/products/*', middleware)

  2.  Router Level middleware
      - Middleware yang ditambahkan pada object Router yang kita buat menggunakan express.Router()
      - Middleware ini secara otomatis akan dipanggil ketika request masuk ke router ini
      - Jika kita ingin middleware nya hanya dipaggil pada route path tertentu, kita bisa tambahkan route pattern ketika menggunakan middleware nya menggunakan route.use(path, middleware)

  3.  Error handling middleware
      - Middleware yang akan dipanggil ketika terjadi error di aplikasi kita (throw Error)
      - cara penggunaan mirip dengan Application level Middleware, yang membedakan adalah functon callback nya memiliki empat parameter, yaitu error, request, response dan next
      - Object Error akan secara otomatis terisi oleh data error yang terjadi di aplikasi kita
      - Middleware ini, sangat cocok ketika kita ingin menampilkan tampilan yang berbeda ketika terjadi error di aplikasi kita

  4.  Built in middleware 
      - Built in Middleware diguanakan untuk melakukan request dan response, termasuk terdapat built in middleware
      - express.json(), yaitu middleware yang melakukan parsing request body menjadi JavaScript Object
      - express.text(), yaitu middleware yang melakukan parsing request body menjadi string
      - express.raw(), yaitu middleware yang menalukan parsing request body menjadi buffer
      - express.urlencoded(), yaitu middleware yang melakukan parsing request body form menjadi object
      - express.static(), yaitu middleware yang digunakan unutk melayani file static

  5.  Third Party Middlewaree
      - middleware buatan orang lain yang kita gunakan
      - untuk menggunakanya, kita perlu menambah dependency middlewarenya terlebih dahulu
*/

const app = express();

// Application level middleware
app.use((req, res, next) => {});
