import './index.css';
import Api from '../components/Api';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithAction from '../components/PopupWithAction';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';
import { apiSettings, buttonOpenPopupCard, buttonOpenPopupProfile, validationSettings } from '../utils/constants';

const api = new Api(apiSettings);

const editAvatarPopup = new PopupWithForm({
    popupSelector: '.popup_edit-avatar',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    submitFormHandler: ({ avatar }) => api
        .updateAvatar(avatar)
        .then(data => userInfo.setUserInfo(data))
        .catch(console.error)
});
editAvatarPopup.setEventListeners();

const userInfo = new UserInfo(
    '.profile__name', 
    '.profile__job', 
    '.profile__avatar',
    data => editAvatarPopup.open(data)
);
userInfo.setEventListeners();

const section = new Section(
    {
        renderer: data => {
            const element = createCard(data);
            section.addItem(element);
        }
    },
    '.element__list');


const removeCardPopup = new PopupWithAction({
    popupSelector: '.popup_remove-item',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
});
removeCardPopup.setEventListeners();

function createCard(data) {
    const card = new Card(
        data, 
        '#elementTemplate', 
        {
            handleCardClick: value => previewPopup.open(value),
            handleLike: (card, like) => api 
                .likeCard(card.getId(), like)
                .then(cardData => card.update(cardData))
                .catch(console.error),
            handleRemove: card => removeCardPopup.open(
                () => api
                    .removeCard(card.getId())
                    .then(() => card.remove())
                    .catch(console.error))
        });
    return card.generateCard();
}


api
    .getUser()
    .then(user => {
        userInfo.setUserInfo(user);

        api
            .getInitialCards()
            .then(cards => {
                section.renderItems(cards.map(card => Object.assign({_userId : user._id}, card)));
            })
        .catch(console.error)
    })
    .catch(console.error);

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
    submitButtonSelector: '.popup__submit',
    submitFormHandler: value => api
        .updateUser(value)
        .then(userData => userInfo.setUserInfo(userData))
        .catch(console.error)
});
profilePopup.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));

const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-item',
    closeButtonSelector: '.popup__close',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    submitFormHandler: value => api
        .addCard(value)
        .then(cardData => section.renderItem(Object.assign({ _userId: cardData.owner._id}, cardData)))
        .catch(console.error)
});
addCardPopup.setEventListeners();

buttonOpenPopupCard.addEventListener('click', () => addCardPopup.open());


function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        const formValidator = new FormValidator(settings, formElement);
        formValidator.enableValidation();
    });
};

enableValidation(validationSettings);