class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  open(modal) {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  close(modal) {
    this._popup.classList.remove("modal_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
    document.addEventListener("mousedown", this._handleOverlay);
  }

  _closeModalByEscape(e) {
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
    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}

export default Popup;
