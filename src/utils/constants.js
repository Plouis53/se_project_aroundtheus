export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

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

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addNewCardModal = document.querySelector("#card-add-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const cardAddForm = addNewCardModal.querySelector(".modal__form");

export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector("#profile-add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardTitleInput = document.querySelector("#modal-card-title-input");
export const cardImageInput = document.querySelector("#modal-card-image-input");
export const cardListElement = document.querySelector(".cards__list");
