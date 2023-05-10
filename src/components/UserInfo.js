export default class UserInfo {
    constructor(userNameSelector, userJobSelector, avatarSelector) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userJobElement = document.querySelector(userJobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            about: this._userJobElement.textContent,
            avatar: this._avatarElement.src
        }
    }

    setUserInfo({name, about, avatar}) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = about;
        this._avatarElement.src = avatar;
        this._avatarElement.alt = name;
    }
}