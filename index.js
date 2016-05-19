import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import fs from "fs";
import browserify from "browserify";
import {Twitter} from 'twitter-node-client';
import Forecast from 'forecast.io-bluebird';

const template = require('jade').compileFile(__dirname + '/src/templates/homepage.jade');

// import {weatherImageSearch} from './src/js/twitterSearch';
import config from './src/config/config.js';

// browserify setup
browserify(["./src/js/main.js"])
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
  .pipe(fs.createWriteStream("./dist/js/main.js"));

//Callback functions
let twitterError = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
let twitterResponse = [];
let twitterConfig = config.twitter;
let twitter = new Twitter(twitterConfig);
let forecast = new Forecast({
    key: config.darkSkyConfig.apiKey,
    timeout: 2500
});

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  const html = template({ title: 'Photo App' });
  res.send(html);
});

app.use('/weather/images', (req, res, next) => {
  forecast.fetch(req.query.latitude, req.query.longitude)
    .then((result) => {
      let weatherType = result.currently.summary.toLowerCase();
      let searchOptions = {
        q: weatherType,
        filter: 'images safe',
        include_entities: true,
        result_type: 'mixed',
        lang: 'en',
        count: 10
      };

      twitter.getSearch(searchOptions, twitterError, (data) => {
        twitterResponse = JSON.parse(data);
        let twitterStatuses = twitterResponse.statuses;
        let entities = [];
        let images = [];
        twitterStatuses.map((item) => entities.push(item.entities));
        entities.map((item) => images.push(item.media ? item.media[0].media_url_https : ''));
        res.send({images: images, weather: weatherType});
      });
    })
    .catch((error) => console.error(error));
});
app.get('/weather/images', (req, res) => {
    res.send({images: images});
});

const server = app.listen(3000, () => {
  let host = server.address().address;
  host = host === '::' ? 'localhost' : host;
  const port = server.address().port;
});
