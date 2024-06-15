export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
    this._handleOverlayClose = (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    };
    this._handleCloseButtonClick = () => this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleCloseButtonClick);
    this._popupElement.addEventListener("click", this._handleOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
  removeEventListeners() {
    this._closeButton.removeEventListener(
      "click",
      this._handleCloseButtonClick
    );
    this._popupElement.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  open() {
    this.setEventListeners();
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
