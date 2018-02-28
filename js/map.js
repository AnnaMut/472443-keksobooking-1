'use strict';

(function () {
  var MAIN_PIN_WIDTH = 50;
  var MAIN_PIN_HEIGHT = 70;

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var BorderY = {
    MIN: 110,
    MAX: 650
  };

  var BorderX = {
    MIN: 30,
    MAX: 1100
  };

  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var pinsOnMap = document.querySelector('.map__pins');

  var getDragAndDrop = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: Math.min(Math.max(moveEvt.clientX, BorderX.MIN), BorderX.MAX),
        y: Math.min(Math.max(moveEvt.clientY, BorderY.MIN), BorderY.MAX)
      };

      if (mainPin.offsetLeft - shift.x > BorderX.MIN && mainPin.offsetLeft - shift.x < BorderX.MAX) {
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      }
      if (mainPin.offsetTop - shift.y < BorderY.MAX && mainPin.offsetTop - shift.y > BorderY.MIN) {
        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  mainPin.addEventListener('mousedown', getDragAndDrop);

  var closePageOverlay = function () {
    window.utils.mapSection.classList.remove('map--faded');
  };

  var activatePage = function () {
    var addressPart = document.querySelector('#address');
    closePageOverlay();
    getActiveFieldsets();
    addressPart.value = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2 + ', ' + mainPin.offsetTop + MAIN_PIN_HEIGHT;
    openPins();
  };

  var activatePageByEnter = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      activatePage();
    }
  };

  // mainPin.addEventListener('mouseup', activatePage);
  mainPin.addEventListener('mousedown', activatePage);
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
