'use strict';

(() => {
  const setupWindow = document.querySelector(`.setup`);
  const dialogIcon = setupWindow.querySelector(`.upload`);
  const windowDefaultStyles = window.getComputedStyle(setupWindow);
  const defaultTop = windowDefaultStyles.top;
  const defaultLeft = windowDefaultStyles.left;

  // Set window in default position after close
  const setDefaultPositionSetupWindow = () => {
    setupWindow.style.top = defaultTop;
    setupWindow.style.left = defaultLeft;
  };

  // Settings window move handler
  const dialogHandler = (evt) => {
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

      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + `px`;
      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + `px`;

    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);

      if (dragged) {
        const clickPreventDefaultHandler = (clickEvt) => {
          clickEvt.preventDefault();
          dialogIcon.removeEventListener(`click`, clickPreventDefaultHandler);
        };

        dialogIcon.addEventListener(`click`, clickPreventDefaultHandler);
      }
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  };

  window.dialog = {
    handler: dialogHandler,
    setDefaultPosition: setDefaultPositionSetupWindow
  };
})();
