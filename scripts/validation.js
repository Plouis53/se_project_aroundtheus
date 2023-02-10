// enabling validation by calling enableValidation()
// pass all the settings on call
//---Sprint 6 -->

function showInputError() {}

function checkInputValidity() {}

function setEventListeners(formElements, options) {
  const { inputSelector } = options;
  const inputElements = [...formElements.querySelectorAll(inputSelector)];
  inputElements.forEach((inputElements) => {
    inputElements.addEventListener("input", (e) => {
      console.log(inputElements.validationMessage);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElements) => {
    formElements.addEventListener("submit", (e) => {
      e.preventDefault;
    });

    setEventListeners(formElements, options);
    {
    }
  });
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

enableValidation(options);
