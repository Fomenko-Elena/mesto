import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';
import { buttonOpenPopupCard, buttonOpenPopupProfile, initialCards, validationSettings } from '../utils/constants';

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

buttonOpenPopupProfile.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));


const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-item',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitFormHandler: value => section.renderItem(value)
});
addCardPopup.setEventListeners();

buttonOpenPopupCard.addEventListener('click', () => addCardPopup.open());


const section = new Section(
    {
        items: initialCards,
        renderer: data => {
            const element = createCard(data);
            section.addItem(element);
        }
    },
    '.element__list');
section.renderItems();

function createCard(data) {
    const card = new Card(data, '#elementTemplate', value => previewPopup.open(value));
    return card.generateCard();
}


function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        const formValidator = new FormValidator(settings, formElement);
        formValidator.enableValidation();
    });
};

enableValidation(validationSettings);