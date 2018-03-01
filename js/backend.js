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
  var node = document.createElement('div');

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

  var loadData = function (onSuccess, showErrorMessage) {
    var xhr = getRequest(onSuccess, showErrorMessage);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var sendData = function (data, onSuccess, showErrorMessage) {
    var xhr = getRequest(onSuccess, showErrorMessage);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var createErrorNode = function () { // не показывает ноду эррора
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #C71585;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    document.body.insertAdjacentElement('afterbegin', node);
    node.classList.add('hidden');
  };
  createErrorNode(); // иначе ругается тревис
  var showErrorMessage = function () {
    node.textContent = '';
    node.classList.remove('hidden');
  };

  var removeErrorMessage = function () {
    node.textContent = '';
    node.classList.add('hidden');
  };
  node.addEventListener('click', removeErrorMessage);


  window.backend = {
    loaddata: loadData,
    senddata: sendData,
    showerror: showErrorMessage
  };

})();

