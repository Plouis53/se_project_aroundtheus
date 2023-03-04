

class formValidator {
  constructor(settings, formElements) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElements;
  }

  _toggleButtonState(){}

  _hasInvalidInput(){}


   // *setEventListeners in the class *//
  _setEventListeners() {
    this.inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElements) => {
        inputElements.addEventListener("input", () => {
          checkInputValidity(this.form, inputElements, rest); 
          toggleButtonState(inputList, submitButton, inactiveButtonClass );
        });
      });
  }

  const editFormValidator = new formValidator(settings, editForm);
  editFormValidator.enableValidation();






















    /*this._form.addEventListener("reset", () => {
        setTimeout(() => {
          this._toggleButtonState();
        });
      });

      this._toggleButtonState();
      this.inputElements.forEach((inputElements) => {
        inputElements.addEventListener("input", () => {
          this._checkInputValidity(inputElements); 
          this._toggleButtonState();
        });
      });
    }

  _toggleButtonState() {
    const isFormValid = this.checkInputValidity();

    if (!isFormValid) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  }

  /*
  _checkInputValidity = () =>
  this._inputElements.every((input) => input.validity.valid);

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
}


  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

/*const editFormValidator = new formValidator(settings, editForm);
const addFormValidator = new formValidator(settings, addForm);
