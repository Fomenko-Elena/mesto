export default class UserInfo {
    constructor(userNameSelector, userJobSelector, avatarSelector, avatarClickHandler) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userJobElement = document.querySelector(userJobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._avatarClickHandler = avatarClickHandler;
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

    setEventListeners() {
        this._avatarElement.addEventListener('click', () => this._handleAvatarClick());
    }

    _handleAvatarClick() {
        this._avatarClickHandler(this.getUserInfo());
    }
}