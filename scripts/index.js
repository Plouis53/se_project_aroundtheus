const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements*/
//---Sprint 4 -->
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
//---^Sprint 4 ^-->

//---Sprint 5 -->
const addNewCardModal = document.querySelector("#card-add-modal");
const addNewCardButton = document.querySelector("#profile-add-button");
// need to add close button for add new card modal
const addCloseButton = addNewCardModal.querySelector("#card-close-button");
const addCardTitle = document.querySelector("#modal-title-card");
const cardImage = document.querySelector("#modal-card-image");
const cardTitleInput = document.querySelector("#modal-card-title-input");
const cardImageInput = document.querySelector("#modal-card-image-input");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = addNewCardModal.querySelector("#modal-add-card-form");

const modalCardPicture = document.querySelector("modal modal modal__opened");
const modalCaption = document.querySelector("#modal-card-caption");
const cardImageModal = document.querySelector("#modal-card-image");
const cardImageModalCloseButton = document.querySelector("#card-close-image");
//---^Sprint 5^ -->

/* Functions*/
//---Sprint 5 -->
/*function closePopUp(popUp) {
  popUp.classList.remove("modal_opened");
}

function openPopUp(popUp) {
  popUp.classList.add("modal_opened");
}

function rendercards(cardElement, container) {
  container.prepend(cardElement);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function cardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#modal-card-image");
  const cardTitleElement = cardElement.querySelector("#modal-card-title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", deleteCard);

  cardImageElement.addEventListener("click", () => {
    handleCardImageModal(cardData);
  });
}*/

/* Functions*/
//---Sprint 5 -->
function closePopop() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}

/* Event Handler */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  openPopUp(addNewCardModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCloseButton.addEventListener("click", () => {
  closePopUp(addNewCardModal);
});

cardImageModalCloseButton.addEventListener("click", () => {
  closePopUp(cardImageModal);
});

/*cardAddForm.addEventListener("submit", (e) =>{
  e. preventDefault();
  const name=e.target.title.value;
  const link=e.target.link.value;
  const cardView, getCardView ({name, link});
  renderCard(cardView, cardListElement);
  closePopUp(addNewCardModal);
  cardAddForm?.requestFullscreen();
});*/

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.append(cardElement);
});
