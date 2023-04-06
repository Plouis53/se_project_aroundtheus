class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscape = this._handleEscapeClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay = (e) => {
    if (
      e.target.classList.contains("modal_opened") ||
      e.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
  }
}

export default Popup;
