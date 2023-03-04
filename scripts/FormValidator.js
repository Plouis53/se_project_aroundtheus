class formValidator {
  constructor(settings, formElements) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElements;
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._form.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._form.querySelector(
      this._submitButtonSelector
    );

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this.form, options); 
        this._toggleButtonState(inputElement, submitButton, options);
      });
    });
  }

  _toggleButtonState(){
    const validInput = this._hasInvalidInput();

    if (!validInput) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  
  _hasInvalidInput = () =>
    this._inputElement.every((input) => input.validity.valid);


  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(this._form, inputElement, options);
      }
  }

  _showInputError(inputElement, validationMessage){
    const errorMessageElements = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.add(this._inputErrorClass);
      errorMessageElements.textContent = inputElement.validationMessage;
      errorMessageElements.classList.add(this._errorClass);
    }
  }

  _hideInputError(inputElement){
    const errorMessageElements = this._form.querySelector(
        `#${inputElement.id}-error`
      );
  
      inputElement.classList.remove(this._inputErrorClass);
      errorMessageElements.textContent = inputElement.validationMessage;
      errorMessageElements.classList.remove(this._errorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    setEventListeners(this._form, options);
  };

  const editFormValidator = new formValidator(settings, editForm);
  editFormValidator.enableValidation();

  export default formValidator; 