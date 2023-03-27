import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector("#modal-card-image");
    this._popupCaption = this._popupElement.querySelector(
      "#modal-card-caption"
    );
  }

  open(name, link) {
    this._popupCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }
}

export default PopupWithImage;
