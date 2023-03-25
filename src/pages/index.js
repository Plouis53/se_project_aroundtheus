import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import PopupWithForms from "../components/PopupWithForms";
import Section from "../components/Section.js";
import PopupImage from "../components/PopupWithImages";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

import {
  initialCards,
  profileEditModal,
  profileEditButton,
  profileCloseButton,
  profileTitle,
  profileDescription,
  profileEditForm,
  addNewCardModal,
  addNewCardButton,
  cardCloseButton,
  cardListElement,
  cardAddForm,
  cardImageModal,
  cardImageModalClose,
  modals,
  cardSelector,
} from "../utils/constants.js";

/*----Validation----*/
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#profile-modal-form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#modal-add-card-form")
);
addFormValidator.enableValidation();

/*----Class Constants----*/
const editFormPopup = new PopupWithForms(
  "#profile-modal-forml",
  handleProfileFormSubmit
);
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForms("#card-add-modal", handleAddFormSubmit);
addFormPopup.setEventListeners();

const imagePopup = new PopupImage("#card-image-modal");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },

  cardListElement
);

section.renderItems();

/*const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidator = new FormValidator(validationSettings, addNewCardModal);
const editFormPopup = new PopupWithForms(
  "#profile-modal-form",
  submitEditProfile
);*/

/*const addFormPopup = new PopupWithForms("#card-add-modal");
const imagePopup = new PopupImage("#card-image-modal");

const sectionElement = new Section(
  {
    items: initialCards,
    renderer: getView,
  },
  cardListElement
);

/*--------------------------------------------------------------------------
editFormValidation.enableValidation();
addFormValidation.enableValidation();

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopup.setEventListeners();

sectionElement.renderItems();*/

/*--------------------------Event Listeners-------------------------*/
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
  const cardView = getView(cardData);
  renderCard(cardView, cardListElement);
});*/

/*----Functions----*/
function renderCard(cardData) {
  const card = new Card(
    {
      cardData,
      handleImageClick: (cardData) => {
        const image = {
          name: cardData.name,
          link: cardData.src,
        };
        imagePopup.open(image.name, image.link);
      },
    },
    cardSelector
  ).renderCard();
  section.addItem(card);
}

function handleProfileFormSubmit(data) {
  const title = data.title;
  const description = data.description;
  userInfo.setUserInfo({
    name: title,
    job: description,
  });
  editFormPopup.close();
}

function handleAddFormSubmit(inputValues) {
  const card = {
    nameElement: inputValues.name,
    descriptionElement: inputValues.description,
  };
  renderCard(card);
  addFormPopup.close();
}

const setUserForm = ({ name, description }) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
};

/*profileEditButton.addEventListener('click',() => {
  const { name, description } = userInfo.getUserInfo();
  setUserForm({ name, description }); 
  editFormPopup.open();
  editFormValidator.resetValidation();
});

cardAddButton.addEventListener('click',() => {
  addFormValidator.resetValidation();
  addFormPopup.open();
});

/*function handleCardImageModal(cardData) {
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

const cardImageModal = document.querySelector("#card-image-modal");
const modalCardPicture = document.querySelector("#card-image");
const cardImageModalCloseButton = document.querySelector("#card-close-image");

const cardSelector = "#card-template";

const modals = document.querySelector(".modal");

function getCardView(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

/*function renderCard(cardElement, container) {
  container.prepend(cardElement);
}*/
