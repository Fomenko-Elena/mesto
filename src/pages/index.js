import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

const buttonOpenPopupProfile = document.querySelector('.profile__edit');
const buttonOpenPopupCard = document.querySelector('.profile__add');

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
    inputSelectorList: [
        '.popup__input_edit_name',
        '.popup__input_edit_job'
    ],
    submitFormHandler: ([name, job]) => userInfo.setUserInfo(name, job)
});
profilePopup.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    profilePopup.open(name, job);
});


const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-item',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelectorList: [
        '.popup__input_edit_name',
        '.popup__input_edit_link'
    ],
    submitFormHandler: ([name, link]) => 
        appendCardFirst({
                name : name,
                link : link
            })
});
addCardPopup.setEventListeners();
buttonOpenPopupCard.addEventListener('click', () => addCardPopup.open());


const elementsContainer = document.querySelector('.element .element__list');



function appendCard(cardData) {
    const element = generateCard(cardData);
    elementsContainer.append(element);
}

function appendCardFirst(cardData) {
    const element = generateCard(cardData);
    elementsContainer.prepend(element);
}

function generateCard(cardData) {
    const card = new Card(cardData, '#elementTemplate', (name, link) => previewPopup.open(name, link));
    return card.generateCard();
}

function initializeCards(initialCards) {
    initialCards.forEach(x => appendCard(x));
}

initializeCards([
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
]);


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