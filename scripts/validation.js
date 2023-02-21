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

//---Sprint 6 -->
/*2*/
function setEventListeners(formElements, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = Array.from(
    formElements.querySelectorAll(options.inputSelector)
  );
  const submitButton = formElements.querySelector(submitButtonSelector);

  toggleButtonState(inputElements, submitButton, options);

  formElements.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputElements, submitButton, options);
    },0);
  });
}

  //---^^Sprint 6^^-->
  inputElements.forEach((inputElements) => {
    inputElements.addEventListener("input", (e) => {
      checkInputValidity(formElements, inputElements, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });

//---^Sprint 6^ -->

/*3*/
//---Sprint 6 -->
function checkInputValidity(formElements, inputElements, options) {
  if (!inputElements.validity.valid) {
    return showInputError(formElements, inputElements, options);
  }
  hideInputError(formElements, inputElements, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableSubmitButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}
//---^Sprint 6^ -->

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

//---^^Sprint 6^^ -->

function hideInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageElements = formElements.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.remove(inputErrorClass);
  errorMessageElements.textContent = inputElements.validationMessage;
  errorMessageElements.classList.remove(errorClass);
}
//--^Sprint 6^-->

//---Sprint 6 -->
function toggleButtonState(inputList, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButton, { inactiveButtonClass });
  } else {
    enableSubmitButton(submitButton, { inactiveButtonClass });
  }
}
//---^Sprint 6^ -->

inputList.forEach((inputElements) => {
  inputElements.addEventListener("input", () => {
    checkInputValidity(formElements, inputElements, options);
    toggleButtonState(inputElements, submitButton, options);
  });
});

if (foundInvalid) {
  submitButton.classList.add(inactiveButtonClass);
 (submitButton.disabled = true);
 return;
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
