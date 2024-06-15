// IMPORTS
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// VALIDATOR OPTIONS
const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// INITIAL CARDS
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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
  profileFormValidator.resetFormValidation();
  popupProfileForm.open(editProfileModal);
}
function profileFormSubmitHandler() {
  userInfo.setUserInfo({
    name: profileFormName.value,
    description: profileFormDesc.value,
  });
  popupProfileForm.close(editProfileModal);
  profileFormValidator.resetButtonValidation();
}
function addCardButtonClickHandler() {
  popupAddCardForm.open(addCardModal);
}
function handleAddCardFormSubmit() {
  const addFormTitle = addCardModal.querySelector("[name = 'title']");
  const addFormImage = addCardModal.querySelector("[name = 'url']");
  const cardData = { name: addFormTitle.value, link: addFormImage.value };
  const newCard = new Card(cardData, cardTemplate, handleImageClick);
  section.addItem(newCard.createCard());
  popupAddCardForm.close(addCardModal);
  addCardFormValidator.resetButtonValidation();
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
