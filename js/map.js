'use strict';

var NOTICE_COUNT = 8;

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
flat,
house,
bungalo
];

var CheckInAndOutList = [
'12:00',
'13:00',
'14:00'];

var OfferFeaturesList = [
'wifi',
'dishwasher',
'parking', 'washer',
'elevator',
'conditioner'
];

var OfferPhotos = [
'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
/** не знаю будет работать или нет, но нам нужно вытащить случайный элемент и чтобы он не повторялся **/
var getRandomPoint = function (arr) {
  var randomPoint = Math.floor(Math.random() * arr.length);
  return arr.splice(randomPoint, 1);
};
/** еще функция где случайное значение но повтор возможен **/
var getRandomPointRepeat = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var getRandomNumber = function (min, max) {
   return Math.floor(Math.random() * (max - min) + min);
 };

  var NoticePoint = [
  {
  'author': {
    'avatar': 'img/avatars/user0' + (' + getRandomPoint(AvatarNumberList) + ' + 1) + '.png',
  },

  'offer': {
    'title': getRandomPoint(OfferTitleList),
    'address': getRandomNumber(300, 900) + ', ' + getRandomNumber(150, 500),
    'price': getRandomNumber(1000, 1000000),
    'type':getRandomPointRepeat(OfferTypeList),
    'rooms': getRandomNumber(1, 5),
    'guests': getRandomNumber (1,20), /** ограничила в 20 гостей**/
    'checkin': getRandomPointRepeat (CheckInAndOutList),
    'checkout': getRandomPointRepeat (CheckInAndOutList),
    'features': OfferFeaturesList.length = getRandomNumber(0,6),
    'description': '',
    'photos': OfferPhotos.sort(),
  },

  "location": {
    'x': getRandomNumber(300, 900),
    'y': getRandomNumber(150, 500),
  }
}
];

var NoticeList = new Array(NOTICE_COUNT);
for (var i = 0; i < NOTICE_COUNT; i++) {
  NoticeList[i] = NoticePoint;
}

document.write(NoticeList);

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');
