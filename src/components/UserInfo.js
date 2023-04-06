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
      avatar: this._userAvatar,
    };
  }

  setUserInfo(value) {
    this._userName.textContent = value.name;
    this._userDescription.textContent = value.about;
    this._userAvatar.alt = value.name;
    this._userAvatar.src = value.avatar;
  }
}
export default UserInfo;
