import Api from "../utils/api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

import {
  validationSettings,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  addNewCardModal
  addNewCardButton,
  avatarEditModal,
  profileAvatar,
  avatarButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "67d93972-468f-4c7a-bef5-b0ddeb015065",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// /*----Validation----*/
// export const validationSettings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_inactive",
//   inputErrorClass: "modal__form-input_error",
//   errorClass: "modal__error_visible",
// };

const editFormValidator = new FormValidator(
  validationSettings,profileEditModal
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings, addNewCardModal
);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationSettings, avatarEditModal
);
avatarFormValidator.enableValidation();

/*----Class Constants----*/

const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
  userAvatar:".profileAvatar",
});
const editFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm("#card-add-modal", handleAddFormSubmit);
addFormPopup.setEventListeners();

const imagePopup = new PopupWithImage("#card-image-modal");
imagePopup.setEventListeners();

// const userInfo = new UserInfo({
//   nameSelector: ".profile__title",
//   descriptionSelector: ".profile__description",
// });

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
    name: inputValues.title,
    link: inputValues.link,
  };
  renderCard(card);
  addFormPopup.close();
}

const fillUserForm = ({ name, description }) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
};

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  fillUserForm({ name, description });
  editFormPopup.open();
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addFormPopup.open();
});
