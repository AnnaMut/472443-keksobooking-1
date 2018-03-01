'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var formTitle = form.querySelector('#title');
  var invalidBorderColorClass = 'invalidcolor';
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formRoomNumber = form.querySelector('#room_number');
  var formRoomCapacity = form.querySelector('#capacity');
  var formSubmitButton = form.querySelector('.form__submit');
  var formResetButton = form.querySelector('.form__reset');
  var MAX_PRICE = 1000000;

  var pricesLimits = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var labelLimits = {
    'minimum': 30,
    'maximum': 100
  };

  var guests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var formTitleValidationMessages = {
    tooShort: 'Заголовок объявления должен состоять минимум из ' + labelLimits.minimum + ' символов',
    tooLong: 'Заголовок объявления не должен превышать ' + labelLimits.maximum + ' символов',
    valueMissing: 'Пожалуйста, введите заголовок Вашего объявления'
  };

  var formPriceValidationMesssages = {
    rangeUnderflow: 'Цена для данного типа жилья слишком мала',
    rangeOverflow: 'Цена не должна превышать ' + MAX_PRICE,
    valueMissing: 'Пожалуйста, введите цену'
  };

  var setMinMaxLengthTitle = function () {
    formTitle.minLength = labelLimits.minimum;
    formTitle.maxLength = labelLimits.maximum;
  };
  setMinMaxLengthTitle();

  var getFormTitleValidation = function () {
    var validity = formTitle.validity;
    if (validity.valid) {
      formTitle.setCustomValidity('');
      formTitle.classList.remove(invalidBorderColorClass);
      return;
    }
    if (validity.tooShort) {
      formTitle.setCustomValidity(formTitleValidationMessages.tooShort);
      formTitle.classList.add(invalidBorderColorClass);
      return;
    }
    if (validity.tooLong) {
      formTitle.setCustomValidity(formTitleValidationMessages.tooLong);
      formTitle.classList.add(invalidBorderColorClass);
      return;
    }
    if (validity.valueMissing) {
      formTitle.setCustomValidity(formTitleValidationMessages.valueMissing);
      formTitle.classList.add(invalidBorderColorClass);
      return;
    }
  };
  formTitle.addEventListener('invalid', getFormTitleValidation);


  var getPriceLimits = function () {
    formPrice.min = pricesLimits[formType.value];
  };
  formType.addEventListener('change', getPriceLimits);

  var setMaxPrice = function () {
    formPrice.max = MAX_PRICE;
    formPrice.placeholder = pricesLimits.house;
  };
  setMaxPrice();

  var getFormPriceValidation = function () {
    var validity = formPrice.validity;
    if (validity.valid) {
      formPrice.setCustomValidity('');
      formPrice.classList.remove(invalidBorderColorClass);
      return;
    }
    if (validity.rangeUnderflow) {
      formPrice.setCustomValidity(formPriceValidationMesssages.rangeUnderflow);
      formPrice.classList.add(invalidBorderColorClass);
      return;
    }
    if (validity.rangeOverflow) {
      formPrice.setCustomValidity(formPriceValidationMesssages.rangeOverflow);
      formPrice.classList.add(invalidBorderColorClass);
      return;
    }
    if (validity.valueMissing) {
      formPrice.setCustomValidity(formPriceValidationMesssages.valueMissing);
      formPrice.classList.add(invalidBorderColorClass);
      return;
    }
  };
  formPrice.addEventListener('invalid', getFormPriceValidation);

  var getCapacity = function () {
    var key = formRoomNumber.value;
    formRoomCapacity.value = guests[key][0];
    for (var i = 0; i < formRoomCapacity.options.length; i++) {
      if (guests[key].indexOf(formRoomCapacity.options[i].value) === -1) {
        formRoomCapacity.options[i].setAttribute('disabled', '');
      } else {
        formRoomCapacity.options[i].removeAttribute('disabled');
      }
    }
  };
  formRoomNumber.addEventListener('change', getCapacity);

  var getSyncTime = function (element) {
    form.timein.value = element.target.value;
    form.timeout.value = element.target.value;
  };
  form.addEventListener('change', getSyncTime);

  var getValidationBySubmit = function () {
    formTitle.addEventListener('invalid', getFormTitleValidation);
    formPrice.addEventListener('invalid', getFormPriceValidation);
  };
  formSubmitButton.addEventListener('click', getValidationBySubmit);

  var resetForm = function () {
    formTitle.classList.remove(invalidBorderColorClass);
    formPrice.classList.remove(invalidBorderColorClass);
    form.reset();
    window.map.enablefieldsets();
    window.map.closearticle();
    window.map.closepins();
    window.utils.mapSection.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
  };
  formResetButton.addEventListener('click', resetForm);

  var submitForm = function () {
    form.reset();
  };

  var onError = function () {
    var node = window.backend.showerror();
    return node;
  };

  var sendSuccess = function (evt) {
    window.backend.senddata(new FormData(form), submitForm, onError);
    evt.preventDefault();
  };

  form.addEventListener('submit', sendSuccess);

})();
