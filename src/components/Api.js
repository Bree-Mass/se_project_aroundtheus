export default class Api {
  constructor(options) {
    this._options = options;
  }
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "3f4287cc-0267-4f84-80ed-88627a1cce84",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
