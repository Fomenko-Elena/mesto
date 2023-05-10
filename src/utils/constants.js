export const apiSettings = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: '9afef1e9-c180-4844-bf4b-4960d997f13a',
        'Content-Type': 'application/json'
    }
};

export const buttonOpenPopupProfile = document.querySelector('.profile__edit');
export const buttonOpenPopupCard = document.querySelector('.profile__add');
export const elementOpenPopupAvatar = document.querySelector('.profile__avatar');

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const popupWithFormDefaultSelectors = {
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit'
} 