export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._createCard();
    this._setCardImageListeners();
    this._setCardButtonListeners();
  }
  _createCard() {
    this._cardElement = this._cardSelector.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardDesc = this._cardElement.querySelector(".card__description");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardDesc.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.setAttribute("alt", this._name);
  }
  _setCardImageListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImage);
    });
  }
  _setCardButtonListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });
    this._trashButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }
  getCard() {
    return this._cardElement;
  }
}
