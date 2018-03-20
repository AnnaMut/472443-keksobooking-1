'use strict';

(function () {
  // var allFilters = document.querySelectorAll('.map__filter');
  var houseType = document.querySelector('#housing-type');
  var housePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseGuests = document.querySelector('#housing-guests');

  var PRICE_LIMITS = {
    low: 10000,
    high: 50000
  };

  var filter = [];
  houseType.addEventListener('change', function () {
    window.debounce.setdebounce(filterOffers);
  });
  housePrice.addEventListener('change', function () {
    window.debounce.setdebounce(filterOffers);
  });
  houseRooms.addEventListener('change', function () {
    window.debounce.setdebounce(filterOffers);
  });
  houseGuests.addEventListener('change', function () {
    window.debounce.setdebounce(filterOffers);
  });
  // housingFeatures.addEventListener('change', function () {
  // window.debounce.setdebounce(filterOffers);
  // });


  var filterType = function () {
    filter = window.offers.filter(function (offers) {
      if (houseType.value !== 'any') {
        return offers.offer.type === houseType.value;
      }
      return filter;
    });
  };


  var filterPrice = function (array) {
    filter = array.filter(function (offers) {
      switch (housePrice.value) {
        case 'any':
          return offers;
        case 'middle':
          return offers.offer.price >= PRICE_LIMITS.low && offers.offer.price <= PRICE_LIMITS.high;
        case 'low':
          return offers.offer.price <= PRICE_LIMITS.low;
        case 'high':
          return offers.offer.price >= PRICE_LIMITS.high;
      }
      return offers;
    });
  };


  var filterRooms = function (array) {
    filter = array.filter(function (offers) {
      if (houseRooms.value !== 'any') {
        return offers.offer.rooms === parseInt(houseRooms.value, 10);
      }
      return filter;
    });
  };


  var filterGuests = function (array) {
    filter = array.filter(function (offers) {
      if (houseGuests.value !== 'any') {
        return offers.offer.guests === parseInt(houseGuests.value, 10);
      }
      return filter;
    });
  };

  var filterOffers = function () {
    filterType(filter);
    filterPrice(filter);
    // filterFeatures(filter);
    filterRooms(filter);
    filterGuests(filter);
    window.pin.getpins(filter);
  };

  window.filters = {filter: filterOffers};
  // var PriceParameters = {
  // 'low': function (price) {
  //   return price < PRICE_LIMITS.low;
  // },
  //  'middle': function (price) {
  //    return price >= PRICE_LIMITS.low && price < PRICE_LIMITS.high;
  //   },
  //  'high': function (price) {
  //   return price >= PRICE_LIMITS.high;
  // }
  // };

  // var filterValue = function (array, value, type) {
  // return array.filter(function (it) {
  //   return it.offer[type].toString() === value;
  // });
  // };

  // var filterFeatures = function (array, feature) {
  //  return array.filter(function (it) {
  //   return it.offer.features.indexOf(feature) !== -1;
  // });
  // };

  // var filterPrice = function (array, value) {
  //  return array.filter(function (it) {
  //   return PriceParameters[value](it.offer.price);
  // });
  // };

  // window.filtrate = function (initialArray) {
  // var selectedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
  // var checkedFilters = Array.from(document).filter(function (filter) {
  //   return filter.value !== 'any';
  //  });
  //  var emptyArrays = initialArray.slice();
  //  checkedFilters.forEach(function (item) {
  //    var type = item.name.split('-')[1];
  //    emptyArrays = (type === 'price') ? filterPrice(emptyArrays, item.value) : filterValue(emptyArrays, item.value, type);
  //  });

  // selectedFeatures.forEach(function (item) {
  // emptyArrays = filterFeatures(emptyArrays, item.value);
  // });
  // return emptyArrays;
  // };
})();
