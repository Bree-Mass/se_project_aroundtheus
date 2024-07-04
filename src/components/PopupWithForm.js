import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupFormInputs =
      this._popupElement.querySelectorAll(".modal__input");
    this._popupButton = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmitListener = (evt) => {
      evt.preventDefault();
      this._popupButton.textContent = "Saving...";
      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues)
        .then(() => {
          this.close();
          setTimeout(() => {
            this._popupButton.textContent = "Save";
          }, 500);
        })
        .catch((err) => {
          console.error(err);
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
  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmitListener);
    super.setEventListeners();
  }
}
