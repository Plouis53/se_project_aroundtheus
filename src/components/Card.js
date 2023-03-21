class Card {
  getView() {
 
  }
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._LikeButton.addEventListener("click", () => this._handleLikeIcon());
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._cardImage.addEventListener("click", () => this._handlePreview());
  }

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handleLikeIcon = () => {
    this._LikeButton
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handlePreview() {
    this._handleImageClick(this._name, this._link);

  
  getView() {
    this._element = this._getTemplate();
    this._LikeButton = this._element.querySelector(".card__like-button");
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

}

  export default Card;

