import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import PopupWithForms from "../components/PopupWithForms";
import Section from "../components/Section.js";
import PopupImage from "../components/PopupWithImages";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

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
  profileEditForm,
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

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidator = new FormValidator(validationSettings, addNewCardModal);
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
editFormValidator.enableValidation();
addFormValidator.enableValidation();

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

sectionElement.renderItems();

/*--------------------------Event Listeners-------------------------*/
profileEditButton.addEventListener("click", () => {
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

/*--------------------------Functions------------------------------*/

function handleCardImageModal(cardData) {
  modalCardPicture.src = cardData.link;
  modalCardPicture.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openPopUp(cardImageModal);
}

function handleImageClick(name, link) {
  imagePopup.open(cardImageModal);
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

function openProfileEditForm() {
  const profileInfo = UserInfo.getUserInfo();
  profileTitleInput.value = profileInfo.nameElement;
  profileDescriptionInput.value = profileInfo.descriptionElement;
  editFormValidator.enableValidation();
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
