'use strict';

var NOTICE_COUNT = 8;
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

var OfferTitleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OfferTypeList = [
  'flat',
  'house',
  'bungalo'
];

var CheckInAndOutList = [
  '12:00',
  '13:00',
  '14:00'];

var OfferFeaturesList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OfferPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getCompare = function () {
  return Math.random() - 0.5;
};

var getMixedNewLengthArray = function (arr) {
  var copyArr = arr.sort(getCompare);
  return copyArr.slice(0, 1 + Math.floor(Math.random() * arr.length));
};

var getRandomPointRepeat = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var NoticeList = [];
for (var i = 0; i < NOTICE_COUNT; i++) {
  var CoordinateX = getRandomValue(MAP.left, MAP.right);
  var CoordinateY = getRandomValue(MAP.top, MAP.bottom);

  NoticeList[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },

    'offer': {
      'title': OfferTitleList.sort(getCompare)[i],
      'address': CoordinateX + ',' + CoordinateY,
      'price': getRandomValue(PRICE_MIN, PRICE_MAX),
      'type': getRandomPointRepeat(OfferTypeList),
      'rooms': getRandomValue(ROOM_MIN, ROOM_MAX),
      'guests': getRandomValue(GUESTS_MIN, GUESTS_MAX),
      'checkin': getRandomPointRepeat(CheckInAndOutList),
      'checkout': getRandomPointRepeat(CheckInAndOutList),
      'features': getMixedNewLengthArray(OfferFeaturesList),
      'description': '',
      'photos': OfferPhotos.sort(getCompare),
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

for (i = 0; i < NOTICE_COUNT; i++) {
  var template = pinTemplate.cloneNode(true);
  template.style = 'left:' + (NoticeList[i].location.x - PIN_WIDTH) + 'px; top: ' + (NoticeList[i].location.y - PIN_HEIGHT) + 'px';
  template.querySelector('img').src = NoticeList[i].author.avatar; //* переделала поединообразнее *//
  pinFragment.appendChild(template);
}

pinsBox.appendChild(pinFragment);
var pinArticle = document.querySelector('template').content.querySelector('.map__card');
var afterArticle = document.querySelector('.map__filters-container');
var articleArray = NoticeList[0];//

var newArticle = pinArticle.cloneNode(true);
var articleFragment = document.createDocumentFragment();
articleFragment.appendChild(newArticle);
mapSection.insertBefore(newArticle, afterArticle);

for (i = 0; i < NOTICE_COUNT; i++) {
  newArticle.querySelector('.popup__avatar').src = articleArray.author.avatar;
  newArticle.querySelector('h3').textContent = NoticeList[i].offer.title;
  newArticle.querySelector('small').textContent = NoticeList[i].offer.address;
  newArticle.querySelector('.popup__price').textContent = NoticeList[i].offer.price + ' ₽/ночь';
  newArticle.querySelector('h4').textContent = NoticeList[i].offer.type;
  newArticle.querySelector('h4 + p').textContent = NoticeList[i].offer.rooms + ' комнаты для ' + NoticeList[i].offer.guests + ' гостей';
  newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + NoticeList[i].offer.checkin + ', выезд до ' + NoticeList[i].offer.checkout;
  newArticle.querySelector('.popup__features + p').textContent = NoticeList[i].offer.description;
}

var ArticleFeatureBox = newArticle.querySelector('.popup__features');
var defoltFeatures = ArticleFeatureBox.querySelectorAll('li');
for (i = 0; i < defoltFeatures.length; i++) {
  ArticleFeatureBox.removeChild(newArticle.querySelector('li'));
}

for (var a = 0; a < articleArray.offer.features.length; a++) {
  var ArticleFeature = document.createElement('li');
  ArticleFeatureBox.appendChild(ArticleFeature);
  ArticleFeature.className = 'feature feature--' + articleArray.offer.features[a];
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
