'use strict';

(() => {
  const TIMEOUT = 10000;
  const RequestType = {
    GET: `GET`,
    POST: `POST`
  };
  const Url = {
    GET: `https://21.javascript.pages.academy/code-and-magick/data`,
    POST: `https://21.javascript.pages.academy/code-and-magick`
  };
  const RequestStatus = {
    400: `Ошибка в запросе`,
    404: `Запрашиваемые данные не найдены`,
    500: `Сервер не может обработать запрос`
  };

  const createRequest = (type, url, onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(type, url);

    xhr.addEventListener(`load`, function () {
      let error;

      switch (xhr.status) {
        case 200:
          if (document.body.firstElementChild.classList.contains(`error-message`)) {
            document.body.firstElementChild.remove();
          }
          onSuccess((type === `GET`) ? xhr.response : null);
          break;

        case 400:
          error = RequestStatus[`400`];
          break;

        case 404:
          error = RequestStatus[`404`];
          break;

        case 500:
          error = RequestStatus[`500`];
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT;

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  const loadData = (onLoad, onError) => {
    createRequest(RequestType.GET, Url.GET, onLoad, onError);
  };

  const saveData = (onLoad, onError, data) => {
    createRequest(RequestType.POST, Url.POST, onLoad, onError, data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };
})();
