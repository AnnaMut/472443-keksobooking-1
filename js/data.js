'use strict';

(function () {

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

window.getFeatures = function (arr) {
  var newFeature = document.createElement('li');
  newFeature.classList.add('feature');
  var featuresBox = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var featurePoint = newFeature.cloneNode();
    featurePoint.classList.add('feature--' + arr[i]);
    featuresBox.appendChild(featurePoint);
  }
  return featuresBox;
};

window.getPhotos = function (arr) {
  var photoTemlate = document.createElement('img');
  var photoBox = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var photoItemli = photoTemlate.cloneNode(true);
    photoItemli.src = arr[i];
    photoItemli.style = 'width:' + '50px';
    photoItemli.style = 'height:' + '50px';
    photoBox.appendChild(photoItemli);
  }
  return photoBox;
};

var getSortArray = function (arr) {
return arr.sort(randomSort);
};


window.offers = [];

var getOffers = function () {
   for (var i = 0; i < window.utils.OFFER_COUNT; i++) {
   var CoordinateX = getRandomFromInterval(MAP.left, MAP.right);
   var CoordinateY = getRandomFromInterval(MAP.top, MAP.bottom);

  window.offers.push({
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
        'photos': getSortArray(offerPhotos),
      },

      'location': {
        'x': CoordinateX,
        'y': CoordinateY,
      },
 });
}
};

getOffers();

})();

