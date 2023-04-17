import Api from "../utils/api.js";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import "./index.css";

import {
  validationSettings,
  profileEditButton,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  addNewCardModal,
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

/*----Validator----*/
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addNewCardModal);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditModal
);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  userName: profileTitle,
  userJob: profileDescription,
  userAvatar: profileAvatar,
});

function openProfileEditForm() {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  profilePopup.open();
}

editFormValidator.disableButton();
profileEditButton.addEventListener("click", openProfileEditForm);

/*----Class Constants----*/

const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  profilePopup.renderLoading(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      // userInfo.setAvatar(data);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false, "Save");
    });
});

profilePopup.setEventListeners();
avatarButton.addEventListener("click", () => avatarPopup.open());

const avatarPopup = new PopupWithForm("#Profile-image-edit-modal", (value) => {
  avatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(value.avatar)
    .then((value) => {
      userInfo.setAvatar(value.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false, "Save");
    });
});

avatarPopup.setEventListeners();
// avatarFormValidator.disableButton();

const previewPopup = new PopupWithImage("#card-image-modal");
previewPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#Delete-confirm-modal");
let cardSection;
let userId;

deleteCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    "#card-template",
    (cardName, cardLink) => {
      previewPopup.open(cardName, cardLink);
    },

    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.renderLoading(true);

        api
          .deleteUserCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardPopup.close();
          })

          .catch((err) => {
            console.log(err);
          })

          .finally(() => {
            deleteCardPopup.renderLoading(false);
          });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLikes(cardId)
          .then((data) => {
            card.updateLikes(data.likes);
          })

          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.getView();
}

api
  .getAppInfo()
  .then(([userData, userCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: userCards,
        renderer: (cardData) => {
          const newCard = createCard(cardData);
          cardSection.addItem(newCard);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const addCardPopup = new PopupWithForm("#card-add-modal", (values) => {
  addCardPopup.renderLoading(true);
  api
    .addNewCard(values)
    .then((cardData) => {
      const card = createCard(cardData);
      addCardPopup.close();
      cardSection.addItem(card);
    })
    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      addCardPopup.renderLoading(false, "Create");
    });
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addCardPopup.open();
});
addCardPopup.setEventListeners();
