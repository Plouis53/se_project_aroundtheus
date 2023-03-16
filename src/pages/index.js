import "./index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopUp, closePopUp } from "./utils.js";
import PopupWithForms from "../components/PopupWithForms";
import Section from "../components/Section.js";
import PopupWithImages from "../components/PopupWithImages";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";

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

/*--------------------------Card Element--------------------------------*/
const cardListElement = document.querySelector(".cards__list");
/* --------------------------Profile Section ---------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileModalForm = document.querySelector("#profile-modal-form");
/* ----------------------------Add Card -------------------------------- */
const modalAddCardForm = document.querySelector("#modal-add-card-form");
const addNewCardModal = document.querySelector("#card-add-modal");
const addNewCardButton = document.querySelector("#profile-add-button");
const addCloseButton = addNewCardModal.querySelector("#card-close-button");
const addCardTitle = document.querySelector("#card-title");
const cardImage = document.querySelector("#modal-card-image");
const cardTitleInput = document.querySelector("#modal-card-title-input");
const cardImageInput = document.querySelector("#modal-card-image-input");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddForm = addNewCardModal.querySelector("#modal-add-card-form");

const cardImageModal = document.querySelector("#card-image-modal");
const modalCardPicture = document.querySelector("#card-image");
const cardImageModalCloseButton = document.querySelector("#card-close-image");

const cardSelector = "#card-template";

const modals = document.querySelector(".modal");

function getCardView(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function deleteCard(e) {
  e.target.closest(".card").remove();
}

/*-------------------------------Event Handler---------------------------*/
function handleCardImageModal(cardData) {
  modalCardPicture.src = cardData.link;
  modalCardPicture.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openPopUp(cardImageModal);
}

function handleImageClick() {
  cardData.open(cardImageModal);
}

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

/*-----------------------------------Validation-------------------------------*/
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

/* --------------------------------- Section.js -------------------------------- */
const sectionElement = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListElement
);
sectionElement.renderItems();
/* ---------------------------- FormValidator.js ---------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#profile-modal-form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#card-add-modal")
);
addFormValidator.enableValidation();

/*------------------------------- Event Listener----------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.enableValidation();
  openPopUp(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.enableValidation();
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

export { openPopUp };

/* -------------------------------- popups -------------------------------- */
const editFormPopup = new PopupWithForm(
  "#profile-modal-form",
  submitEditProfile
);
const addFormPopup = new PopupWithForms("#card-add-modal", submitAddCard);
const imagePopup = new PopupWithImage({ popupSelector: "#card-image-modal" });
const userInfoElement = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: ".profile__description",
});