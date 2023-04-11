class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = userName;
    this._userDescription = userJob;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
      avatar: this.getAvatar(),
    };
  }

  setUserInfo(value) {
    this._userName.textContent = value.name;
    this._userDescription.textContent = value.about;
  }

  setAvatar(value) {
    this._userAvatar.alt = this.getUserInfo();
    this._userAvatar.src = value;
  }

  getAvatar() {
    return this._userAvatar.src;
  }
}
export default UserInfo;
