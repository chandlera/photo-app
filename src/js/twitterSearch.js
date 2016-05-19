const Twitter = require('twitter-node-client').Twitter;
import config from '../config/config.js';

//Callback functions
let twitterError = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
let twitterResponse = [];
let twitterConfig = config.twitter;
let twitter = new Twitter(twitterConfig);

let weatherImageSearch = (weatherType) => {
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
    twitterResponse = images;
    return twitterResponse;
  });
};
export {weatherImageSearch};
