// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg",
//   },
// ];

/*----Validation----*/
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
// export const profileCloseButton = document.querySelector("#card-close-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// export const profileEditForm = document.querySelector("#profile-modal-form");

/*export const profileEditForm = profileEditModal.querySelector(
  "#profile-modal-form"
);*/

export const addNewCardModal = document.querySelector("#card-add-modal");
export const addNewCardButton = document.querySelector("#profile-add-button");
// export const cardCloseButton = document.querySelector("#card-close-button");
/*export const cardCloseButton =
  addNewCardModal.querySelector("#card-close-button");*/

export const avatarEditModal = document.querySelector(
  "#profile-image-edit-modal"
);
export const profileAvatar = document.querySelector(".profile__image");
export const avatarButton = document.querySelector(".profile__avatar-edit");

// export const cardListElement = document.querySelector(".cards__list");
// export const cardAddForm = document.querySelector("#modal-add-card-form");
// export const cardImageModal = document.querySelector("#card-image-modal");
// export const cardImageModalClose = document.querySelector("#card-close-image");

// export const modals = document.querySelectorAll(".modal");
// export const modalCardPicture = document.querySelector("#card-image");

// export const cardSelector = "#card-template";
