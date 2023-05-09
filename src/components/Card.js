export default class Card {
    constructor(cardData, templateSelector, {handleCardClick, handleLike, handleRemove}) {
        this._userId = cardData._userId;
        this._updateData(cardData);
        this._elementTemplate = document.querySelector(templateSelector);
        this._cardClickHandler = handleCardClick;
        this._handleLike = handleLike;
        this._handleRemove = handleRemove;
    }

    generateCard() {
        this._cardElement = this._createElement();

        this._imageElement = this._cardElement.querySelector('.element__picture');
        this._textElement = this._cardElement.querySelector('.element__text');
        this._deleteElement = this._cardElement.querySelector('.element__delete');
        this._buttonElement = this._cardElement.querySelector('.element__button');
        this._likesElement = this._cardElement.querySelector('.element__likes');
        
        this._bindData();
        this._updateStyle();
        this._setEventListeners();

        return this._cardElement;
    }

    update(cardData) {
        this._updateData(cardData);
        this._bindData();
        this._updateStyle();
    }

    getId() { return this._id; }

    remove() {
        this._cardElement.remove();
        this._cardElement = null;
        this._imageElement = null;
        this._deleteElement = null;
        this._buttonElement = null;
        this._likesElement = null;
    }

    _bindData() {
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;

        this._textElement.textContent = this._name;

        this._likesElement.textContent = this._likeCount;
    }

    _updateData(cardData) {
        const { name, link, _id, likes, owner } = cardData;
        this._name = name;
        this._link = link;
        this._id = _id;
        this._liked = likes.some(like => like._id === this._userId);
        this._likeCount = likes.length;
        this._ownerId = owner._id;
    }

    _updateStyle() {
        this._setDeleteStyle();
        this._setLikedStyle(this._liked)
    }

    _setDeleteStyle() {
        if (this._userId == this._ownerId) {
            this._deleteElement.classList.add('element__delete_visible');
        } else {
            this._deleteElement.classList.remove('element__delete_visible');
        }
    }

    _setLikedStyle(liked) {
        if (liked) {
            this._buttonElement.classList.toggle('element__button_actve');
        } else {
            this._buttonElement.classList.remove('element__button_actve');
        }
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
        this._handleLike(this, !this._liked);
    }

    _remove() {
        this._handleRemove(this);
    }

    _handleCardClick() {
        this._cardClickHandler({ 
            name: this._name, 
            link: this._link
        });
    }
}