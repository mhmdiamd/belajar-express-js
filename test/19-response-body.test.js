import express from 'express';
import request from 'supertest';

/*
  Response Body Method -> 
    - res.send(data) => response berupa raw
    - res.download(path, filename, option) => response berupa file download
    - res.json(body) => Response berupa JSON
    - res.redirect(url) => Response redirect url
    - res.sendFile(path, option) => Response berupa file
*/

const app = express();

// Res.sendFile
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/19-response-body.txt');
});

test('Response Body sendFile', async () => {
  const response = await request(app).get('/');
  // cek bahwa isi dari file 19-response-body.txt terdapat kata "This is Sample text"
  expect(response.text).toContain('This is Sample text');
});
