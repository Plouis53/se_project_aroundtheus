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
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profilePopup.open();
}

profileEditButton.addEventListener("click", openProfileEditForm);

/*----Class Constants----*/

const profilePopup = new PopupWithForm("#profile-edit-modal", (values) => {
  profilePopup.renderLoading(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
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

const avatarPopup = new PopupWithForm("#Profile-image-edit-modal", (values) => {
  avatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(values.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false, "Save");
    });

  // avatarButton.addEventListener("click", () => avatarPopup.open());
  avatarFormValidator.disableButton();
});
avatarPopup.setEventListeners();
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
        api.deleteUserCard(cardId).then(() => {
          card.deleteCard();
          deleteCardPopup.renderLoading(true);
          deleteCardPopup.close();
        });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api.removeCardLikes(cardId).then((data) => {
          card.updateLikes(data.likes);
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
  return card;
}

api.getAppInfo().then(([userData, userCards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData.avatar);
  cardSection = new Section(
    {
      items: userCards,
      renderer: (cardData) => {
        const newCard = createCard(cardData);
        cardSection.addItem(newCard.getView());
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
});

const addCardPopup = new PopupWithForm("#card-add-modal", (values) => {
  addCardPopup.renderLoading(true);
  api
    .addNewCard(values)
    .then((cardData) => {
      const addCard = createCard(cardData);
      addCardPopup.close();
      cardSection.addItem(addCard.getView());
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
  // addFormValidator.resetValidation();
  addCardPopup.open();
});
addCardPopup.setEventListeners();
