class Card {
  constructor(data, cardSelector, cardTemplate, handleCardImageModal) {
    this._name = data.name;
    this._link = data.link;

    this.data = data;
    this._cardSelector = cardSelector;
    this._cardTemplate = cardTemplate;
    this.__handleCardImageModal = handleCardImageModal;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardImageModal());
  }

  _handleCardImageModal = () => {
    modalCardPicture.querySelector(".modal__image-card").src = this._link;
    modalCardPicture.alt = this._name;
    modalCaption.textContent = this._name;
    openPopUp(modalCardPicture);
  };

  /*_openImageModal() {
    this._handleCardImageModal(this._name, this._link);
  }*/

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handleLikeIcon = () => {
    this._element
      .querySelector(".card__like-button")
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

export default Card;
