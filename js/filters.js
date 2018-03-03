'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterType = 'any';
  var filterPrice = 'any';
  var filterRooms = 'any';
  var filterGuests = 'any';

  var PriceRangs = {
    middle: 'middle',
    low: 'low',
    high: 'high'
  };

  var PriceLevel = {
    min: 10000,
    max: 50000
  };

  var changeFlag = null;

  var IdFilters = {
    type: 'housing-type',
    price: 'housing-price',
    rooms: 'housing-rooms',
    guests: 'housing-guests',
    wifi: 'filter-wifi',
    dishwasher: 'filter-dishwasher',
    parking: 'filter-parking',
    washer: 'filter-washer',
    elevator: 'filter-elevator',
    conditioner: 'filter-conditioner'
  };

  var filterWifi = false;
  var filterDishwasher = false;
  var filterParking = false;
  var filterWasher = false;
  var filterElevator = false;
  var filterConditioner = false;

  var putCallback = function (callback) {
    changeFlag = callback;
  };

  var setFilter = function (offers) {
    return offers.filter(function (offer) {
      var setType = filterType === 'any' || offer.offer.type.toString() === filterType;
      var setPrice;
      switch (filterPrice) {
        case 'any':
          setPrice = true;
          break;
        case PriceRangs.low:
          setPrice = offer.offer.price < PriceLevel.min;
          break;
        case PriceRangs.middle:
          setPrice = offer.offer.price >= PriceLevel.min && offer.offer.price <= PriceLevel.max;
          break;
        case PriceRangs.high:
          setPrice = offer.offer.price > PriceLevel.max;
          break;
      }
      var setRooms = filterRooms === 'any' || offer.offer.rooms.toString() === filterRooms;
      var setGuests = filterGuests === 'any' || offer.offer.guests.toString() === filterGuests;
      var IsWiFi = filterWifi === false || offer.offer.features.indexOf('wifi') !== -1;
      var IsDishwasher = filterDishwasher === false || offer.offer.features.indexOf('dishwasher') !== -1;
      var IsParking = filterParking === false || offer.offer.features.indexOf('parking') !== -1;
      var IsWasher = filterWasher === false || offer.offer.features.indexOf('washer') !== -1;
      var IsElevator = filterElevator === false || offer.offer.features.indexOf('elevator') !== -1;
      var IsConditioner = filterConditioner === false || offer.offer.features.indexOf('conditioner') !== -1;
      return setType && setPrice && setRooms && setGuests && IsWiFi && IsDishwasher && IsParking && IsWasher && IsElevator && IsConditioner;
    });
  };

  filterForm.addEventListener('change', function (evt) {
    var currentTarget = evt.target;
    switch (currentTarget.getAttribute('id')) {
      case IdFilters.type:
        filterType = currentTarget.value;
        break;
      case IdFilters.price:
        filterPrice = currentTarget.value;
        break;
      case IdFilters.rooms:
        filterRooms = currentTarget.value;
        break;
      case IdFilters.guests:
        filterGuests = currentTarget.value;
        break;
      case IdFilters.wifi:
        filterWifi = currentTarget.checked;
        break;
      case IdFilters.dishwasher:
        filterDishwasher = currentTarget.checked;
        break;
      case IdFilters.parking:
        filterParking = currentTarget.checked;
        break;
      case IdFilters.washer:
        filterWasher = currentTarget.checked;
        break;
      case IdFilters.elevator:
        filterElevator = currentTarget.checked;
        break;
      case IdFilters.conditioner:
        filterConditioner = currentTarget.checked;
        break;
    }
    if (typeof changeFlag === 'function') {
      changeFlag();
    }
  });

  window.filters = {
    setfilter: setFilter,
    callback: putCallback
  };

})();
