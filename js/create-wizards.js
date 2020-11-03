'use strict';

(() => {
  const setupSimilar = window.util.setup.querySelector(`.setup-similar`);

  setupSimilar.classList.remove(`hidden`);

  // Create array with wizards settings
  const getWizardsArray = (names, surnames, coatColors, eyesColors) => {
    const wizards = [];

    for (let i = 0; i < window.util.wizardsParameters.WIZARDS_AMOUNT; i++) {
      wizards.push({
        name: names[window.util.randomInt(0, names.length - 1)] + ` ` + surnames[window.util.randomInt(0, surnames.length - 1)],
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
