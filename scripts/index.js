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

// FORMS
const profileForm = document.forms["profile-form"];
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileFormName = editProfileModal.querySelector("[name = 'name']");
const profileFormDesc = editProfileModal.querySelector(
  "[name = 'description']"
);
const addCardForm = document.forms["add-card-form"];

// CARDS
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardGallery = document.querySelector(".gallery__cards");
const imageModalImage = imageModal.querySelector(".modal__image");

// BUTTONS
const editButton = document.querySelector(".profile__edit-button");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const addCardButton = document.querySelector(".profile__add-button");
const closeCardFormButton = addCardModal.querySelector(".modal__close-button");
const closeImageButton = imageModal.querySelector(".modal__close-button");

// FUNCTIONS
function toggleModal(modal) {
  if (modal.classList.contains("modal_opened")) {
    modal.classList.toggle("modal_closed");
  } else if (modal.classList.contains("modal_closed")) {
    modal.classList.toggle("modal_closed");
  } else {
    modal.classList.toggle("modal_opened");
  }
}
function toggleModalOnClick(modal) {
  return () => {
    toggleModal(modal);
  };
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDesc = cardElement.querySelector(".card__description");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");
  cardDesc.textContent = data.name;
  cardImage.src = data.link;
  cardImage.setAttribute("alt", data.name);

  // NEW CARD EVENT LISTENERS //
  cardImage.addEventListener("click", () => {
    const imageModalImage = document.querySelector(".modal__image");
    const imageModalText = document.querySelector(".modal__image-footing");
    imageModalImage.src = cardImage.src;
    imageModalImage.alt = `This is a picture of ${cardImage.alt}`;
    imageModalText.textContent = cardImage.alt;
    toggleModal(imageModal);
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  trashButton.addEventListener("click", () => {
    trashButton.parentElement.remove();
  });
  return cardElement;
}
function fillProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
}
function editButtonClickHandler() {
  fillProfileForm();
  toggleModal(editProfileModal);
}
function updateProfile() {
  profileName.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
}
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  toggleModal(editProfileModal);
  updateProfile();
}
function addCardButtonClickHandler() {
  addCardForm.reset();
  toggleModal(addCardModal);
}
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const addFormTitle = addCardModal.querySelector("[name = 'title']");
  const addFormImage = addCardModal.querySelector("[name = 'url']");
  const cardData = { name: addFormTitle.value, link: addFormImage.value };
  const newCard = getCardElement(cardData);
  cardGallery.prepend(newCard);
  toggleModal(addCardModal);
  addCardForm.reset();
}
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardGallery.append(cardElement);
});

// EVENT LISTENERS
editButton.addEventListener("click", editButtonClickHandler);
profileForm.addEventListener("submit", profileFormSubmitHandler);
closeProfileButton.addEventListener(
  "click",
  toggleModalOnClick(editProfileModal)
);
addCardButton.addEventListener("click", addCardButtonClickHandler);
addCardForm.addEventListener("submit", addCardSubmitHandler);
closeCardFormButton.addEventListener("click", toggleModalOnClick(addCardModal));
closeImageButton.addEventListener("click", toggleModalOnClick(imageModal));
