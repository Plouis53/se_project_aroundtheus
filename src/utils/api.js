// class Api {
//     constructor({ baseUrl, headers} ) {
//       this._baseUrl = baseUrl;
//       this._headers = headers;
//     }
  
//     _checkResponse(res) {
//       if (res.ok) {
//         return res.json();
//       }
  
//       return Promise.reject(`Error ${res.status}`);
//     }
  
//     getUserInfo() {
//       return fetch(`${this._baseUrl}/cards`, {
//         method: "GET",
//         headers: this._headers,
//       }).then(this._checkResponse);
//     }
  
//     getInitialCards() {
//       return fetch(`${this._baseUrl}/cards`, {
//           method: "GET",
//           headers: this._headers,
//       }).then(this._checkResponse);
//     }
  
//     getAPIInfo() {
//       return Promise.all([this.getUserInfo(), this.getInitialCards()]);
//     }
  
//     updateProfileInfo(userData) {
//       return fetch(`${this._baseUrl}/users/me`, {
//         method: "PATCH",
//         headers: this._headers,
//         body: JSON.stringify(userData),
//       }).then(this._checkResponse);
//     }
  
//     addNewCard(cardData) {
//       return fetch(`${this._baseUrl}/cards`, {
//         method: "POST",
//         headers: this._headers,
//         body: JSON.stringify(cardData),
//       }).then(this._checkResponse);
//     }
  
//     addCardLikes(cardId) {
//       return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//         method: "PUT",
//         headers: this._headers,
//       }).then(this._checkResponse);
//     }
  
//     removeCardLikes(cardId) {
//       return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
//         method: "DELETE",
//         headers: this._headers,
//       }).then(this._checkResponse);
//     }
  
//     updateProfileAvatar(avatar) {
//       return fetch(`${this._baseUrl}/users/me/avatar`, {
//         method: "PATCH",
//         headers: this._headers,
//         body: JSON.stringify({ avatar }),
//       }).then(this._checkResponse);
//     }
//   }

//   export default Api







// class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "67d93972-468f-4c7a-bef5-b0ddeb015065",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // const api = new Api({
  //   baseUrl: "https://around.nomoreparties.co/v1/group-12",
  //   headers: {
  //     authorization: "67d93972-468f-4c7a-bef5-b0ddeb015065",
  //     "Content-Type": "application/json",
  //   },
  // });
  //

