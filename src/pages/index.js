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
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "67d93972-468f-4c7a-bef5-b0ddeb015065",
    "Content-Type": "application/json",
  },
});

let userId;
let cardSection;

api
  .getAppInfo()
  .then(([cardsResponse, userResponse]) => {
    userId = userResponse._id;
    userInfo.setUserInfo(userResponse);
    userInfo.setAvatar(userResponse);

    cardSection = new Section(
      {
        items: cardsResponse,
        renderer: renderCard,
      },
      cardListElement
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

  function renderCard(cardData) {
    const cardListElement = new Card(
      cardData,
      userId,)
      "#card-template"
      /* ---- handleImageCLick ----*/
      (name, link) => {
        imagePopup.open(name, link);
      }
  }
      /* ---- handleLikeClick ----*/
      (cardId, isLiked) => {
        if (!isLiked) {
          api
            .addLikes(cardId)
            .then((res) => {
              cardListElement.updateLikes(res.likes);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          api
            .removeLikes(cardId)
            .then((res) => {
              cardListElement.updateLikes(res.likes);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },

       /* ---- handleLikeClick ----*/
       (cardId) => {
        delPopup.setSubmitAction(() => {
          delPopup.showLoading();
          return api
            .deleteCard(cardId)
            .then(() => {
              cardListElement.removeCard();
              delPopup.close();
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              delPopup.hideLoading();
            });
        });
        delPopup.open();
      }
    cardListElement.prepend(cardListElement.renderCard());
  }
  
  function openProfileEditForm() {
    const { name, about } = userInfo.getUserInfo();
    profileTitle.value = name;
    profileDescription.value = about;
    editFormPopup.open();
  }
  
  function submitEditProfile(inputValues) {
    editFormPopup.showLoading();
    return api
      .updateProfileInfo(inputValues.title, inputValues.description)
      .then(() => {
        userInfo.setUserInfo({
          name: inputValues.title,
          about: inputValues.description,
        });
        editFormPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        editFormPopup.hideLoading();
      });
  }
  
  function submitAddCard({ name, link }) {
    addFormPopup.showLoading();
    return api
      .addNewCard(name, link)
      .then((res) => {
        renderCard(res, cardListElement);
      })
      .then(() => {
        this.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        addFormPopup.hideLoading();
      });
  }
  
  function submitAvatar({ avatar }) {
    avatarForm.showLoading();
    return api
      .updateAvatar(avatar)
      .then((res) => {
        userInfo.setAvatar({ avatar: res.avatar });
      })
      .then(() => {
        this.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        avatarForm.hideLoading();
      });
  }


/* ----Popups---- */
const avatarForm = new PopupWithForm("#Avatar-modal", {
  handleFormSubmit: submitAvatar,
  loadingButtonText: "Saving...",
});
const editFormPopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: submitEditProfile,
  loadingButtonText: "Saving...",
});
const addFormPopup = new PopupWithForm("#card-add-modal", {
  handleFormSubmit: submitAddCard,
  loadingButtonText: "Saving...",
});
const delPopup = new PopupWithConfirm("#Delete-Confirm-modal", "Saving...");
const imagePopup = new PopupWithImage({ popupSelector: "#card-image-modal" });
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});   
/* ----^Popups^---- */

/*----Validators----*/
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

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
/*----^Validators^----*/

/*----Listeners----*/
profileEditButton.addEventListener("click", () => {
  openProfileEditForm();
});

addNewCardButton.addEventListener("click", () => {
  addFormPopup.open(addNewCardModal);
});

openEditAvatar.addEventListener("click", () => {
  avatarForm.open(#Avatar-Form);
});
/*----^Listeners^----*/

// /*----Class Constants----*/
// const userInfo = new UserInfo({
//   userName: ".profile__title",
//   userJob: ".profile__description",
//   userAvatar:".profileAvatar",
// });

// /*----Functions----*/
// function openProfileEditForm() {
//   const { name, job } = userInfo.getUserInfo();
//   profileTitleInput.value = name;
//   profileDescriptionInput.value = job;
//   profilePopup.open();
// }

// profileEditButton.addEventListener("click", openProfileEditForm);

// const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
//   profilePopup.isLoadingButtonState(true);
//   api
//     .updateProfileInfo(values)
//     .then((data) => {
//       userInfo.setUserInfo(data);
//       profilePopup.close();
//     })
//     .finally(() => {
//       profilePopup.isLoadingButtonState(false, "Save");
//     });
// });

// profilePopup.setEventListeners();

// const avatarPopup = new PopupWithForm("#profile-image-edit-modal", (values) => {
//   avatarPopup.isLoadingButtonState(true);
//   api
//     .updateProfileAvatar(values.avatar)
//     .then((data) => {
//       userInfo.setUserInfo(data);
//       avatarPopup.close();
//     })
//     .finally(() => {
//       avatarPopup.isLoadingButtonState(false, "Save");
//     });

//   avatarButton.addEventListener("click", () => avatarPopup.open());

//   avatarPopup.setEventListeners();
// });


// const previewPopup = new PopupWithImage("#card-image-modal");
// previewPopup.setEventListeners();

// const deleteCardPopup = new PopupWithConfirmation("#delete-confirm-modal");
// let cardSection;
// let userId;

// deleteCardPopup.setEventListeners();


// function createCard(cardData) {
//   const card = new Card(
//     cardData,
//     userId,
//     '#card-template',
//     (cardName, cardLink) => {
//       previewPopup.open(cardName, cardLink);
//     },

//     (cardId) => {
//       deleteCardPopup.open();
//       deleteCardPopup.setSubmitAction(() => {
//         api
//           .deleteUserCard(cardId)
//           .then(() => {
//             card.deleteCard();
//             deleteCardPopup.close();
//           });
//       });
//     },

//     (cardId) => {
//       if (card.checkCardLikeState()) {
//         api
//           .removeCardLikes(cardId)
//           .then((data) => {
//             card.removeCardLike();
//             card.setLikesCounter(data.likes.length);
//           });
//       } else {
//         api 
//           .addCardLikes(cardId)
//           .then((data) => {
//             card.addCardLike();
//             card.setLikesCounter(data.likes.length);
//           });
//       }
//     },

//     (cardData) => {
//       cardData.forEach((cardObject) => {
//         if (cardObject._id === userId) {
//           card.addCardLike();
//         }
//       });
//     }
//   );
//   return card;
// }

// api 
//   .getAPIInfo()
//   .then(([userData, userCards]) => {
//     userId = userData._id;
//     userInfo.setUserInfo(userData);
//     cardSection = new Section(
//       {
//         items: userCards,
//         renderer: (cardData) => {
//           const newCard = createCard(cardData);
//           cardSection.addItem(newCard.getView());
//         },
//       },
//       ".cards__list"
//     );
//     cardSection.renderItems();
//   });

// const addCardPopup = new PopupWithForm("#card-add-modal", (values) => {
//   addCardPopup.isLoadingButtonState(true);
//   api
//     .addNewCard(values)
//     .then((data) => {
//       const addCard = createCard(data);
//       addCardPopup.close();
//       cardSection.addItem(addCard.getView());
//     })
//     .finally(() => {
//       addCardPopup.isLoadingButtonState(false, "Create");
//     });
//   });
  
// cardAddButton.addEventListener("click", () => addCardPopup.open());
// addCardPopup.setEventListeners();
// const editFormPopup = new PopupWithForm(
//   "#profile-edit-modal",
//   handleProfileFormSubmit
// );
// editFormPopup.setEventListeners();

// const addFormPopup = new PopupWithForm("#card-add-modal", handleAddFormSubmit);
// addFormPopup.setEventListeners();

// const imagePopup = new PopupWithImage("#card-image-modal");
// imagePopup.setEventListeners();



// const section = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },

//   cardListElement
// );

// section.renderItems();

// /*----Functions----*/
// function renderCard(cardData) {
//   const card = new Card(
//     {
//       cardData,
//       handleImageClick: (cardData) => {
//         const image = {
//           name: cardData.name,
//           link: cardData.src,
//         };
//         imagePopup.open(image.name, image.link);
//       },
//     },
//     cardSelector
//   ).renderCard();
//   section.addItem(card);
// }

// function handleProfileFormSubmit(data) {
//   const title = data.title;
//   const description = data.description;
//   userInfo.setUserInfo({
//     name: title,
//     description: description,
//   });
//   editFormPopup.close();
// }

// function handleAddFormSubmit(inputValues) {
//   const card = {
//     name: inputValues.title,
//     link: inputValues.link,
//   };
//   renderCard(card);
//   addFormPopup.close();
// }

// const fillUserForm = ({ name, description }) => {
//   profileTitleInput.value = name;
//   profileDescriptionInput.value = description;
// };

// profileEditButton.addEventListener("click", () => {
//   const { name, description } = userInfo.getUserInfo();
//   fillUserForm({ name, description });
//   editFormPopup.open();
//   editFormValidator.resetValidation();
// });

// addNewCardButton.addEventListener("click", () => {
//   addFormValidator.resetValidation();
//   addFormPopup.open();
// });
