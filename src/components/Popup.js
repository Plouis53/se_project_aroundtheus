class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
    document.removeEventListener("mousedown", this._handleOverlay);
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
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}

export default Popup;
