import './index.css';
import Api from '../components/Api';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithAction from '../components/PopupWithAction';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';
import { apiSettings, buttonOpenPopupCard, buttonOpenPopupProfile, elementOpenPopupAvatar, validationSettings, popupWithFormDefaultSelectors } from '../utils/constants';

const api = new Api(apiSettings);

const userInfo = new UserInfo(
    '.profile__name', 
    '.profile__job',
    '.profile__avatar'
);

const logAndRethrowErrorHandler = error => {
    console.error(error);
    throw error;
};

const logErrorHandler = error => {
    console.error(error);
    throw error;
};

const editAvatarPopup = new PopupWithForm({
    popupSelector: '.popup_edit-avatar',
    ...popupWithFormDefaultSelectors,
    submitFormHandler: ({ avatar }) => api
        .updateAvatar(avatar)
        .then(data => userInfo.setUserInfo(data))
        .catch(logAndRethrowErrorHandler)
});
editAvatarPopup.setEventListeners();

elementOpenPopupAvatar.addEventListener('click', () => editAvatarPopup.open(userInfo.getUserInfo()));

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
    ...popupWithFormDefaultSelectors,
    actionInProgressText: 'Удаление...'
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
                .catch(logErrorHandler),
            handleRemove: card => removeCardPopup.open(
                () => api
                    .removeCard(card.getId())
                    .then(() => card.remove())
                    .catch(logAndRethrowErrorHandler))
        });
    return card.generateCard();
}

Promise
    .all([api.getUser(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        section.renderItems(cards.map(card => Object.assign({_userId : user._id}, card)));
    })
    .catch(logErrorHandler);

const previewPopup = new PopupWithImage({
    popupSelector: '.popup_preview',
    closeButtonSelector: '.popup__close',
    imageSelector: '.popup__image',
    titleSelector: '.popup__image-title'    
});
previewPopup.setEventListeners();

const profilePopup = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    ...popupWithFormDefaultSelectors,
    submitFormHandler: value => api
        .updateUser(value)
        .then(userData => userInfo.setUserInfo(userData))
        .catch(logAndRethrowErrorHandler)
});
profilePopup.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));

const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-item',
    ...popupWithFormDefaultSelectors,
    submitFormHandler: value => api
        .addCard(value)
        .then(cardData => section.renderItem(Object.assign({ _userId: cardData.owner._id}, cardData)))
        .catch(logAndRethrowErrorHandler)
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