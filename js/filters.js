'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var PriceLevel = {
    min: 10000,
    max: 50000
  };

  var applyFilters = function () {
    window.map.closepins();

    var filters = mapFilters.querySelectorAll('input:checked, option:checked');
    var filterOffers = window.offers.filter(function (offers) {
      window.map.closearticle();
      var flag = true;
      for (var i = 0; i < filters.length; i++) {
        if (!(
          (filters[i].tagName === 'OPTION' && (
            filters[i].value === 'any' ||
            (filters[i].parentNode.name === 'housing-type' && offers.offer.type === filters[i].value) ||
            (filters[i].parentNode.name === 'housing-price' && (offers.offer.price >= PriceLevel[filters[i].value].min) &&
            (offers.offer.price <= PriceLevel[filters[i].value].max)) ||
            (filters[i].parentNode.name === 'housing-rooms' && String(offers.offer.rooms) === filters[i].value) ||
            (filters[i].parentNode.name === 'housing-guests' && String(offers.offer.guests) === filters[i].value)
          )
          ) || (filters[i].tagName === 'INPUT' && offers.offer.features.includes(filters[i].value))
        )) {
          flag = false;
        }
      }
      return flag;
    });

    if (filterOffers.length > 0) {
      window.utils.mapSection.classList.remove('map--faded');
      window.map.closearticle();
      window.pin.getpins(filterOffers);
    }

    window.offers = filterOffers;
  };

  mapFilters.addEventListener('change', function () {
    window.debounce.setdebounce(applyFilters);
  });

})();
