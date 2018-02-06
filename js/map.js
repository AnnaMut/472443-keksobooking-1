'use strict';

var NOTICE_COUNT = 8;
var MAP_POINTX_MIN = 300;
var MAP_POINTX_MAX = 900;
var MAP_POINTY_MIN = 150;
var MAP_POINTY_MAX = 500;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOM_MIN = 1;
var ROOM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 20;/** ограничила в 20 гостей**/
var PIN_WIDTH = 40;
var PIN_HEIGHT = 70;

var AvatarNumberList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];

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

// не знаю будет работать или нет, но нам нужно вытащить случайный элемент и чтобы он не повторялся
var getRandomPoint = function (arr) {
  var randomPoint = Math.floor(Math.random() * arr.length);
  return arr.splice(randomPoint, 1);
};

// еще функция где случайное значение но повтор возможен
var getRandomPointRepeat = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getMixedArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

var getNewArrayLength = function (arr) {
  var newArr = [];
  var newLength = Math.floor(Math.random() * (arr.length));
  for (var i = 0; i < newLength; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

var NoticeList = [];
for (var i = 0; i < NOTICE_COUNT; i++) {
  var CoordinateX = getRandomNumber(MAP_POINTX_MIN, MAP_POINTX_MAX);
  var CoordinateY = getRandomNumber(MAP_POINTY_MIN, MAP_POINTY_MAX);

  NoticeList[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomPoint(AvatarNumberList) + '.png',
    },

    'offer': {
      'title': getRandomPoint(OfferTitleList),
      'address': CoordinateX + ',' + CoordinateY,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': getRandomPointRepeat(OfferTypeList),
      'rooms': getRandomNumber(ROOM_MIN, ROOM_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': getRandomPointRepeat(CheckInAndOutList),
      'checkout': getRandomPointRepeat(CheckInAndOutList),
      'features': getNewArrayLength(OfferFeaturesList),
      'description': '',
      'photos': getMixedArray(OfferPhotos),
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

for (i = 0; i < NOTICE_COUNT; i++) {
  var template = pinTemplate.cloneNode(true);
  var pinFragment = document.createDocumentFragment();
  template.setAttribute('style', 'left:' + (NoticeList[i].location.x - PIN_WIDTH) + 'px; top: ' + (NoticeList[i].location.y - PIN_HEIGHT) + 'px');
  template.querySelector('img').setAttribute('src', NoticeList[i].author.avatar);

  pinFragment.appendChild(template);
  pinsBox.appendChild(pinFragment);
}

var pinArticle = document.querySelector('template').content.querySelector('.map__card');
var afterArticle = document.querySelector('.map__filters-container');

var articleSection = document.createElement('section');
articleSection.className = 'map__card box';
mapSection.insertBefore(articleSection, afterArticle);

for (i = 0; i < NOTICE_COUNT; i++) {
  var newArticle = pinArticle.cloneNode(true);

  var articleFragment = document.createDocumentFragment();
  articleFragment.appendChild(newArticle);
  articleSection.appendChild(articleFragment);

  newArticle.querySelector('h3').textContent = NoticeList[i].offer.title;
  newArticle.querySelector('small').textContent = NoticeList[i].offer.address;
  newArticle.querySelector('.popup__price').textContent = NoticeList[i].offer.price + 'Р/ночь';
  newArticle.querySelector('h4').textContent = NoticeList[i].offer.type;
  newArticle.querySelector('h4 + p').textContent = NoticeList[i].offer.rooms + ' комнаты для ' + NoticeList[i].offer.guests + ' гостей';
  newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + NoticeList[i].offer.checkin + ', выезд до ' + NoticeList[i].offer.checkout;

  newArticle.querySelector('.popup__features + p').textContent = NoticeList[i].offer.description;
  newArticle.querySelector('.popup__avatar').src = NoticeList[i].author.avatar;
}
