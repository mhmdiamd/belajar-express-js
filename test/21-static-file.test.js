import express from 'express';
import request from 'supertest';

/*
  Static File : 
    - middleware yang bisa kita gunakan untuk menyediakan static file.
    - middleware ini seca otomatis akan mencari file, jika ada, maka akan dikembalikan file tersebut, jika tidak ada, maka akan dilanjutkan ke middleware atau route selanjutnya
    - kita bisa menggunakan Middleware express.static()
*/

const app = express();
// app.use(express.static(__dirname + '/static'));
// Static file dengan prefix
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.send('Hello Ilham');
});

test('test static file', async () => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello Ilham');
});

// Static file using Prefix
test('test static file /21-static-file.txt', async () => {
  const response = await request(app).get('/static/21-static-file.txt');
  expect(response.text).toContain('This is static file');
});

// test('test static file /21-static-file.txt', async () => {
//   const response = await request(app).get('/21-static-file.txt');
//   expect(response.text).toContain('This is static file');
// });
