'use strict';

(() => {
  const WIZARDS_PARAMETERS = {
    WIZARDS_AMOUNT: 4,
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
  const setupWindow = document.querySelector(`.setup`);

  // Get a random number in a given range
  const getRandomInteger = (min, max) => {
    const randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  };

  window.util = {
    wizardsParameters: WIZARDS_PARAMETERS,
    setup: setupWindow,
    randomInt: getRandomInteger,
    isEnterEvent: (evt, action) => {
      if (evt.key === `Enter`) {
        action();
      }
    },
    isEscEvent: (evt, action) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    }
  };
})();
