'use strict';

var OFFER_COUNT = 8;
var MAP = {
  'left': 300,
  'top': 150,
  'right': 900,
  'bottom': 500
};

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOM_MIN = 1;
var ROOM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 20;/** ограничила в 20 гостей**/
var PIN_WIDTH = 40;
var PIN_HEIGHT = 70;

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerTypes = [
  'flat',
  'house',
  'bungalo'
];

var offerCheckInTimes = [
  '12:00',
  '13:00',
  '14:00'];

var offerCheckOutTimes = [
  '12:00',
  '13:00',
  '14:00'];

var offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var randomSort = function () {
  return Math.random() - 0.5;
};

var getRandomSubarray = function (arr) {
  var copyArr = arr.sort(randomSort);
  return copyArr.slice(0, 1 + Math.floor(Math.random() * arr.length));
};

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var offers = [];
for (var i = 0; i < OFFER_COUNT; i++) {
  var CoordinateX = getRandomFromInterval(MAP.left, MAP.right);
  var CoordinateY = getRandomFromInterval(MAP.top, MAP.bottom);

  offers[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },

    'offer': {
      'title': offerTitles.sort(randomSort)[i],
      'address': CoordinateX + ',' + CoordinateY,
      'price': getRandomFromInterval(PRICE_MIN, PRICE_MAX),
      'type': getRandomElement(offerTypes),
      'rooms': getRandomFromInterval(ROOM_MIN, ROOM_MAX),
      'guests': getRandomFromInterval(GUESTS_MIN, GUESTS_MAX),
      'checkin': getRandomElement(offerCheckInTimes),
      'checkout': getRandomElement(offerCheckOutTimes),
      'features': getRandomSubarray(offerFeatures),
      'description': '',
      'photos': offerPhotos.sort(randomSort),
    },

    'location': {
      'x': CoordinateX,
      'y': CoordinateY,
    }
  };
}


var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');
var pinsBox = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();

for (i = 0; i < OFFER_COUNT; i++) {
  var template = pinTemplate.cloneNode(true);
  template.style.left = offers[i].location.x - PIN_WIDTH + 'px';
  template.style.top = offers[i].location.y - PIN_HEIGHT + 'px';
  template.querySelector('img').src = offers[i].author.avatar;
  pinFragment.appendChild(template);
}

pinsBox.appendChild(pinFragment);
var pinArticle = document.querySelector('template').content.querySelector('.map__card');
var afterArticle = document.querySelector('.map__filters-container');
var articleArray = offers[0];

var newArticle = pinArticle.cloneNode(true);
var articleFragment = document.createDocumentFragment();
articleFragment.appendChild(newArticle);
mapSection.insertBefore(newArticle, afterArticle);

for (i = 0; i < OFFER_COUNT; i++) {
  newArticle.querySelector('.popup__avatar').src = offers[i].author.avatar;
  newArticle.querySelector('h3').textContent = offers[i].offer.title;
  newArticle.querySelector('small').textContent = offers[i].offer.address;
  newArticle.querySelector('.popup__price').textContent = offers[i].offer.price + ' ₽/ночь';
  newArticle.querySelector('h4').textContent = offers[i].offer.type;
  newArticle.querySelector('h4 + p').textContent = offers[i].offer.rooms + ' комнаты для ' + offers[i].offer.guests + ' гостей';
  newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
  newArticle.querySelector('.popup__features + p').textContent = offers[i].offer.description;
}

var articleFeatureBox = newArticle.querySelector('.popup__features');
var defoltFeatures = articleFeatureBox.querySelectorAll('li');
for (i = 0; i < defoltFeatures.length; i++) {
  articleFeatureBox.removeChild(newArticle.querySelector('li'));
}

for (var k = 0; k < articleArray.offer.features.length; k++) {
  var articleFeature = document.createElement('li');
  articleFeatureBox.appendChild(articleFeature);
  articleFeature.className = 'feature feature--' + articleArray.offer.features[k];
}

var photoBox = newArticle.querySelector('.popup__pictures');
for (var l = 0; l < articleArray.offer.photos.length; l++) {
  var photoItemli = photoBox.querySelector('li').cloneNode(true);
  photoBox.appendChild(photoItemli);
  photoItemli.querySelector('img').src = articleArray.offer.photos[l];
  photoItemli.querySelector('img').style = 'width:' + '50px';
  photoItemli.querySelector('img').style = 'height:' + '50px';
}

photoBox.removeChild(newArticle.querySelector('.popup__pictures li'));
