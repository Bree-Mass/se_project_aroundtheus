////////// PROFILE EDIT BUTTON //////////
////////// PROFILE EDIT BUTTON //////////
////////// PROFILE EDIT BUTTON //////////

const editProfileModal = document.querySelector("#edit-modal");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["profile-form"];
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileFormName = editProfileModal.querySelector("[name = 'name']");
const profileFormDesc = editProfileModal.querySelector(
  "[name = 'description']"
);

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

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

///////// ADD BUTTON //////////
///////// ADD BUTTON //////////
///////// ADD BUTTON //////////

const addCardModal = document.querySelector("#add-modal");
const closeAddButton = addCardModal.querySelector(".modal__close-button");
const addCardButton = document.querySelector(".profile__add-button");
const addForm = document.forms["add-card-form"];

addCardButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});

closeAddButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});

////////// CARDS //////////
////////// CARDS //////////
////////// CARDS //////////

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

const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardGallery = document.querySelector(".gallery__cards");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDesc = cardElement.querySelector(".card__description");

  cardImage.src = data.link;
  cardImage.setAttribute("alt", data.name);
  cardDesc.textContent = data.name;

  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardGallery.append(cardElement);
});

////////// ADD CARD FORM //////////
////////// ADD CARD FORM //////////
////////// ADD CARD FORM //////////

addForm.addEventListener("submit", (evt) => {
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

////////// LIKE BUTTON //////////
////////// LIKE BUTTON //////////
////////// LIKE BUTTON //////////

const likeButtons = document.querySelectorAll(".card__like-button");

likeButtons.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("card__like-button_active");
  });
});
