import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import PopupWithForm from "../components/PopupWithForms";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImages";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

import {
  initialCards,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  addNewCardButton,
  cardListElement,
  cardSelector,
} from "../utils/constants.js";

/*----Validation----*/
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
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
const editFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm("#card-add-modal", handleAddFormSubmit);
addFormPopup.setEventListeners();

const imagePopup = new PopupWithImage("#card-image-modal");
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

/*----Functions----*/
function renderCard(cardData) {
  console.log;
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
    description: description,
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

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  setUserForm({ name, description });
  editFormPopup.open();
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addFormPopup.open();
});
