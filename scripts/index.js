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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
//---^Sprint 4 ^-->

//---Sprint 5 -->
const cardAddModal = document.querySelector("#modal-add-card");
const cardAddButton = document.querySelector("#profile-add-button");
const cardTitle = document.querySelector("#modal-card-moniker");
const cardImage = document.querySelector("#modal-card-image");
const cardTitleInput = document.querySelector("#modal-card-title-input");
const cardImageInput = document.querySelector("#modal-card-image-input");
const cardCloseButton = cardAddModal.querySelector(
  "#modal-add-card-close-button"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = cardAddModal.querySelector("#modal-add-card-form");

const modalCardPicture = document.querySelector("#modal-card-picture");
const modalCaption = document.querySelector("#modal-card-caption");
const cardImageModal = document.querySelector("#modal-card-image");
const cardImageModalClose = document.querySelector("#modal-card-close-image");

/* Functions*/
//---Sprint 5 -->
/* function closePopUp(popUp) {
  popUp.classList.add("modal_opened");
}

function openPopop (popUp){
  popUp.classList.("modal_opened");
}

function rendercards (cardElement, container) {
  container.prepend(cardElement);
}

function deleteCard (e){
  e.target.closest (".card").remove(;)
}
*/

function closePopUp() {
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

/* Event Handler */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopop();
}

/* Event Listener */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditClose.addEventListener("click", closePopUp);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.append(cardElement);
});

/* fill in
for (let i = 0; i < initialCards.length; i++) {
  cardWrap.prepend(getCardElement(initialCards[i]));
}
*/
initialCards.forEach((cardData) => {});
