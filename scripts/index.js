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
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const closeFormButton = addCardModal.querySelector(".modal__close-button");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeImageButton = imageModal.querySelector(".modal__close-button");

// FUNCTIONS
function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
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
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardGallery.append(cardElement);
});

// EVENT LISTENERS
editButton.addEventListener("click", () => {
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
  toggleModal(editProfileModal);
});
closeProfileButton.addEventListener("click", () => {
  toggleModal(editProfileModal);
});
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  toggleModal(editProfileModal);
  profileName.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
});
addCardButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});
closeFormButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});
closeImageButton.addEventListener("click", () => {
  toggleModal(imageModal);
});
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const addFormTitle = addCardModal.querySelector("[name = 'title']");
  const addFormImage = addCardModal.querySelector("[name = 'url']");
  const cardData = { name: addFormTitle.value, link: addFormImage.value };
  const newCard = getCardElement(cardData);
  cardGallery.prepend(newCard);
  toggleModal(addCardModal);
  addFormTitle.value = "";
  addFormImage.value = "";
});
