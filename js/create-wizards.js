'use strict';

(() => {
  const WIZARDS_AMOUNT = 4;
  const setupWindow = document.querySelector(`.setup`);
  const setupSimilar = setupWindow.querySelector(`.setup-similar`);

  setupSimilar.classList.remove(`hidden`);

  // Get random name with surname from given arrays and concatenate
  const getRandomFullName = (name, surname) => {
    const fullName = name[window.util.randomInt(0, name.length - 1)] + ` ` + surname[window.util.randomInt(0, surname.length - 1)];
    return fullName;
  };

  // Create array with wizards settings
  const getWizardsArray = (names, surnames, coatColors, eyesColors) => {
    const wizards = [];

    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      wizards.push({
        name: getRandomFullName(names, surnames),
        coatColor: coatColors[window.util.randomInt(0, coatColors.length - 1)],
        eyesColor: eyesColors[window.util.randomInt(0, eyesColors.length - 1)]
      });
    }

    return wizards;
  };

  const wizardsArray = getWizardsArray(
      window.util.wizardsParameters.NAMES,
      window.util.wizardsParameters.SURNAMES,
      window.util.wizardsParameters.COAT_COLORS,
      window.util.wizardsParameters.EYES_COLORS
  );

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
})();
