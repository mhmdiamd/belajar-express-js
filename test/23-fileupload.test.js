import express from 'express';
import request from 'supertest';
import expressFileUpload from 'express-fileupload';

/*
  Express tidak mendukung file upload, oleh karna itu kita menggunakan third-party-middleware
  , yang bernama express-fileupload
*/

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressFileUpload());

app.get('/json', (req, res) => {
  const name = req.body.name;
  res.json({
    name: name,
  });
});

app.get('/form', (req, res) => {
  const name = req.body.name;
  res.json({
    name: name,
  });
});

app.post('/file', async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + '/upload/' + textFile.name);

  res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

test('File Request Upload', async () => {
  const response = await request(app)
    .post('/file')
    .set('Content-Type', 'multipart/form-data')
    .field('name', 'Ilham')
    .attach('article', __dirname + '/19-response-body.txt');
  // .send({ name: 'World' });

  expect(response.text).toBe(`Hello Ilham, you uploaded 19-response-body.txt`);
});
