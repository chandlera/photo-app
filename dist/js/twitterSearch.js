'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weatherImageSearch = undefined;

var _config = require('../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Twitter = require('twitter-node-client').Twitter;


//Callback functions
var twitterError = function twitterError(err, response, body) {
  console.log('ERROR [%s]', err);
};
var twitterResponse = [];
var twitterConfig = _config2.default.twitter;
var twitter = new Twitter(twitterConfig);

var weatherImageSearch = function weatherImageSearch(weatherType) {
  var searchOptions = {
    q: weatherType,
    filter: 'images safe',
    include_entities: true,
    result_type: 'mixed',
    lang: 'en',
    count: 10
  };

  twitter.getSearch(searchOptions, twitterError, function (data) {
    twitterResponse = JSON.parse(data);
    var twitterStatuses = twitterResponse.statuses;
    var entities = [];
    var images = [];
    twitterStatuses.map(function (item) {
      return entities.push(item.entities);
    });
    entities.map(function (item) {
      return images.push(item.media ? item.media[0].media_url_https : '');
    });
    twitterResponse = images;
    return twitterResponse;
  });
};
exports.weatherImageSearch = weatherImageSearch;