'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 44;


  var getPins = function () {
    var pinsBox = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('template').content.querySelector(window.utils.pinsClass);
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.utils.OFFER_COUNT; i++) {
      var template = pinTemplate.cloneNode(true);
      template.style.left = window.data.offers[i].location.x - PIN_WIDTH + 'px';
      template.style.top = window.data.offers[i].location.y - PIN_HEIGHT + 'px';
      template.querySelector('img').src = window.data.offers[i].author.avatar;
      template.id = window.utils.pinPrefix + i;
      pinFragment.appendChild(template);
    }
    pinsBox.appendChild(pinFragment);
  };

  var putCardOnMap = function (i) { // вообще не пойму зачем у меня это тут, нигде не используется,
    var mapCard = document.querySelector('.map__card'); // но если я это убираю и убираю внизу
    if (window.utils.mapSection.contains(mapCard)) { // вызов этих функций то ничего не работает
      mapCard.remove();
    }
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(window.card.getcard(i));
    window.utils.mapSection.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  };

  putCardOnMap(0);
  getPins();

})();
