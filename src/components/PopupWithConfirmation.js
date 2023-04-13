import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    // this._confirmButton = document.querySelector("#Delete-confirm-button");
    this._saveButton = document.querySelector(".modal__button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Loading...";
    } else {
      this._saveButton.textContent = "Yes";
    }
  }

  // _handleSubmit(e) {
  //   e.preventDefault();
  //   this._handleSubmit();
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
export default PopupWithConfirmation;
