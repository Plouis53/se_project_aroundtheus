export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/*----Validation----*/
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

export const cardListElement = document.querySelector(".cards__list");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");

export const profileTitle = document.querySelector("#profile-title-input");
export const profileDescription = document.querySelector(
  "#profile-description-input"
);
export const profileAvatar = document.querySelector(".profile__image");
export const openEditAvatar = document.querySelector("#Avatar-edit-container");
export const avatarEditModal = document.querySelector(
  "#Profile-Avatar-edit-image-modal"
);

export const addNewCardModal = document.querySelector("#card-add-modal");
export const cardAddForm = document.querySelector("#modal-add-card-form");
export const addNewCardButton = document.querySelector("#profile-add-button");

export {
  initialCards,
  validationSettings,
  cardListElement,
  profileEditModal,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileAvatar,
  openEditAvatar,
  avatarEditModal,
  addNewCardModal,
  cardAddForm,
  addNewCardButton,
};
