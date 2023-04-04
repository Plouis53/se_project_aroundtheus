class Api {
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
}
