'use strict';

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];
const SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];
const WIZARDS_AMOUNT = 4;
const setupWindow = document.querySelector(`.setup`);
const setupSimilar = setupWindow.querySelector(`.setup-similar`);

setupWindow.classList.remove(`hidden`);
setupSimilar.classList.remove(`hidden`);

// Get a random number in a given range
const getRandomInteger = (min, max) => {
  const randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
};

// Get random name with surname from given arrays and concatenate
const getRandomFullName = (name, surname) => {
  const fullName = name[getRandomInteger(0, name.length - 1)] + ` ` + surname[getRandomInteger(0, surname.length - 1)];
  return fullName;
};

// Create array with wizards settings
const getWizardsArray = (names, surnames, coatColors, eyesColors) => {
  const wizards = [];

  for (let i = 0; i < WIZARDS_AMOUNT; i++) {
    wizards.push({
      name: getRandomFullName(names, surnames),
      coatColor: coatColors[getRandomInteger(0, coatColors.length - 1)],
      eyesColor: eyesColors[getRandomInteger(0, eyesColors.length - 1)]
    });
  }
  return wizards;
};

const wizardsArray = getWizardsArray(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

// Create DOM-element based on template
const createWizard = (wizard) => {
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
};

// Rendering of created elements
const insertFragment = () => {
  const setupSimilarList = setupSimilar.querySelector(`.setup-similar-list`);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(createWizard(wizardsArray[i]));
  }
  setupSimilarList.appendChild(fragment);
};

insertFragment();
