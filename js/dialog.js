'use strict';

(() => {
  const setup = window.util.setup;
  const dialogHandle = setup.querySelector(`.upload`);

  // Settings window move handler
  const dialogHandleHandler = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    let dragged = false;

    const mouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + `px`;
      setup.style.left = (setup.offsetLeft - shift.x) + `px`;

    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);

      if (dragged) {
        const clickPreventDefaultHandler = (clickEvt) => {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, clickPreventDefaultHandler);
        };

        dialogHandle.addEventListener(`click`, clickPreventDefaultHandler);
      }
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  };

  window.dialog = {
    handle: dialogHandle,
    handleHandler: dialogHandleHandler
  };
})();
