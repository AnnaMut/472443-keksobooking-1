'use strict';

window.form = (function () {
var form = document.querySelector('.notice__form');
var formTitle = form.querySelector('#title');

var labelLimits = {
  'minimum': 30,
  'maximum': 100
};
var invalidBorderColorClass = 'invalidcolor';

var setMinMaxLengthTitle = function () {
  formTitle.minLength = labelLimits.minimum;
  formTitle.maxLength = labelLimits.maximum;
};
setMinMaxLengthTitle();

var formTitleValidationMessages = {
  tooShort: 'Заголовок объявления должен состоять минимум из ' + labelLimits.minimum + ' символов',
  tooLong: 'Заголовок объявления не должен превышать ' + labelLimits.maximum + ' символов',
  valueMissing: 'Пожалуйста, введите заголовок Вашего объявления'
};

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

var formType = form.querySelector('#type');
var formPrice = form.querySelector('#price');

var pricesLimits = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var MAX_PRICE = 1000000;

var getPriceLimits = function () {
  formPrice.min = pricesLimits[formType.value];
};

formType.addEventListener('change', getPriceLimits);

var setMaxPrice = function () {
  formPrice.max = MAX_PRICE;
  formPrice.placeholder = pricesLimits.house;
};
setMaxPrice();

var formPriceValidationMesssages = {
  rangeUnderflow: 'Цена для данного типа жилья слишком мала',
  rangeOverflow: 'Цена не должна превышать ' + MAX_PRICE,
  valueMissing: 'Пожалуйста, введите цену'
};

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


var guests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var formRoomNumber = form.querySelector('#room_number');
var formRoomCapacity = form.querySelector('#capacity');

var getCapacity = function () {
  for (var key in guests) {
    if (formRoomNumber.value === key) {
      formRoomCapacity.value = guests[key][0];
      for (var i = 0; i < formRoomCapacity.options.length; i++) {
        formRoomCapacity.options[i].removeAttribute('disabled');
        if (guests[key].indexOf(formRoomCapacity.options[i].value) === -1) {
          formRoomCapacity.options[i].setAttribute('disabled', '');
        }
      }
    }
  }
};

var getSyncRoomsCapacity = function () {
  for (var key in guests) {
    if (guests[key].indexOf(formRoomCapacity.value) > -1) {
      formRoomNumber.value = key;
    }
  }
};
formRoomNumber.onchange = getCapacity;
formRoomCapacity.onchange = getSyncRoomsCapacity;

var getSyncTime = function (element) {
  form.timein.value = element.target.value;
  form.timeout.value = element.target.value;
};
form.onchange = getSyncTime;

var formSubmitButton = form.querySelector('.form__submit');

var getValidationBySubmit = function () {
  formTitle.addEventListener('invalid', getFormTitleValidation);
  formPrice.addEventListener('invalid', getFormPriceValidation);
};

formSubmitButton.addEventListener('click', getValidationBySubmit);

var formResetButton = form.querySelector('.form__reset');

var resetForm = function () {
  formTitle.classList.remove(invalidBorderColorClass);
  formPrice.classList.remove(invalidBorderColorClass);
  form.reset();
  window.getUnactiveFieldsets();
  window.closeArticle();
  window.closePins();
  window.utils.mapSection.classList.add('map--faded');
  form.classList.add('notice__form--disabled');
};

formResetButton.addEventListener('click', resetForm);

})();
