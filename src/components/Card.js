export default class Card {
    constructor({ name, link }, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._elementTemplate = document.querySelector(templateSelector);
        this._cardClickHandler = handleCardClick;
    }

    generateCard() {
        this._cardElement = this._createElement();

        this._imageElement = this._cardElement.querySelector('.element__picture');
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;

        const textElement = this._cardElement.querySelector('.element__text');
        textElement.textContent = this._name;

        this._deleteElement = this._cardElement.querySelector('.element__delete');

        this._buttonElement = this._cardElement.querySelector('.element__button');

        this._setEventListeners();

        return this._cardElement;
    }

    _setEventListeners() {
        this._imageElement.addEventListener('click', () => this._handleCardClick());
        this._deleteElement.addEventListener('click', () => this._remove());
        this._buttonElement.addEventListener('click', () => this._like());
    }

    _createElement() {
        return this._elementTemplate.content.firstElementChild.cloneNode(true);
    }

    _like() {
        this._buttonElement.classList.toggle('element__button_actve');
    }

    _remove() {
        this._cardElement.remove();
        this._cardElement = null;
        this._imageElement = null;
        this._deleteElement = null;
        this._buttonElement = null;
    }

    _handleCardClick() {
        this._cardClickHandler({ 
            name: this._name, 
            link: this._link
        });
    }
}