export default class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._elementTemplate = document.querySelector(templateSelector);
        this._cardClickHandler = handleCardClick;
    }

    generateCard() {
        const cardElement = this._createElement();

        const image = cardElement.querySelector('.element__picture');
        image.src = this._link;
        image.alt = this._name;
        image.addEventListener('click', () => this._handleCardClick());

        const text = cardElement.querySelector('.element__text');
        text.textContent = this._name;

        const elementRemove = cardElement.querySelector('.element__delete');
        elementRemove.addEventListener('click', () => this._remove(cardElement));

        const button = cardElement.querySelector('.element__button');
        button.addEventListener('click', () => this._like(button));

        return cardElement;
    }

    _createElement() {
        return this._elementTemplate.content.firstElementChild.cloneNode(true);
    }

    _like(button) {
        button.classList.toggle('element__button_actve');
    }

    _remove(cardElement) {
        cardElement.remove();
    }

    _handleCardClick() {
        this._cardClickHandler(this._name, this._link);
    }
}