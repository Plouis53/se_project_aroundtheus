import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    const popupImage = this._popup.querySelector(".modal__image-card");

    const popupImageTitle = this._popup.querySelector(".modal__caption-card");

    popupImage.src = link;
    popupImageTitle.textContent = name;
    popupImage.alt = `Photo of ${name}`;
    super.open();
  }
}
