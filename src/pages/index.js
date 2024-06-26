// IMPORTS
import { options, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// MODALS
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-modal");
const imageModal = new PopupWithImage("#image-modal");

// FORMS
const profileForm = document.forms["profile-form"];
const profileFormName = editProfileModal.querySelector("[name = 'name']");
const profileFormDesc = editProfileModal.querySelector(
  "[name = 'description']"
);
const addCardForm = document.forms["add-card-form"];
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});
const popupProfileForm = new PopupWithForm(
  "#edit-modal",
  profileFormSubmitHandler
);
const popupAddCardForm = new PopupWithForm(
  "#add-modal",
  handleAddCardFormSubmit
);

// FORM VALIDATION
const profileFormValidator = new FormValidator(options, profileForm);
const addCardFormValidator = new FormValidator(options, addCardForm);

// CARDS
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const createCard = (cardData) => {
  const newCard = new Card(cardData, cardTemplate, handleImageClick);
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
  const currentUserInfo = userInfo.getUserInfo();
  profileFormName.value = currentUserInfo.name;
  profileFormDesc.value = currentUserInfo.description;
  profileFormValidator.enableFormButton();
  popupProfileForm.open();
}
function profileFormSubmitHandler(inputValues) {
  userInfo.setUserInfo(inputValues);
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
  popupAddCardForm.close();
  addCardFormValidator.disableFormButton();
  addCardForm.reset();
}

// CLASS METHOD CALLERS
section.renderItems();
imageModal.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// INITIAL EVENT LISTENERS
editButton.addEventListener("click", editButtonClickHandler);
addCardButton.addEventListener("click", addCardButtonClickHandler);
