class Card {
  constructor(
    cardData,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    loadingLikeCheck
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._loadingLikeCheck = loadingLikeCheck;
    this._userId = userId;
    this._userCardOwnerId = cardData["owner"]._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  } 

  setCardEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setLikesCounter(likes) {
    this._likes = likes;
    this._cardLikes.textContent = likes;
  }

  addCardLike() {
    this._likeButton.classList.add("card__like-button_active");
  }

  removeCardLike() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  checkCardLikeState() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      return true;
    } else {
      return false;
    }
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._imageModal = this._cardElement.querySelector("#card-image-modal");

    this._cardLikes = this._cardElement.querySelector(".card__likes-counter");
    this._loadingLikeCheck(this._likes, this._likeButton);
    this._cardLikes.textContent = this._likes.length;

    if (this._userId != this._userCardOwnerId) {
      this._deleteButton.remove();
    }
    this.setCardEventListeners();
    return this._cardElement;
  }
}

export default Card;
