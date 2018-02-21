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

var typesDictionary = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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

var pinPrefix = 'pin-';

var mainPinClass = 'map__pin--main';

var pinsClass = '.map__pin';

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

var getFeatures = function (arr) {
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

var getPhotos = function (arr) {
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

var offers = [];
var getOffers = function () {
  for (var i = 0; i < OFFER_COUNT; i++) {
    var CoordinateX = getRandomFromInterval(MAP.left, MAP.right);
    var CoordinateY = getRandomFromInterval(MAP.top, MAP.bottom);

    offers.push({
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
  var pinTemplate = document.querySelector('template').content.querySelector(pinsClass);
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < OFFER_COUNT; i++) {
    var template = pinTemplate.cloneNode(true);
    template.style.left = offers[i].location.x - PIN_WIDTH + 'px';
    template.style.top = offers[i].location.y - PIN_HEIGHT + 'px';
    template.querySelector('img').src = offers[i].author.avatar;
    template.id = pinPrefix + i;
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
  newArticle.querySelector('h4').textContent = typesDictionary[offers[i].offer.type];
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
var form = document.querySelector('.notice__form');

var closePageOverlay = function () {
  mapSection.classList.remove('map--faded');
};

var activatePage = function () {
  var addressPart = document.querySelector('#address');
  closePageOverlay();
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
  var formFieldsets = form.querySelectorAll('.notice__form fieldset');
  form.classList.remove('notice__form--disabled');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

getUnactiveFieldsets();

var putCardOnMap = function (i) {
  var mapCard = document.querySelector('.map__card');
  if (mapSection.contains(mapCard)) {
    mapCard.remove();
  }
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(getArticle(i));
  mapSection.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
};

putCardOnMap(0);

var pinsOnMap = document.querySelector('.map__pins');

var getPinByAttribute = function (evt) {
  closeArticle();
  var indexPin = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (indexPin && indexPin.tagName === 'BUTTON') {
    for (var i = 0; i < OFFER_COUNT; i++) {
      var id = evt.target.closest('.map__pin:not(.map__pin--main)').id;
      var index = parseInt(id.substr(pinPrefix.length), 10);
      getArticle(index);
      putCardOnMap(index);
      mapSection.querySelector('.popup__close').addEventListener('click', closeArticleByClick);
    }
  }
};

pinsOnMap.addEventListener('click', getPinByAttribute);

var closeArticle = function () {
  var article = document.querySelector('.map__card');
  article.classList.add('hidden');
};

closeArticle();

var closeArticleByClick = function (evt) {
  document.querySelector('popup__close');
  if (evt.target.classList.contains('popup__close')) {
    closeArticle();
  }
};

var closeArticleByEsc = function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    closeArticle();
  }
};

mapSection.addEventListener('click', closeArticleByClick);
mapSection.addEventListener('keydown', closeArticleByEsc);

var closePins = function () {
  var mapPins = document.querySelectorAll(pinsClass);
  for (var i = 0; i < mapPins.length; i++) {
    if (!mapPins[i].classList.contains(mainPinClass)) {
      mapPins[i].classList.add('hidden');
    }
  }
};

var openPins = function () {
  var mapPins = document.querySelectorAll(pinsClass);
  for (var i = 0; i < mapPins.length; i++) {
    if (!mapPins[i].classList.contains(mainPinClass)) {
      mapPins[i].classList.remove('hidden');
    }
  }
};

closePins();

var formTitle = form.querySelector('#title');
var formTitleValidationMessages = {
  tooShort: 'Заголовок объявления должен состоять минимум из 30 символов',
  tooLong: 'Заголовок объявления не должен превышать 100 символов',
  valueMissing: 'Пожалуйста, введите заголовок Вашего объявления'
};

// var invalidBorderStyle = 'border: 3px solid #ff0000';
// var normalBorderStyle = 'border: 1px solid #d9d9d3';

var getFormTitleValidation = function () {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity(formTitleValidationMessages.tooShort);
    formTitle.classList.add('invalidcolor');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity(formTitleValidationMessages.tooLong);
    formTitle.classList.add('invalidcolor');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity(formTitleValidationMessages.valueMissing);
    formTitle.classList.add('invalidcolor');
  } else {
    formTitle.setCustomValidity('');
    // formTitle.style = normalBorderStyle;
  }
};
formTitle.addEventListener('invalid', getFormTitleValidation);

var formType = form.querySelector('#type');
var formPrice = form.querySelector('#price');
var Prices = [1000, 0, 5000, 10000];

var getSyncPrice = function () {
  var Index = formType.selectedIndex;
  formPrice.setAttribute('min', Prices[Index]);
  formPrice.setAttribute('placeholder', Prices[Index]);
};
formType.onchange = getSyncPrice;

var guests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var formRoomNumber = form.querySelector('#room_number');
var formRoomCapacity = form.querySelector('#capacity');

var getCapacity = function () {
  for (var key in guests) {
    if (formRoomNumber.value === key) {
      formRoomCapacity.value = guests[key][0];
      for (var i = 0; i < formRoomCapacity.options.length; i++) {
        formRoomCapacity.options[i].removeAttribute('disabled');
        if (guests[key].indexOf(formRoomCapacity.options[i].value) === -1) {
          formRoomCapacity.options[i].setAttribute('disabled', '');
        }
      }
    }
  }
};

var getSyncRoomsCapacity = function () {
  for (var key in guests) {
    if (guests[key].indexOf(formRoomCapacity.value) > -1) {
      formRoomNumber.value = key;
    }
  }
};
formRoomNumber.onchange = getCapacity;
formRoomCapacity.onchange = getSyncRoomsCapacity;

var formPriceValidationMesssages = {
  rangeUnderflow: 'Цена слишком мала',
  rangeOverflow: 'Цена для данного типа не должна превышать 1000000',
  valueMissing: 'Пожалуйста, введите цену'
};

var getFormPriceValidation = function () {
  if (formPrice.validity.rangeUnderflow) {
    formPrice.setCustomValidity(formPriceValidationMesssages.rangeUnderflow);
    formPrice.classList.add('invalidcolor');
  } else if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity(formPriceValidationMesssages.rangeOverflow);
    formPrice.classList.add('invalidcolor');
  } else if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity(formPriceValidationMesssages.valueMissing);
    formPrice.classList.add('invalidcolor');
  } else {
    formPrice.setCustomValidity('');
    // formPrice.style = normalBorderStyle;
  }
};
formPrice.addEventListener('invalid', getFormPriceValidation);

var getSyncTime = function (element) {
  form.timein.value = element.target.value;
  form.timeout.value = element.target.value;
};
form.onchange = getSyncTime;

var formSubmitButton = form.querySelector('.form__submit');

var getValidationBySubmit = function () {
  formTitle.addEventListener('invalid', getFormTitleValidation);
  formPrice.addEventListener('invalid', getFormPriceValidation);
};

formSubmitButton.addEventListener('click', getValidationBySubmit);

var formResetButton = form.querySelector('.form__reset');

var getResetPage = function () {
  // formTitle.style = normalBorderStyle;
  // formPrice.style = normalBorderStyle;
  getUnactiveFieldsets();
  closeArticle();
  closePins();
  mapSection.classList.add('map--faded');
  form.classList.add('notice__form--disabled');
};

formResetButton.addEventListener('click', getResetPage);


