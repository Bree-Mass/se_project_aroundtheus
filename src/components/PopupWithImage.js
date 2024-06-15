import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupDescription = this._popupElement.querySelector(
      ".modal__image-footing"
    );
  }
  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = `This is a picture of ${name}`;
    this._popupDescription.textContent = name;
    super.open();
  }
}
