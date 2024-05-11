////////// EDIT BUTTON //////////
////////// EDIT BUTTON //////////
////////// EDIT BUTTON //////////

const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");

const modal = document.querySelector(".modal");
const closeButton = modal.querySelector(".modal__close-button");
const profileForm = document.forms["profile-form"];
const profileFormName = modal.querySelector("[name = 'name']");
const profileFormDesc = modal.querySelector("[name = 'description']");

function toggleModal() {
  modal.classList.toggle("modal_opened");
}

editButton.addEventListener("click", function () {
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
  toggleModal();
});

closeButton.addEventListener("click", toggleModal);

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  toggleModal();
  profileName.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
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
