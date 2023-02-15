//---Sprint 6 -->

/*1*/
function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElements) => {
    formElements.addEventListener("submit", (e) => {
      e.preventDefault;
    });

    setEventListeners(formElements, options);
  });
}

/*2*/
function setEventListeners(formElements, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputList = [...formElements.querySelectorAll(inputSelector)];
  const submitButton = formElements.querySelector(submitButtonSelector);

  formElements.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, submitButton, options);
    });
  });

  inputList.forEach((inputElements) => {
    inputElements.addEventListener("input", (e) => {
      checkInputValidity(formElements, inputElements, options);
      toggleButtonState(inputList, submitButton, options);
    });
  });
}

/*3*/
function checkInputValidity(formElements, inputElements, options) {
  if (!inputElements.validity.valid) {
    return showInputError(formElements, inputElements, options);
  }
  hideInputError(formElements, inputElements, options);
}

function showInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageElements = formElements.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.add(inputErrorClass);
  errorMessageElements.textContent = inputElements.validationMessage;
  errorMessageElements.classList.add(errorClass);
}

function hideInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageElements = formElements.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.remove(inputErrorClass);
  console.log(`#${inputElements.id}-error`);
  errorMessageElements.textContent = " ";
  errorMessageElements.classList.remove(errorClass);
}
function toggleButtonState(inputList, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;

  inputList.forEach((inputElements) => {
    if (!inputElements.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

/* ---------------------------- Validation Object --------------------------- */
const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

enableValidation(options);
/* ---------------------------- ^Validation Object^ --------------------------- */
