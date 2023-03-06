//---Sprint 6 -->
/*1*/
function enableValidation(options) {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((formElements) => {
    formElements.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElements, options);
  });
}
/*2*/
function showInputError(
  formElements,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElements = formElements.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElements.textContent = inputElement.validationMessage;
  errorMessageElements.classList.add(errorClass);
}
/*3*/
function hideInputError(
  formElements,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElements = formElements.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElements.textContent = inputElement.validationMessage;
  errorMessageElements.classList.remove(errorClass);
}
/*4*/
function checkInputValidity(formElements, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElements, inputElement, options);
  }
  hideInputError(formElements, inputElement, options);
}
/*5*/
function hasInvalidInput(inputList) {
  console.log(inputList);
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
/*6*/
function disableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}
/*7*/
function enableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}
/*8*/
function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  console.log(hasInvalidInput(inputElements));
  if (hasInvalidInput(inputElements)) {
    disableSubmitButton(submitButton, { inactiveButtonClass });
  } else {
    enableSubmitButton(submitButton, { inactiveButtonClass });
  }
}
/*9*/
function setEventListeners(formElements, options) {
  const inputElements = Array.from(
    formElements.querySelectorAll(options.inputSelector)
  );
  const submitButton = formElements.querySelector(options.submitButtonSelector);

  toggleButtonState(inputElements, submitButton, options);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElements, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });

  formElements.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputElements, submitButton, options);
    }, 0);
  });
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
//---^Sprint 6^ -->

enableValidation(options);
/* ---------------------------- ^Validation Object^ --------------------------- */
