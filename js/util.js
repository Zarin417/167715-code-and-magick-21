'use strict';

(() => {
  const WizardsParam = {
    NAMES: [
      `Иван`,
      `Хуан Себастьян`,
      `Мария`,
      `Кристоф`,
      `Виктор`,
      `Юлия`,
      `Люпита`,
      `Вашингтон`
    ],
    SURNAMES: [
      `да Марья`,
      `Верон`,
      `Мирабелла`,
      `Вальц`,
      `Онопко`,
      `Топольницкая`,
      `Нионго`,
      `Ирвинг`
    ],
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

  window.util = {
    wizardsParameters: WizardsParam,
    randomInt: getRandomInteger,
    isEnterEvent: setEnterEvent,
    isEscEvent: setEscapeEvent
  };
})();
