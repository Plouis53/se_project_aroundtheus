import { cardImageModal } from "../utils/constants";

class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
    this._cardData = cardData;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    console.log();
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({
          name: this._name,
          src: this._link,
        });
      });
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}

export default Card;


npm run dev