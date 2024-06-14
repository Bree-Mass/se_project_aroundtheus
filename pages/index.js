// IMPORTS
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
// import PopupWithForm from "../components/PopupWithForm.js";
// import UserInfo from "../components/UserInfo.js";

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
const imageModal = document.querySelector("#image-modal");
const modals = Array.from(document.querySelectorAll(".modal"));
const popupWithImage = new PopupWithImage("#image-modal");

// FORMS
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileForm = document.forms["profile-form"];
const profileFormName = editProfileModal.querySelector("[name = 'name']");
const profileFormDesc = editProfileModal.querySelector(
  "[name = 'description']"
);
const addCardForm = document.forms["add-card-form"];
// const userInfo = new UserInfo({ profileName, profileDesc });
// const popupProfileForm = new PopupWithForm(
//   "#profile-form",
//   profileFormSubmitHandler
// );

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
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const addCardButton = document.querySelector(".profile__add-button");
const closeCardFormButton = addCardModal.querySelector(".modal__close-button");
const closeImageButton = imageModal.querySelector(".modal__close-button");

// FUNCTIONS
function handleImageClick(evt) {
  const imageData = {
    name: evt.alt,
    link: evt.src,
  };
  popupWithImage.open(imageData);
}
function fillProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
}
function editButtonClickHandler() {
  fillProfileForm();
  profileFormValidator.resetFormValidation();
  openModal(editProfileModal);
}
function updateProfile() {
  profileName.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
}
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  closeModal(editProfileModal);
  profileFormValidator.resetButtonValidation();
  updateProfile();
}
function addCardButtonClickHandler() {
  openModal(addCardModal);
}
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const addFormTitle = addCardModal.querySelector("[name = 'title']");
  const addFormImage = addCardModal.querySelector("[name = 'url']");
  const cardData = { name: addFormTitle.value, link: addFormImage.value };
  const newCard = new Card(cardData, cardTemplate, handleImageClick);
  section.addItem(newCard.createCard());
  closeModal(addCardModal);
  addCardFormValidator.resetButtonValidation();
  addCardForm.reset();
}

// CLASS METHOD CALLERS
section.renderItems();
popupWithImage.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// EVENT LISTENERS
editButton.addEventListener("click", editButtonClickHandler);
profileForm.addEventListener("submit", profileFormSubmitHandler);
closeProfileButton.addEventListener("click", () => userInfo.close());
addCardButton.addEventListener("click", addCardButtonClickHandler);
addCardForm.addEventListener("submit", addCardSubmitHandler);
// closeCardFormButton.addEventListener("click", closeModalOnClick(addCardModal));
closeImageButton.addEventListener("click", () =>
  popupWithImage.close(imageModal)
);
