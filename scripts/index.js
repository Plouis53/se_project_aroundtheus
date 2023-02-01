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
const addCloseButton = addNewCardModal.querySelector("#card-close-button");
const addCardTitle = document.querySelector("#card-title");
const cardImage = document.querySelector("#modal-card-image");
const cardTitleInput = document.querySelector("#modal-card-title-input");
const cardImageInput = document.querySelector("#modal-card-image-input");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = addNewCardModal.querySelector("#modal-add-card-form");

const modalCardPicture = document.querySelector("#card-image-modal");
const modalCaption = document.querySelector("#modal-card-caption");
const cardImageModal = document.querySelector("#card-modal-image");
const cardImageModalCloseButton = document.querySelector("#card-close-image");
//---^Sprint 5^ -->

/* Functions*/
//---Sprint 5 -->
function closePopop() {
  profileEditModal.classList.remove("modal_opened");
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(
    "#modal-card-delete-button"
  );

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", deleteCard);

  cardImageElement.addEventListener("click", () => {
    handleCardImageModal(cardData);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  return cardElement;
}
//---^Sprint 5^ -->

/* Event Handler */
//---Sprint 5 -->
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  addCardTitle.textContent = cardTitleInput.value;
  cardImage.src = cardImageInput.value;
  cardImage.alt = cardImageInput.value;
  closePopUp(addNewCardModal);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

function handleCardImageModal(cardData) {
  modalCardPicture.src = cardData.link;
  modalCardPicture.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  closePopUp(cardImageModal);
}
//---^Sprint 5^ -->
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

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({ name, link });
  renderCard(cardView, cardListElement);
  closePopUp(addNewCardModal);
  cardAddForm.reset();
});

initialCards.forEach((cardData) => {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListElement);
});
