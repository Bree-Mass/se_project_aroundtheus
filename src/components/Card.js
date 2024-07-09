export default class Card {
  constructor (
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButtonClick,
    handleLikeButtonClick
  ) {
    this._name = data.name
    this._link = data.link
    this._id = data._id
    this._isLiked = data.isLiked
    this._cardSelector = cardSelector
    this._handleImageClick = handleImageClick
    this._handleDeleteButtonClick = handleDeleteButtonClick
    this._handleLikeButtonClick = handleLikeButtonClick
  }

  _setCardImageListeners () {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._cardImage)
    })
  }

  _checkLiked () {
    if (this._isLiked) {
      this._likeButton.classList.add('card__like-button_active')
    }
  }

  _toggleLike = () => {
    this._isLiked = !this._isLiked
    this._likeButton.classList.toggle('card__like-button_active')
  }

  _setLikeButtonListeners () {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this._id, this._isLiked, this._toggleLike)
    })
  }

  _setTrashButtonListeners () {
    this._trashButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._id)
    })
  }

  createCard () {
    this._cardElement = this._cardSelector.cloneNode(true)
    this._cardImage = this._cardElement.querySelector('.card__image')
    this._cardDesc = this._cardElement.querySelector('.card__description')
    this._likeButton = this._cardElement.querySelector('.card__like-button')
    this._trashButton = this._cardElement.querySelector('.card__trash-button')
    this._cardDesc.textContent = this._name
    this._cardImage.src = this._link
    this._cardImage.setAttribute('alt', this._name)
    this._cardElement.setAttribute('id', this._id)
    this._setCardImageListeners()
    this._setLikeButtonListeners()
    this._setTrashButtonListeners()
    this._checkLiked()

    return this._cardElement
  }
}
