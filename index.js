import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import fetch from 'fetch';
const template = require('jade').compileFile(__dirname + '/src/templates/homepage.jade');
import fs from "fs";
import browserify from "browserify";
browserify(["./src/js/main.js"])
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
  .pipe(fs.createWriteStream("./dist/js/main.js"));

let pics = [];
// for(let i = 0; i < 10; i++) {
//   fetch.fetchUrl('http://www.splashbase.co/api/v1/images/random?images_only=true', (error, meta, body) => {
//     body = JSON.parse(body);
//     pics.push(body);
//   });
// }

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  const html = template({ title: 'Photo App'});
  res.send(html);
});

const server = app.listen(3000, () => {
  let host = server.address().address;
  host = host === '::' ? 'localhost' : host;
  const port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
