'use strict';

(() => {
  const WIZARDS_AMOUNT = 4;
  const setupWindow = document.querySelector(`.setup`);
  const setupSimilar = setupWindow.querySelector(`.setup-similar`);

  // Create DOM-element based on template
  const createWizard = (wizard) => {
    const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`);
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Rendering of created elements
  const insertFragment = (wizards) => {
    const setupSimilarList = setupSimilar.querySelector(`.setup-similar-list`);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }

    setupSimilarList.appendChild(fragment);
    setupSimilar.classList.remove(`hidden`);
  };

  window.backend.load(insertFragment, window.util.showError);
})();
