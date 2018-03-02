'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SUCСESS_STATUS = 200;
  var TIME_OUT = 10000;
  var Messages = {
    responseMessage: 'Статус ответа: ',
    connectionError: 'Произошла ошибка соединения',
    timeError: 'Запрос не успел выполниться за '
  };

  var getRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCСESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(Messages.responseMessage + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(Messages.connectionError);
    });
    xhr.addEventListener('timeout', function () {
      onError(Messages.timeError + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;
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

  var createErrorNode = function (text) {
    var node = document.createElement('div');
    node.classList.add('error-node');
    document.body.insertAdjacentElement('afterbegin', node);
    node.textContent = text;
    node.addEventListener('click', removeErrorMessage);
    return node;
  };

  var removeErrorMessage = function (evt) {
    document.body.removeChild(evt.target);
    evt.target.removeEventListener('click', removeErrorMessage);
  };

  window.backend = {
    loaddata: loadData,
    senddata: sendData,
    showerror: createErrorNode
  };

})();

