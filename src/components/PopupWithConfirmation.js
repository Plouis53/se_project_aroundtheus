import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = document.querySelector("#Delete-confirm-button");
    this._saveButton = document.querySelector(".modal__button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleSubmit();
    });
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
export default PopupWithConfirmation;
