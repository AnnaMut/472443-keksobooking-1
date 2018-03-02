'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SUCSESS_STATUS = 200;
  var TIME_OUT_DATE = 10000;
  var messages = {
    responsemessage: 'Статус ответа: ',
    errorconnection: 'Произошла ошибка соединения',
    errortime: 'Запрос не успел выполниться за '
  };

  var getRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCSESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(messages.responsemessage + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(messages.errorconnection);
    });
    xhr.addEventListener('timeout', function () {
      onError(messages.errortime + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT_DATE;
    return xhr;
  };

  var loadData = function (onSuccess, onError) {
    var xhr = getRequest(onSuccess, onError);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var sendData = function (data, onSuccess, onError) {
    var xhr = getRequest(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var createErrorNode = function () {
    var node = document.createElement('div');
    node.classList.add('error-node');
    document.body.insertAdjacentElement('afterbegin', node);
    node.classList.add('hidden');
    node.addEventListener('click', removeErrorMessage);
    return node;
  };

  var showErrorMessage = function (message) {
    var node = createErrorNode();
    node.classList.remove('hidden');
    if (message) {
      node.textContent = '';
    } else {
      node.textContent = message;
    }
    return node;
  };

  var removeErrorMessage = function (evt) {
    var node = showErrorMessage();
    node.classList.add('hidden');
    evt.target.removeEventListener('click', removeErrorMessage);
  };

  window.backend = {
    loaddata: loadData,
    senddata: sendData,
    showerror: showErrorMessage
  };

})();

