'use strict';

(function () {

  var typesDictionary = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getArticle = function (i) {
    var pinArticle = document.querySelector('template').content.querySelector('article.map__card');
    var newArticle = pinArticle.cloneNode(true);
    newArticle.querySelector('.popup__avatar').src = window.data.offers[i].author.avatar;
    newArticle.querySelector('h3').textContent = window.data.offers[i].offer.title;
    newArticle.querySelector('small').textContent = window.data.offers[i].offer.address;
    newArticle.querySelector('.popup__price').textContent = window.data.offers[i].offer.price + ' ₽/ночь';
    newArticle.querySelector('h4').textContent = typesDictionary[window.data.offers[i].offer.type];
    newArticle.querySelector('h4 + p').textContent = window.data.offers[i].offer.rooms + ' комнаты для ' + window.data.offers[i].offer.guests + ' гостей';
    newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + window.data.offers[i].offer.checkin + ', выезд до ' + window.data.offers[i].offer.checkout;
    newArticle.querySelector('.popup__features').textContent = '';
    newArticle.querySelector('.popup__features').appendChild(window.data.getfeatures(window.data.offers[i].offer.features));
    newArticle.querySelector('.popup__features + p').textContent = window.data.offers[i].offer.description;
    newArticle.querySelector('.popup__pictures').textContent = '';
    newArticle.querySelector('.popup__pictures').appendChild(window.data.getphotos(window.data.offers[i].offer.photos));
    return newArticle;
  };

  window.card = {getcard: getArticle}; // точка входа

})();
//
