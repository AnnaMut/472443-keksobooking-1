'use strict';

(function () {
  var PIN_CENTER_X = 600;
  var PIN_CENTER_Y = 300;

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var pinsOnMap = document.querySelector('.map__pins');

  var closePageOverlay = function () {
    window.utils.mapSection.classList.remove('map--faded');
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

  var getPinByAttribute = function (evt) {
    closeArticle();
    var indexPin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (indexPin && indexPin.tagName === 'BUTTON') {
      for (var i = 0; i < window.utils.OFFER_COUNT; i++) {
        var id = evt.target.closest('.map__pin:not(.map__pin--main)').id;
        var index = parseInt(id.substr(window.utils.pinPrefix.length), 10);
        window.card.getcard(index);
        window.utils.mapSection.querySelector('.popup__close').addEventListener('click', closeArticleByClick);
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

  window.utils.mapSection.addEventListener('click', closeArticleByClick);
  window.utils.mapSection.addEventListener('keydown', closeArticleByEsc);

  var closePins = function () {
    var mapPins = document.querySelectorAll(window.utils.pinsClass);
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains(window.utils.mainPinClass)) {
        mapPins[i].classList.add('hidden');
      }
    }
  };

  var openPins = function () {
    var mapPins = document.querySelectorAll(window.utils.pinsClass);
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains(window.utils.mainPinClass)) {
        mapPins[i].classList.remove('hidden');
      }
    }
  };
  closePins();

  window.map = {
    enablefieldsets: getUnactiveFieldsets,
    closepins: closePins,
    closearticle: closeArticle
  };

})();
