export default class Api {
  constructor(options) {
    this._options = options;
  }
  _getUserAvatar() {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
      headers: {
        authorization: this._options.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  _getUserData() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._options.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  _getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._options.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  returnData() {
    return Promise.all([this._getUserData(), this._getInitialCards()]);
  }
  patchUserInfo({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  patchAvatar(avatarLink) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  postNewCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  removeLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
