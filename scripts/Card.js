import { openPopUp } from "./utils.js";
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.name;
    this._handleImageClick = handleImageClick;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element.addEventListener("click", this._handleLikeIcon);
    this._element.addEventListener("click", this._handleDeleteCard);
    this._element.addEventListener("click", this._handleCardImageModal);
  }

  _handleCardImageModal = (
    cardData,
    cardImageModal,
    modalCardPicture,
    modalCaption
  ) => {
    const addCardTitle = document.querySelector("#card-title");
    const cardImage = document.querySelector("#modal-card-image");

    modalCardPicture.src = this._link;
    modalCardPicture.alt = this._name;
    modalCaption.textContent = this._name;
    openPopUp(cardImageModal);
  };

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handleLikeIcon = () => {
    this._element
      .querySelector(this._cardLikeButton)
      .classList.toggle("card__like-button_active");
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
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
