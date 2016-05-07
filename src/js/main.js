import fetch from 'whatwg-fetch';

window.onload = () => {
  loadImg(10);
};

const loadImg = (num) => {
  let container = document.getElementsByClassName('container')[0];

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
