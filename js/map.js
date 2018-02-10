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

var offerTitleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerTypeList = [
  'flat',
  'house',
  'bungalo'
];

var checkInTimeList = [
  '12:00',
  '13:00',
  '14:00'];

var checkOutTimeList = [
  '12:00',
  '13:00',
  '14:00'];

var offerFeaturesList = [
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

var OfferList = [];
for (var i = 0; i < OFFER_COUNT; i++) {
  var CoordinateX = getRandomFromInterval(MAP.left, MAP.right);
  var CoordinateY = getRandomFromInterval(MAP.top, MAP.bottom);

  OfferList[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },

    'offer': {
      'title': offerTitleList.sort(randomSort)[i],
      'address': CoordinateX + ',' + CoordinateY,
      'price': getRandomFromInterval(PRICE_MIN, PRICE_MAX),
      'type': getRandomElement(offerTypeList),
      'rooms': getRandomFromInterval(ROOM_MIN, ROOM_MAX),
      'guests': getRandomFromInterval(GUESTS_MIN, GUESTS_MAX),
      'checkin': getRandomElement(checkInTimeList),
      'checkout': getRandomElement(checkOutTimeList),
      'features': getRandomSubarray(offerFeaturesList),
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
  template.style.left = OfferList[i].location.x - PIN_WIDTH + 'px';
  template.style.top = OfferList[i].location.y - PIN_HEIGHT + 'px';
  template.querySelector('img').src = OfferList[i].author.avatar;
  pinFragment.appendChild(template);
}

pinsBox.appendChild(pinFragment);
var pinArticle = document.querySelector('template').content.querySelector('.map__card');
var afterArticle = document.querySelector('.map__filters-container');
var articleArray = OfferList[0];

var newArticle = pinArticle.cloneNode(true);
var articleFragment = document.createDocumentFragment();
articleFragment.appendChild(newArticle);
mapSection.insertBefore(newArticle, afterArticle);

for (i = 0; i < OFFER_COUNT; i++) {
  newArticle.querySelector('.popup__avatar').src = OfferList[i].author.avatar;
  newArticle.querySelector('h3').textContent = OfferList[i].offer.title;
  newArticle.querySelector('small').textContent = OfferList[i].offer.address;
  newArticle.querySelector('.popup__price').textContent = OfferList[i].offer.price + ' ₽/ночь';
  newArticle.querySelector('h4').textContent = OfferList[i].offer.type;
  newArticle.querySelector('h4 + p').textContent = OfferList[i].offer.rooms + ' комнаты для ' + OfferList[i].offer.guests + ' гостей';
  newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + OfferList[i].offer.checkin + ', выезд до ' + OfferList[i].offer.checkout;
  newArticle.querySelector('.popup__features + p').textContent = OfferList[i].offer.description;
}

var articleFeatureBox = newArticle.querySelector('.popup__features');
var defoltFeatures = articleFeatureBox.querySelectorAll('li');
for (i = 0; i < defoltFeatures.length; i++) {
  articleFeatureBox.removeChild(newArticle.querySelector('li'));
}

for (var a = 0; a < articleArray.offer.features.length; a++) {
  var articleFeature = document.createElement('li');
  articleFeatureBox.appendChild(articleFeature);
  articleFeature.className = 'feature feature--' + articleArray.offer.features[a];
}

var photoBox = newArticle.querySelector('.popup__pictures');
for (var b = 0; b < articleArray.offer.photos.length; b++) {
  var photoItemli = photoBox.querySelector('li').cloneNode(true);
  photoBox.appendChild(photoItemli);
  photoItemli.querySelector('img').src = articleArray.offer.photos[b];
  photoItemli.querySelector('img').style = 'width:' + '50px';
  photoItemli.querySelector('img').style = 'height:' + '50px';
}

photoBox.removeChild(newArticle.querySelector('.popup__pictures li'));
