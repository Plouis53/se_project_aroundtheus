class UserInfo {
  constructor({ nameSelector, avatarSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  getAvatar() {
    return {
      avatar: this._avatarElement.src,
    };
  }

  setAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
