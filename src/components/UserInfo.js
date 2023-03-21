class UserInfo {
  static getUserInfo() {
    throw new Error("Method not implemented.");
  }
  static setUserInfo(arg0) {
    throw new Error("Method not implemented.");
  }
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}

export default UserInfo;
