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
var PIN_HEIGHT = 44;
var PIN_CENTER_X = 600;
var PIN_CENTER_Y = 300;

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

var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

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

var getFeatures = function (offerFeatures) {
  var newFeature = document.createElement('li');
  newFeature.classList.add('feature');
  var featuresBox = document.createDocumentFragment();

  for (var i = 0; i < offerFeatures.length; i++) {
    var featurePoint = newFeature.cloneNode();
    featurePoint.classList.add('feature--' + offerFeatures[i]);
    featuresBox.appendChild(featurePoint);
  }
  return featuresBox;
};

var getPhotos = function (offerPhotos) {
var photoTemlate = document.createElement('img');
var photoBox = document.createDocumentFragment();
for (var i = 0; i < offerPhotos.length; i++) {
  var photoItemli = photoTemlate.cloneNode(true);
  photoItemli.src = offerPhotos[i];
  photoItemli.style = 'width:' + '50px';
  photoItemli.style = 'height:' + '50px';
  photoBox.appendChild(photoItemli);
}
return photoBox;
};

var offers = [];
var getOffers = function () {
for (var i = 0; i < OFFER_COUNT; i++) {
  var CoordinateX = getRandomFromInterval(MAP.left, MAP.right);
  var CoordinateY = getRandomFromInterval(MAP.top, MAP.bottom);

  offers.push( {
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
      });
  }
};

getOffers(OFFER_COUNT);

var getPins = function () {
  var PinsBox = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < OFFER_COUNT; i++) {
    var template = pinTemplate.cloneNode(true);
    template.style.left = offers[i].location.x - PIN_WIDTH + 'px';
    template.style.top = offers[i].location.y - PIN_HEIGHT + 'px';
    template.querySelector('img').src = offers[i].author.avatar;
    template.setAttribute('number', i);
    pinFragment.appendChild(template);
  }
  PinsBox.appendChild(pinFragment);
};

getPins();


var getArticle = function (i) {
  var pinArticle = document.querySelector('template').content.querySelector('article.map__card');
  var newArticle = pinArticle.cloneNode(true);
  newArticle.querySelector('.popup__avatar').src = offers[i].author.avatar;
  newArticle.querySelector('h3').textContent = offers[i].offer.title;
  newArticle.querySelector('small').textContent = offers[i].offer.address;
  newArticle.querySelector('.popup__price').textContent = offers[i].offer.price + ' ₽/ночь';
  newArticle.querySelector('h4').textContent = offers[i].offer.type;
  newArticle.querySelector('h4 + p').textContent = offers[i].offer.rooms + ' комнаты для ' + offers[i].offer.guests + ' гостей';
  newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
  newArticle.querySelector('.popup__features').textContent = '';
  newArticle.querySelector('.popup__features').appendChild(getFeatures(offers[i].offer.features));
  newArticle.querySelector('.popup__features + p').textContent = offers[i].offer.description;
  newArticle.querySelector('.popup__pictures').textContent = '';
  newArticle.querySelector('.popup__pictures').appendChild(getPhotos(offers[i].offer.photos));
  return newArticle;
};

var mainPin = document.querySelector('.map__pin--main');
var mapSection = document.querySelector('.map');

var getActivePage = function () {
  mapSection.classList.remove('map--faded');
};

var activatePage = function (evt) {
  var addressPart = document.querySelector('#address');
  getActivePage();
  getActiveFieldsets();
  addressPart.value = PIN_CENTER_X + ', ' + PIN_CENTER_Y;
  openPins();
};

var activatePageByEnter = function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    activatePage();
  }
};

mainPin.addEventListener('mouseup', activatePage);
mainPin.addEventListener('keydown', activatePageByEnter);

var getUnactiveFieldsets = function () {
  var formFieldsets = document.querySelectorAll('.notice__form fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', true);
  }
};

var getActiveFieldsets = function () {
  var form = document.querySelector('.notice__form');
  var formFieldsets = form.querySelectorAll('.notice__form fieldset');
  form.classList.remove('notice__form--disabled');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

getUnactiveFieldsets();

var putPinOnMap = function (i) {
  var mapCard = document.querySelector('.map__card');
  if (mapSection.contains(mapCard)) {
    mapCard.remove();
  }
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(getArticle(i));
  mapSection.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
};

putPinOnMap(0);

var pinsOnMap = document.querySelector('.map__pins');

pinsOnMap.addEventListener('click', function (evt) {
  if (evt.path[1].hasAttribute('number')) {
    putPinOnMap(evt.path[1].getAttribute('number'));
  }
});





var closeArticle = function () {
  var article = document.querySelector('.map__card');
  article.classList.add('hidden');
};

closeArticle();

var closePins = function () {
  var mapPins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < mapPins.length; i++) {
    if (!mapPins[i].classList.contains('map__pin--main')) {
      mapPins[i].classList.add('hidden');
    }
  }
};


var openPins = function () {
  var mapPins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < mapPins.length; i++) {
    if (!mapPins[i].classList.contains('map__pin--main')) {
      mapPins[i].classList.remove('hidden');
    }
  }
};


closePins();


mapSection.addEventListener('click', function (evt) {
  document.querySelector('popup__close');
  if (evt.target.classList.contains('popup__close')) {
    closeArticle();
  }
});


mapSection.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    closeArticle();
  }
});

