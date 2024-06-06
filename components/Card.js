export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setCardImageListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImage);
    });
  }
  _setLikeButtonListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });
  }
  _setTrashButtonListeners() {
    this._trashButton.addEventListener("click", () => {
      this._cardElement.remove();
      this._cardElement = null;
    });
  }
  createCard() {
    this._cardElement = this._cardSelector.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardDesc = this._cardElement.querySelector(".card__description");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardDesc.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.setAttribute("alt", this._name);
    this._setCardImageListeners();
    this._setLikeButtonListeners();
    this._setTrashButtonListeners();

    return this._cardElement;
  }
}
