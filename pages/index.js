// IMPORTS
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

// FORMS
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileForm = document.forms["profile-form"];
const profileFormName = editProfileModal.querySelector("[name = 'name']");
const profileFormDesc = editProfileModal.querySelector(
  "[name = 'description']"
);
const addCardForm = document.forms["add-card-form"];
const submitButtons = Array.from(document.querySelectorAll(".modal__button"));

// CARDS
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardGallery = document.querySelector(".gallery__cards");

// BUTTONS
const editButton = document.querySelector(".profile__edit-button");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const addCardButton = document.querySelector(".profile__add-button");
const closeCardFormButton = addCardModal.querySelector(".modal__close-button");
const closeImageButton = imageModal.querySelector(".modal__close-button");

// FUNCTIONS
function onOpenModalResetSubmitButton() {
  submitButtons.forEach((button) => {
    if (!button.classList.contains("modal__button_disabled")) {
      button.classList.add("modal__button_disabled");
      button.disabled = true;
    }
  });
}
function closeModalOnEscHandler(evt) {
  if (evt.key === "Escape") {
    closeAllModals();
  }
}
function openModal(modal) {
  document.addEventListener("keydown", closeModalOnEscHandler);
  onOpenModalResetSubmitButton();
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  document.removeEventListener("keydown", closeModalOnEscHandler);
  modal.classList.remove("modal_opened");
}
function closeModalOnClick(modal) {
  return () => {
    closeModal(modal);
  };
}
function closeAllModals() {
  modals.forEach((modal) => {
    if (modal.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
}
function handleImageClick(cardImage) {
  const imageModalImage = document.querySelector(".modal__image");
  const imageModalText = document.querySelector(".modal__image-footing");
  imageModalImage.src = cardImage.src;
  imageModalImage.alt = `This is a picture of ${cardImage.alt}`;
  imageModalText.textContent = cardImage.alt;
  openModal(imageModal);
}
function fillProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
}
function editButtonClickHandler() {
  fillProfileForm();
  openModal(editProfileModal);
}
function updateProfile() {
  profileName.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
}
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  closeModal(editProfileModal);
  updateProfile();
}
function addCardButtonClickHandler() {
  addCardForm.reset();
  openModal(addCardModal);
}
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const addFormTitle = addCardModal.querySelector("[name = 'title']");
  const addFormImage = addCardModal.querySelector("[name = 'url']");
  const cardData = { name: addFormTitle.value, link: addFormImage.value };
  const newCard = getCardElement(cardData);
  cardGallery.prepend(newCard);
  closeModal(addCardModal);
  addCardForm.reset();
}
initialCards.forEach((data) => {
  const newCard = new Card(data, cardTemplate, handleImageClick);
  const cardElement = newCard.getCard();
  cardGallery.append(cardElement);
});

// EVENT LISTENERS
editButton.addEventListener("click", editButtonClickHandler);
profileForm.addEventListener("submit", profileFormSubmitHandler);
closeProfileButton.addEventListener(
  "click",
  closeModalOnClick(editProfileModal)
);
addCardButton.addEventListener("click", addCardButtonClickHandler);
addCardForm.addEventListener("submit", addCardSubmitHandler);
closeCardFormButton.addEventListener("click", closeModalOnClick(addCardModal));
closeImageButton.addEventListener("click", closeModalOnClick(imageModal));
modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      closeAllModals();
    }
  });
});
