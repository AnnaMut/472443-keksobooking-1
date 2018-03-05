'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 44;
  window.offers= [];

  var getPins = function () {
    var pinsBox = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('template').content.querySelector(window.utils.pinsClass);
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.utils.OFFER_COUNT; i++) {
      var template = pinTemplate.cloneNode(true);
      template.style.left = window.offers[i].location.x - PIN_WIDTH + 'px';
      template.style.top = window.offers[i].location.y - PIN_HEIGHT + 'px';
      template.querySelector('img').src = window.offers[i].author.avatar;
      template.id = window.utils.pinPrefix + i;
      pinFragment.appendChild(template);
    }
    pinsBox.appendChild(pinFragment);
  };


  window.pin = {
    getpins: getPins
  };

})();
