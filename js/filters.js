'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');


  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  var wifiFeature = filterFeatures.querySelector('#filter-wifi');
  var dishwasherFeature = filterFeatures.querySelector('#filter-dishwasher');
  var parkingFeature = filterFeatures.querySelector('#filter-parking');
  var washerFeatures = filterFeatures.querySelector('#filter-washer');
  var elevatorFeature = filterFeatures.querySelector('#filter-elevator');
  var conditionerFeature = filterFeatures.querySelector('#filter-conditioner');





  filterType = 'any';
  filterPrice = 'any';
  filterRooms = 'any';
  filterGuests = 'any';

  var PriceRangs = {
    middle: 'middle',
    low: 'low',
    high: 'high'
  };

  var PriceLevel = {
    min: 10000,
    max: 50000
  };

  //var changeFlag = null;

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

  wifiFeature = false;
  dishwasherFeature = false;
  parkingFeature = false;
  washerFeatures = false;
  elevatorFeature = false;
  conditionerFeature = false;


function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
  doHomework('math', function() {
  alert('Finished my homework');
});

  //var putCallback = function (callback) {
   // changeFlag = callback;
  //};

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
      var IsWiFi = wifiFeature === false || offer.offer.features.indexOf('wifi') !== -1;
      var IsDishwasher = dishwasherFeature === false || offer.offer.features.indexOf('dishwasher') !== -1;
      var IsParking = parkingFeature === false || offer.offer.features.indexOf('parking') !== -1;
      var IsWasher = washerFeatures === false || offer.offer.features.indexOf('washer') !== -1;
      var IsElevator = elevatorFeature === false || offer.offer.features.indexOf('elevator') !== -1;
      var IsConditioner = conditionerFeature === false || offer.offer.features.indexOf('conditioner') !== -1;
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
        wifiFeature = currentTarget.checked;
        break;
      case IdFilters.dishwasher:
        dishwasherFeature = currentTarget.checked;
        break;
      case IdFilters.parking:
        parkingFeature = currentTarget.checked;
        break;
      case IdFilters.washer:
        washerFeatures = currentTarget.checked;
        break;
      case IdFilters.elevator:
        elevatorFeature = currentTarget.checked;
        break;
      case IdFilters.conditioner:
        conditionerFeature = currentTarget.checked;
        break;
      }
  });

  window.filters = {
    setfilter: setFilter,
    //callback: putCallback
  };

})();



'use strict';
(function () {
  // ==========================================================================
  // Константы и переменные
  // =========================================================================
  var SHOW_PIN = 5;
  // Рабочая копия массива полученных с сервера данных
  var dataCopy = [];
  // объект c текущими значениями фильтров
  var filterValue = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any'
  };
  // Отмеченные пользователем удобства
  var checkedFeatures = [];
  // Фильтры
  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  // =========================================================================
  // Массив с функциями фильтров
  // =========================================================================

    // Фильтр по типу жилья

var setFilter = function (offers) {
    return offers.filter(function (offer) {
      if (filterValue.type !== 'any') {
        offers = offers.filter(function (offer) {
          return offer.offer.type === filterValue.type;
        });
var setRooms = filterRooms === 'any' || offer.offer.rooms.toString() === filterRooms;



      switch (filterValue.price) {
        case 'any':
          break;
        case 'low':
          arr = arr.filter(function (element) {
            return element.offer.price <= 10000;
          });
          break;
        case 'high':
          arr = arr.filter(function (element) {
            return element.offer.price >= 50000;
          });
          break;
        case 'middle':
          arr = arr.filter(function (element) {
            return (element.offer.price > 10000) && (element.offer.price < 50000);
          });
      if (filterValue.rooms !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.rooms === parseInt(filterValue.rooms, 10);
        });
      if (filterValue.guests !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.guests === parseInt(filterValue.guests, 10);
        });
      return arr.filter(function (element) {
        return checkedFeatures.every(function (currentFeature) {
          return element.offer.features.includes(currentFeature);
        });



  // ==========================================================================
  // Функция фильтрации
  // =========================================================================
  var onFiltersChange = function (evt) {
    // Выставляем значение сработавшего фильтра в объекте текущих значений фильтров
    var filterName = evt.target.name.substring(8);
    filterValue[filterName] = evt.target.value;
    // Копируем исходные данные для фильтрования
    window.mapFilters.filteredData = dataCopy.slice();
    // Получаем список отмеченных чекбоксов
    var checkedElements = filterFeatures.querySelectorAll('input[type="checkbox"]:checked');
    // Преобразуем список в массив строк
    checkedFeatures = [].map.call(checkedElements, function (element) {
      return element.value;
    });
    // Получаем массив данных после обработки системой фильтров
    filterFunctions.forEach(function (getFiltered) {
      window.mapFilters.filteredData = getFiltered(window.mapFilters.filteredData);
    });
    // Обрезаем полученный массив до необходимой длинны
    if (window.mapFilters.filteredData.length > SHOW_PIN) {
      window.mapFilters.filteredData = window.mapFilters.filteredData.slice(0, SHOW_PIN);
    }
    // Добавляем пины на страницу через установленный тайм-аут
    window.debounce(window.map.appendPins);
  };
  // ==========================================================================
  // Обработчики событий изменения фильтров
  // ==========================================================================
  filterType.addEventListener('change', onFiltersChange);
  filterPrice.addEventListener('change', onFiltersChange);
  filterRooms.addEventListener('change', onFiltersChange);
  filterGuests.addEventListener('change', onFiltersChange);
  filterFeatures.addEventListener('change', onFiltersChange);
  // ==========================================================================
  // Экспортируем функцию, принимающую массив данных с сервера,
  // и отфильтрованный массив данных
  // ==========================================================================
  window.mapFilters = {
    filteredData: [],
    transferData: function (data) {
      dataCopy = data.slice();
      this.filteredData = data.slice(0, SHOW_PIN);
    },
  };
})();


 //}
   // if (typeof changeFlag === 'function') {
   //   window.debounce.setdebounce(changeFlag);
    //}
 // });

