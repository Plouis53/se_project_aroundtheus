class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);

    this._CloseButton = this._popup.querySelector(".modal__close");
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this.removeEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(e) {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleOverlay);
    this._CloseButton.addEventListener("click", this.close);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this._handleOverlay);
    this._CloseButton.removeEventListener("click", this.close);
  }
}

export default Popup;
