// IMPORTS
import { options, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import User from "../components/User.js";
import Api from "../components/Api.js";
import "../pages/index.css";

// MODALS
const editProfileModal = document.querySelector("#edit-modal");
const imageModal = new PopupWithImage("#image-modal");

// FORMS
const profileForm = document.forms["profile-form"];
const profileFormName = editProfileModal.querySelector("[name = 'name']");
const profileFormDesc = editProfileModal.querySelector("[name = 'about']");
const addCardForm = document.forms["add-card-form"];
const user = new User({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});
const popupProfileForm = new PopupWithForm(
  "#edit-modal",
  profileFormSubmitHandler
);
const popupAddCardForm = new PopupWithForm(
  "#add-modal",
  handleAddCardFormSubmit
);
const popupDelete = new PopupWithForm("#delete-modal", handleDeleteSubmit);

// FORM VALIDATION
const profileFormValidator = new FormValidator(options, profileForm);
const addCardFormValidator = new FormValidator(options, addCardForm);

// CARDS
const currentCardId = { id: "" };
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3f4287cc-0267-4f84-80ed-88627a1cce84",
    "Content-Type": "application/json",
  },
});
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const createCard = (cardData) => {
  const newCard = new Card(
    cardData,
    cardTemplate,
    handleImageClick,
    handleDeleteButtonClick,
    handleLikeButtonClick
  );
  return newCard.createCard();
};

// SECTION
const renderer = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};
const section = new Section(
  { items: initialCards, renderer },
  ".gallery__cards"
);

// BUTTONS
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// FUNCTIONS
function handleImageClick(evt) {
  const imageData = {
    name: evt.alt,
    link: evt.src,
  };
  imageModal.open(imageData);
}
function editButtonClickHandler() {
  const currentUser = user.getUserInfo();
  profileFormName.value = currentUser.name;
  profileFormDesc.value = currentUser.about;
  profileFormValidator.enableFormButton();
  popupProfileForm.open();
}
function profileFormSubmitHandler(inputValues) {
  console.log(inputValues);
  user.setUserInfo(inputValues);
  api.patchUserInfo(inputValues).catch((err) => {
    console.error(err);
  });
}
function addCardButtonClickHandler() {
  popupAddCardForm.open();
}
function handleAddCardFormSubmit(inputValues) {
  const cardData = {
    name: inputValues.title,
    link: inputValues.url,
  };
  section.addItem(createCard(cardData));
  api.postNewCard(cardData).catch((err) => {
    console.error(err);
  });
  popupAddCardForm.close();
  addCardFormValidator.disableFormButton();
  addCardForm.reset();
}
function handleDeleteButtonClick(cardId) {
  currentCardId.id = cardId;
  popupDelete.open();
}

function handleDeleteSubmit() {
  api.deleteCard(currentCardId.id).catch((err) => {
    console.error(err);
  });
}
function handleLikeButtonClick(cardId, isLiked) {
  currentCardId.id = cardId;
  if (isLiked) {
    api.removeLike(currentCardId.id).catch((err) => {
      console.error(err);
    });
  } else {
    api.addLike(currentCardId.id).catch((err) => {
      console.error(err);
    });
  }
}

// CLASS METHOD CALLERS
api
  .returnData()
  .then(([userData, cards]) => {
    user.setUserAvatar(userData.avatar);
    user.setUserInfo(userData);
    cards.forEach((card) => {
      renderer(card);
    });
  })
  .catch((err) => {
    console.error(err);
  });
imageModal.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// INITIAL EVENT LISTENERS
editButton.addEventListener("click", editButtonClickHandler);
addCardButton.addEventListener("click", addCardButtonClickHandler);
