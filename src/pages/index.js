import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import PopupWithForms from "../components/PopupWithForms";
import Section from "../components/Section.js";
import PopupImage from "../components/PopupWithImages";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

import "..";

import {
  initialCards,
  validationSettings,
  profileEditModal,
  addNewCardModal,
  profileEditButton,
  addNewCardButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardTitleInput,
  cardImageInput,
  cardListElement,
} from "../utils/constants.js";

/*--------------------------Class Constants-----------------------------*/

const userInfoElement = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const editFormValidation = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidation = new FormValidator(validationSettings, addNewCardModal);
const editFormPopup = new PopupWithForms(
  "#profile-modal-form",
  submitEditProfile
);
const addFormPopup = new PopupWithForms("#card-add-modal");
const imagePopup = new PopupImage("#card-image-modal");

const sectionElement = new Section(
  {
    items: initialCards,
    renderer: getView,
  },
  cardListElement
);

/*--------------------------------------------------------------------------*/
editFormValidation.enableValidation();
addFormValidation.enableValidation();

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

sectionElement.renderItems();

/*--------------------------Event Listeners-------------------------*/
profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidation.enableValidation();
  addFormPopup.open(addNewCardModal);
});

/*--------------------------Functions------------------------------*/

function openProfileEditForm() {
  const profileInfo = UserInfo.getUserInfo();
  profileTitleInput.value = profileInfo.nameElement;
  profileDescriptionInput.value = profileInfo.descriptionElement;
  editFormValidation.enableValidation();
  editFormPopup.open();
}

function submitEditProfile(inputValues) {
  console.log(inputValues);
  UserInfo.setUserInfo({
    nameElement: inputValues.name,
    descriptionElement: inputValues.description,
  });
}

function submitAddCard(inputValues) {
  getView({ name: inputValues.place, link: inputValues.url });
}

function getView(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick).getView();
  sectionElement.addItem(card);
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

/*profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.enableValidation();
  openProfileEditForm(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.enableValidation();
  addFormPopup(addNewCardModal);
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

/*--------------------------Card Element--------------------------------*
const cardListElement = document.querySelector(".cards__list");
/* --------------------------Profile Section ---------------------------- *
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
/* ----------------------------Add Card -------------------------------- *
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

/*-------------------------------Event Handler---------------------------*
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

/*-----------------------------------Validation-------------------------------*
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

/* --------------------------------- Section.js -------------------------------- 
const sectionElement = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListElement
);
sectionElement.renderItems();
/* ---------------------------- FormValidator.js ---------------------------- */

/*const editFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#profile-modal-form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#card-add-modal")
);
addFormValidator.enableValidation();

/*------------------------------- Event Listener----------------------------------- *
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

export { openPopUp };*/
