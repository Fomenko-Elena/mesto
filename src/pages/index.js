import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';

const userInfo = new UserInfo('.profile__name', '.profile__job');

const previewPopup = new PopupWithImage({
    popupSelector: '.popup_preview',
    closeButtonSelector: '.popup__close',
    imageSelector: '.popup__image',
    titleSelector: '.popup__image-title'    
});
previewPopup.setEventListeners();

const profilePopup = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitFormHandler: (value) => userInfo.setUserInfo(value)
});
profilePopup.setEventListeners();

const buttonOpenPopupProfile = document.querySelector('.profile__edit');
buttonOpenPopupProfile.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));


const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-item',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitFormHandler: value => section.renderItem(value)
});
addCardPopup.setEventListeners();

const buttonOpenPopupCard = document.querySelector('.profile__add');
buttonOpenPopupCard.addEventListener('click', () => addCardPopup.open());


const section = new Section(
    {
        items: [
            {
                name: 'Архыз',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
            },
            {
                name: 'Челябинская область',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
            },
            {
                name: 'Иваново',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
            },
            {
                name: 'Камчатка',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
            },
            {
                name: 'Холмогорский район',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
            },
            {
                name: 'Байкал',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
            }
        ],
        renderer: data => {
            const card = new Card(data, '#elementTemplate', (name, link) => previewPopup.open(name, link));
            const element = card.generateCard();
            section.addItem(element);
        }
    },
    '.element__list');
section.renderItems();


function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        const formValidator = new FormValidator(settings, formElement);
        formValidator.enableValidation();
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});