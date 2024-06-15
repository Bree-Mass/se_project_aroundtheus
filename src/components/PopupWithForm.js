import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupFormInputs =
      this._popupElement.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmitListener = (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    };
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
  close() {
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._handleSubmitListener);
    super.close();
  }
}
