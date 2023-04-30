export default class Popup {
    constructor({popupSelector, closeButtonSelector}) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(closeButtonSelector);
        this._handleKeyUp = this._handleEscClose.bind(this);
        this._handleMouseDown = this._handleMouseClose.bind(this);
        this._handleCloseButtonClick = this.close.bind(this);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleMouseDown);
        this._closeButton.addEventListener('click', this._handleCloseButtonClick);
    }

    open() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keyup', this._handleKeyUp);
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keyup', this._handleKeyUp);
    }

    _handleEscClose(evt) {
        if (evt.code !== 'Escape') return;
        this.close();
    }

    _handleMouseClose(evt) {
        if (evt.target != this._popup) return;
        this.close();
    }
}