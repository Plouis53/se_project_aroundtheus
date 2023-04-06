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
  profilePopup.isLoadingButtonState(true);
  api
    .updateProfileInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .finally(() => {
      profilePopup.isLoadingButtonState(false, "Save");
    });
});

profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#Profile-image-edit-modal", (values) => {
  avatarPopup.isLoadingButtonState(true);
  api
    .updateProfileAvatar(values.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .finally(() => {
      avatarPopup.isLoadingButtonState(false, "Save");
    });

  avatarButton.addEventListener("click", () => avatarPopup.open());

  avatarPopup.setEventListeners();
});

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
        api.deleteUserCard(cardId).then(() => {
          card.deleteCard();
          deleteCardPopup.close();
        });
      });
    },

    (cardId) => {
      if (card.checkCardLikeState()) {
        api.removeCardLikes(cardId).then((data) => {
          card.removeCardLike();
          card.setLikesCounter(data.likes.length);
        });
      } else {
        api.addCardLikes(cardId).then((data) => {
          card.addCardLike();
          card.setLikesCounter(data.likes.length);
        });
      }
    },

    (cardData) => {
      cardData.forEach((cardObject) => {
        if (cardObject._id === userId) {
          card.addCardLike();
        }
      });
    }
  );
  return card;
}

api.getAPIInfo().then(([userData, userCards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
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
  addCardPopup.isLoadingButtonState(true);
  api
    .addNewCard(values)
    .then((data) => {
      const addCard = createCard(data);
      addCardPopup.close();
      cardSection.addItem(addCard.getView());
    })
    .finally(() => {
      addCardPopup.isLoadingButtonState(false, "Create");
    });
});

addNewCardModal.addEventListener("click", () => addCardPopup.open());
addCardPopup.setEventListeners();
