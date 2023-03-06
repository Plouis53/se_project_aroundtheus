import { handleImageClick } from "./index.js";
class Card {
  constructor(data, cardSelector) {
    this._name.data.name;
    this._link.data.name;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelectorAll(".card__like-button_active")
      .addEventListener("click", this._handleLikeIcon);
    this._element
      .querySelectorAll("#deleteCard")
      .addEventListener("click", this._handleDeleteCard);
    this._element
      .querySelectorAll(".card__image")
      .addEventListener("click", this._handleCardImage);
  }

  _handleCardImage(cardData, cardImageModal, modalCardPicture, modalCaption) {
    const addCardTitle = document.querySelector("#card-title");
    const cardImage = document.querySelector("#modal-card-image");

    modalCardPicture.src = cardData.link;
    modalCardPicture.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    cardData(cardImageModal);
    handleImageClick();
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelectorAll(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _getView() {
    this._element.this._getTemplate();
    this._setEventListeners();
  }

  renderCard() {
    this._element = this._getTemplate();
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._addCardTitle = this._element.querySelector(".card__title");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._addCardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
