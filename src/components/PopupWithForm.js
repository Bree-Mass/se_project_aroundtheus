import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, defaultButtonText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupFormInputs =
      this._popupElement.querySelectorAll(".modal__input");
    this._popupButton = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
    this._defaultButtonText = defaultButtonText;
    this._handleSubmitListener = (evt) => {
      evt.preventDefault();
      this._popupButton.textContent = "Saving...";
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setTimeout(() => {
            this._popupButton.textContent = this._defaultButtonText;
          }, 500);
        });
    };
    this.setEventListeners();
  }
  _getInputValues() {
    const inputValues = {};
    this._popupFormInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setInputValues(userData) {
    this._popupFormInputs.forEach((input) => {
      input.value = userData[input.name];
    });
  }
  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmitListener);
    super.setEventListeners();
  }
}
