class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._openEditAvatar = document.querySelector("#Avatar-Form-container");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this.removeEventListeners();
  }

  _handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleOverlay = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
    this._closeButton.addEventListener("click", this.close);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeClose);
    this._popupElement.removeEventListener("mousedown", this._handleOverlay);
    this._closeButton.removeEventListener("click", this.close);
  }
}

export default Popup;
