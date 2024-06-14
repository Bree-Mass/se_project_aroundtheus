export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close);
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
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
