'use strict';

(() => {
  const WizardsParam = {
    COAT_COLORS: [
      `rgb(101, 137, 164)`,
      `rgb(241, 43, 107)`,
      `rgb(146, 100, 161)`,
      `rgb(56, 159, 117)`,
      `rgb(215, 210, 55)`,
      `rgb(0, 0, 0)`
    ],
    EYES_COLORS: [
      `black`,
      `red`,
      `blue`,
      `yellow`,
      `green`
    ],
    FIREBALL_COLORS: [
      `#ee4830`,
      `#30a8ee`,
      `#5ce6c0`,
      `#e848d5`,
      `#e6e848`
    ]
  };

  // Get a random number in a given range
  const getRandomInteger = (min, max) => {
    const randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  };

  // If event target Enter
  const setEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };

  // If event target Escape
  const setEscapeEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  // Show error message
  const showErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style.zIndex = `100`;
    node.style.margin = `0 auto`;
    node.style.textAlign = `center`;
    node.style.backgroundColor = `#ff156d`;
    node.style.position = `absolute`;
    node.style.left = `0`;
    node.style.right = `0`;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    wizardsParameters: WizardsParam,
    randomInt: getRandomInteger,
    isEnterEvent: setEnterEvent,
    isEscEvent: setEscapeEvent,
    showError: showErrorMessage,
  };
})();
