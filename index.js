const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require("fetch");
const template = require('jade').compileFile(__dirname + '/src/templates/homepage.jade');

// source file is iso-8859-15 but it is converted to utf-8 automatically
let pics = [];
for(var i = 0; i < 10; i++) {
  fetch.fetchUrl('http://www.splashbase.co/api/v1/images/random?images_only=true', (error, meta, body) => {
    body = JSON.parse(body);
    pics.push(body);
  });
}

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  const html = template({ title: 'Photo App', images: pics });

  res.send(html);
});

const server = app.listen(3000, () => {
  let host = server.address().address;
  host = host === '::' ? 'localhost' : host;
  const port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
