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
const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];
const WIZARDS_AMOUNT = 4;
const setupWindow = document.querySelector(`.setup`);
const setupSimilar = setupWindow.querySelector(`.setup-similar`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setupWindow.querySelector(`.setup-close`);
const setupUserName = setupWindow.querySelector(`.setup-user-name`);
const setupPlayer = setupWindow.querySelector(`.setup-player`);
const wizardCoat = setupPlayer.querySelector(`.wizard-coat`);
const wizardCoatInput = setupPlayer.querySelector(`input[name='coat-color']`);
const wizardEyes = setupPlayer.querySelector(`.wizard-eyes`);
const wizardEyesInput = setupPlayer.querySelector(`input[name='eyes-color']`);
const fireballWrap = setupPlayer.querySelector(`.setup-fireball-wrap`);
const fireball = fireballWrap.querySelector(`.setup-fireball`);
const fireballInput = fireballWrap.querySelector(`input[name='fireball-color']`);

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

/* Create listeners for buttons to open and close the settings window; for changing wizard's coat, eyes and fireball colors.
  Change validation massage for user name field.
*/
const setupUserNameValidationHandler = () => {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity(`Имя не может быть меньше 2-х символов`);
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity(`Поле обязательно для заполнения`);
  } else {
    setupUserName.setCustomValidity(``);
  }
};

const setupWindowEscPressHandler = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== setupUserName) {
    evt.preventDefault();
    setupWindow.classList.add(`hidden`);
  }
};

const getWizardPartColor = (colors) => {
  const color = colors[getRandomInteger(0, colors.length - 1)];
  return color;
};

const setWizardPartColorFill = (input, element, colors) => {
  input.value = getWizardPartColor(colors);
  element.style.fill = input.value;
};

const setWizardPartColorBg = (input, element, colors) => {
  input.value = getWizardPartColor(colors);
  element.style.backgroundColor = input.value;
};

const wizardCoatFillHandler = () => {
  setWizardPartColorFill(wizardCoatInput, wizardCoat, COAT_COLORS);
};

const wizardEyesFillHandler = () => {
  setWizardPartColorFill(wizardEyesInput, wizardEyes, EYES_COLORS);
};

const wizardFireballBgHandler = () => {
  setWizardPartColorBg(fireballInput, fireballWrap, FIREBALL_COLORS);
};

const openSetupWindow = () => {
  setupWindow.classList.remove(`hidden`);
  document.addEventListener(`keydown`, setupWindowEscPressHandler);
  setupUserName.addEventListener(`invalid`, setupUserNameValidationHandler);
  wizardCoat.addEventListener(`click`, wizardCoatFillHandler);
  wizardEyes.addEventListener(`click`, wizardEyesFillHandler);
  fireball.addEventListener(`click`, wizardFireballBgHandler);
};

const closeSetupWindow = () => {
  setupWindow.classList.add(`hidden`);
  document.removeEventListener(`keydown`, setupWindowEscPressHandler);
  setupUserName.removeEventListener(`invalid`, setupUserNameValidationHandler);
  wizardCoat.removeEventListener(`click`, wizardCoatFillHandler);
  wizardEyes.removeEventListener(`click`, wizardEyesFillHandler);
  fireball.removeEventListener(`click`, wizardFireballBgHandler);
};

// Add listeners
setupOpen.addEventListener(`click`, openSetupWindow);

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openSetupWindow();
  }
});

setupClose.addEventListener(`click`, closeSetupWindow);

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closeSetupWindow();
  }
});
