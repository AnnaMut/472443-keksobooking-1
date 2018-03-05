'use strict';

(function () {

  var typesDictionary = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getArticle = function (i) {
    var pinArticle = document.querySelector('template').content.querySelector('article.map__card');
    if (window.utils.mapSection.contains(pinArticle)) {
      pinArticle.remove();
    }
    var newArticle = pinArticle.cloneNode(true);
    newArticle.querySelector('h3').textContent = window.offers[i].offer.title;
    newArticle.querySelector('small').textContent = window.offers[i].offer.address;
    newArticle.querySelector('.popup__price').textContent = window.offers[i].offer.price + ' ₽/ночь';
    newArticle.querySelector('h4').textContent = typesDictionary[window.offers[i].offer.type];
    newArticle.querySelector('h4 + p').textContent = window.offers[i].offer.rooms + ' комнаты для ' + window.offers[i].offer.guests + ' гостей';
    newArticle.querySelector('h4 + p + p').textContent = 'Заезд после ' + window.offers[i].offer.checkin + ', выезд до ' + window.offers[i].offer.checkout;
    newArticle.querySelector('.popup__features').textContent = '';
    newArticle.querySelector('.popup__features').appendChild(getFeatures(window.offers[i].offer.features));
    newArticle.querySelector('.popup__features + p').textContent = window.offers[i].offer.description;
    newArticle.querySelector('.popup__pictures').textContent = '';
    newArticle.querySelector('.popup__pictures').appendChild(getPhotos(window.offers[i].offer.photos));
    newArticle.querySelector('.popup__avatar').setAttribute('src', window.offers[i].author.avatar);
    window.utils.mapSection.insertBefore(newArticle, document.querySelector('.map__filters-container'));
    return newArticle;
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

  window.card = {getcard: getArticle};

})();


