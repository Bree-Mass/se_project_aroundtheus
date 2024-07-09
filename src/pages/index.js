// IMPORTS
import { options } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import '../pages/index.css'

// MODALS
const popupAvatarForm = new PopupWithForm(
  '#avatar-modal',
  avatarFormSubmitHandler,
  'Save'
)
const popupProfileForm = new PopupWithForm(
  '#edit-modal',
  profileFormSubmitHandler,
  'Save'
)
const popupAddCardForm = new PopupWithForm(
  '#add-modal',
  addCardFormSubmitHandler,
  'Save'
)
const popupDelete = new PopupWithForm(
  '#delete-modal',
  handleDeleteSubmit,
  'Yes'
)
const imageModal = new PopupWithImage('#image-modal')

// FORMS
const avatarForm = document.forms['avatar-form']
const profileForm = document.forms['profile-form']
const addCardForm = document.forms['add-card-form']
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__image'
})

// FORM VALIDATION
const avatarFormValidator = new FormValidator(options, avatarForm)
const profileFormValidator = new FormValidator(options, profileForm)
const addCardFormValidator = new FormValidator(options, addCardForm)

// CARDS
const currentCardId = { id: '' }
const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: '3f4287cc-0267-4f84-80ed-88627a1cce84',
    'Content-Type': 'application/json'
  }
})
api
  .returnData()
  .then(([userData, cards]) => {
    userInfo.setUserAvatar(userData.avatar)
    userInfo.setUserInfo(userData)
    section.renderItems(cards)
  })
  .catch((err) => {
    console.error(err)
  })
const cardTemplate =
  document.querySelector('#card__template').content.firstElementChild
const createCard = (cardData) => {
  const newCard = new Card(
    cardData,
    cardTemplate,
    handleImageClick,
    handleDeleteButtonClick,
    handleLikeButtonClick
  )
  return newCard.createCard()
}

// SECTION
const renderer = (cardData) => {
  const cardElement = createCard(cardData)
  section.addItem(cardElement)
}
const section = new Section(renderer, '.gallery__cards')

// BUTTONS
const avatarButton = document.querySelector('.profile__image-button')
const editButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')

// FUNCTIONS
function handleImageClick (evt) {
  const imageData = {
    name: evt.alt,
    link: evt.src
  }
  imageModal.open(imageData)
}
function avatarButtonClickHandler () {
  popupAvatarForm.open()
}

function avatarFormSubmitHandler (avatarLink) {
  const avatarUrl = avatarLink.url
  return api
    .patchAvatar(avatarUrl)
    .then(() => {
      userInfo.setUserAvatar(avatarUrl)
    })
    .then(() => {
      avatarFormValidator.disableFormButton()
      avatarForm.reset()
    })
    .catch((err) => {
      console.error(err)
      return Promise.reject(`Error: ${err}`)
    })
}

function editButtonClickHandler () {
  const currentUser = userInfo.getUserInfo()
  console.log(currentUser)
  popupProfileForm.setInputValues(currentUser)
  profileFormValidator.enableFormButton()
  popupProfileForm.open()
}
function profileFormSubmitHandler (inputValues) {
  return api
    .patchUserInfo(inputValues)
    .then(userInfo.setUserInfo(inputValues))
    .catch((err) => {
      console.error(err)
      return Promise.reject(`Error: ${err}`)
    })
}

function addCardButtonClickHandler () {
  popupAddCardForm.open()
}
function addCardFormSubmitHandler (inputValues) {
  const cardData = {
    name: inputValues.title,
    link: inputValues.url
  }
  return api
    .postNewCard(cardData)
    .then((newCard) => {
      section.addItem(createCard(newCard))
    })
    .then(() => {
      addCardFormValidator.disableFormButton()
      addCardForm.reset()
    })
    .catch((err) => {
      console.error(err)
      return Promise.reject(`Error: ${err}`)
    })
}
function handleDeleteButtonClick (cardId) {
  currentCardId.id = cardId
  popupDelete.open()
}

function handleDeleteSubmit () {
  return api
    .deleteCard(currentCardId.id)
    .then(() => {
      let cardToRemove = document.getElementById(currentCardId.id)
      cardToRemove.remove()
      cardToRemove = null
    })
    .catch((err) => {
      console.error(err)
      return Promise.reject(`Error: ${err}`)
    })
}
function handleLikeButtonClick (cardId, isLiked, toggleLike) {
  currentCardId.id = cardId
  if (isLiked) {
    return api
      .removeLike(currentCardId.id)
      .then(() => {
        toggleLike()
      })
      .catch((err) => {
        console.error(err)
      })
  } else {
    return api
      .addLike(currentCardId.id)
      .then(() => {
        toggleLike()
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

// CLASS METHOD CALLERS

imageModal.setEventListeners()
profileFormValidator.enableValidation()
addCardFormValidator.enableValidation()
avatarFormValidator.enableValidation()

// INITIAL EVENT LISTENERS
avatarButton.addEventListener('click', avatarButtonClickHandler)
editButton.addEventListener('click', editButtonClickHandler)
addCardButton.addEventListener('click', addCardButtonClickHandler)
