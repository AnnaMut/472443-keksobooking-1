'use strict';

(function () {

var typesDictionary = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

window.getArticle = function (i) {
  var pinArticle = document.querySelector('template').content.querySelector('article.map__card');
  var newArticle = pinArticle.cloneNode(true);
  newArticle.querySelector('.popup__avatar').src = window.offers[i].author.avatar;
  newArticle.querySelector('h3').textContent = window.offers[i].offer.title;
  newArticle.querySelector('small').textContent = window.offers[i].offer.address;
  newArticle.querySelector('.popup__price').textContent = window.offers[i].offer.price + ' ₽/ночь';
  newArticle.querySelector('h4').textContent = typesDictionary[window.offers[i].offer.type];
  newArticle.querySelector('h4 + p').textContent = window.offers[i].offer.rooms + ' комнаты для ' + window.offers[i].offer.guests + ' гостей';
  newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + window.offers[i].offer.checkin + ', выезд до ' + window.offers[i].offer.checkout;
  newArticle.querySelector('.popup__features').textContent = '';
  newArticle.querySelector('.popup__features').appendChild(window.getFeatures(window.offers[i].offer.features));
  newArticle.querySelector('.popup__features + p').textContent = window.offers[i].offer.description;
  newArticle.querySelector('.popup__pictures').textContent = '';
  newArticle.querySelector('.popup__pictures').appendChild(window.getPhotos(window.offers[i].offer.photos));
  return newArticle;
};

})();
//
