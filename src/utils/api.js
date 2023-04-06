class Api {
    constructor({ baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Error ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          method: "GET",
          headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getAPIInfo() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }
  
    updateProfileInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(userData),
      }).then(this._checkResponse);
    }
  
    addNewCard(cardData) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(cardData),
      }).then(this._checkResponse);
    }
    
  
    addCardLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    removeCardLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    updateProfileAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar }),
      }).then(this._checkResponse);
    }
  }

  export default Api