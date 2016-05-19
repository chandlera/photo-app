import fetch from 'whatwg-fetch';

window.onload = () => {
  // loadImg(0);
  if(!self.fetch) {
    self.fetch = fetch;
  }
  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	}
};

const fetchImg = (num) => {
  for(let i = 0; i < num; i++) {
    window.fetch('http://www.splashbase.co/api/v1/images/random?images_only=true')
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        let nextImg = document.createElement('div');
        nextImg.className = 'container__image';
        let img = document.createElement('img');
        img.src = JSON.parse(body).url;
        nextImg.appendChild(img);
        container.appendChild(nextImg);
      });
  }
};

const loadImgs = (images) => {
  let container = document.getElementsByClassName('container')[0];

  for(let i = 0; i < images.length; i++) {
    let nextImg = document.createElement('div');
    nextImg.className = 'container__image';
    let img = document.createElement('img');
    img.src = images[i];
    nextImg.appendChild(img);
    container.appendChild(nextImg);
  }
};

const positionSuccess = (position) => {
  var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var acr = position.coords.accuracy;

  window.fetch('/weather/images?latitude='+lat+'&longitude='+lng)
    .then(function(response) {
        if(response.ok) {
          response.json().then(function(json) {
            console.log(json);
            loadImgs(json.images);
          });
        }
    });
};

const positionError = (error) => {
	var errors = {
		1: "Authorization fails", // permission denied
		2: "Can\'t detect your location", //position unavailable
		3: "Connection timeout" // timeout
	};
	console.log("Error:" + errors[error.code]);
};

const fetchWeatherImages = (weatherType) => {
  window.fetch('/weather/images?weather='+weatherType)
    .then(function(response) {
      if(response.ok) {
        response.json().then(function(json) {
          console.log(json);
        });
      }
    });
};
