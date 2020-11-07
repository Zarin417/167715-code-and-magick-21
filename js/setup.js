'use strict';

(() => {
  const setupOpen = document.querySelector(`.setup-open`);
  const setupWindow = document.querySelector(`.setup`);
  const setupForm = setupWindow.querySelector(`.setup-wizard-form`);
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
  const dialogIcon = setupWindow.querySelector(`.upload`);

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

  const setWizardPartColor = (input, element, colors) => {
    input.value = colors[window.util.randomInt(0, colors.length - 1)];

    if (element === fireballWrap) {
      element.style.backgroundColor = input.value;
    } else {
      element.style.fill = input.value;
    }
  };

  const wizardCoatColorHandler = () => {
    setWizardPartColor(wizardCoatInput, wizardCoat, window.util.wizardsParameters.COAT_COLORS);
  };

  const wizardEyesColorHandler = () => {
    setWizardPartColor(wizardEyesInput, wizardEyes, window.util.wizardsParameters.EYES_COLORS);
  };

  const wizardFireballColorHandler = () => {
    setWizardPartColor(fireballInput, fireballWrap, window.util.wizardsParameters.FIREBALL_COLORS);
  };

  const setupWindowEscPressHandler = (evt) => {
    if (document.activeElement !== setupUserName) {
      window.util.isEscEvent(evt, closeSetupWindow);
    }
  };

  const submitSetupFormHandler = (evt) => {
    evt.preventDefault();
    window.backend.save(closeSetupWindow, window.util.showError, new FormData(setupForm));
  };

  const closeSetupWindow = () => {
    setupWindow.classList.add(`hidden`);
    window.dialog.setDefaultPosition();
    document.removeEventListener(`keydown`, setupWindowEscPressHandler);
    setupClose.removeEventListener(`click`, closeSetupWindow);
    setupForm.removeEventListener(`submit`, submitSetupFormHandler);
    setupUserName.removeEventListener(`invalid`, setupUserNameValidationHandler);
    wizardCoat.removeEventListener(`click`, wizardCoatColorHandler);
    wizardEyes.removeEventListener(`click`, wizardEyesColorHandler);
    fireball.removeEventListener(`click`, wizardFireballColorHandler);
    dialogIcon.removeEventListener(`mousedown`, window.dialog.handler);
  };

  const openSetupWindow = () => {
    setupWindow.classList.remove(`hidden`);
    document.addEventListener(`keydown`, setupWindowEscPressHandler);
    setupClose.addEventListener(`click`, closeSetupWindow);
    setupForm.addEventListener(`submit`, submitSetupFormHandler);
    setupUserName.addEventListener(`invalid`, setupUserNameValidationHandler);
    wizardCoat.addEventListener(`click`, wizardCoatColorHandler);
    wizardEyes.addEventListener(`click`, wizardEyesColorHandler);
    fireball.addEventListener(`click`, wizardFireballColorHandler);
    dialogIcon.addEventListener(`mousedown`, window.dialog.handler);
  };

  // Add listeners
  setupOpen.addEventListener(`click`, openSetupWindow);
  setupOpen.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, openSetupWindow);
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, closeSetupWindow);
  });
})();
