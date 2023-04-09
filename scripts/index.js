import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const buttonOpenPopupProfile = document.querySelector('.profile__edit');
const buttonOpenPopupCard = document.querySelector('.profile__add');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');


const profilePopup = document.querySelector('.popup_edit-profile');
const profileContainer = profilePopup.querySelector('.popup__container');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profilePopupNameInput = profilePopup.querySelector('.popup__input_edit_name');
const profilePopupJobInput = profilePopup.querySelector('.popup__input_edit_job');
const profilePopupForm = profilePopup.querySelector('.popup__form');


const elementPopup = document.querySelector('.popup_add-item');
const elementContainer = elementPopup.querySelector('.popup__container');
const elementPopupCloseButton = elementPopup.querySelector('.popup__close');
const elementPopupNameInput = elementPopup.querySelector('.popup__input_edit_name');
const elementPopupLinkInput = elementPopup.querySelector('.popup__input_edit_link');
const elementPopupForm = elementPopup.querySelector('.popup__form');


const previewPopup = document.querySelector('.popup_preview');
const previewContainer = previewPopup.querySelector('.popup__container');
const previewPopupCloseButton = previewPopup.querySelector('.popup__close');
const previewPopupImage = previewPopup.querySelector('.popup__image');
const previewPopupImageTitle = previewPopup.querySelector('.popup__image-title');


const elementsContainer = document.querySelector('.element .element__list');


function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keyup', handleKeyUp);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keyup', handleKeyUp);
}

function handleKeyUp(evt) {
    if (evt.code !== 'Escape') return;
    closePopup(document.querySelector('.popup_opened'));
}

function initializePopupMouseHandkers() {
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach(popup => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
                closePopup(popup)
            }
        })
    }); 
}

initializePopupMouseHandkers();

function openProfilePopup() {
    profilePopupNameInput.value = profileNameElement.textContent;
    profilePopupJobInput.value = profileJobElement.textContent;

    profilePopupForm.dispatchEvent(new Event('validateForm'));

    openPopup(profilePopup);
}

function handleEditProfileSubmit(event) {
    event.preventDefault();

    profileNameElement.textContent = profilePopupNameInput.value;
    profileJobElement.textContent = profilePopupJobInput.value;

    closePopup(profilePopup);
}

profileContainer.addEventListener('click', (evt) => evt.stopPropagation());
profilePopupForm.addEventListener('submit', handleEditProfileSubmit);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
buttonOpenPopupProfile.addEventListener('click', openProfilePopup);

function openElementPopup() {
    elementPopupForm.reset();

    elementPopupForm.dispatchEvent(new Event('validateForm'));

    openPopup(elementPopup);
}

function handleElementPopupSubmit(event) {
    event.preventDefault();

    appendCardFirst({
        name : elementPopupNameInput.value,
        link : elementPopupLinkInput.value
    });

    closePopup(elementPopup);
}

elementContainer.addEventListener('click', (evt) => evt.stopPropagation());
elementPopupForm.addEventListener('submit', handleElementPopupSubmit);
elementPopupCloseButton.addEventListener('click', () => closePopup(elementPopup));
buttonOpenPopupCard.addEventListener('click', openElementPopup);


function openPreviewPopup(name, link) {
    previewPopupImage.src = link;
    previewPopupImage.alt = name;

    previewPopupImageTitle.textContent = name;

    openPopup(previewPopup);
}

previewContainer.addEventListener('click', (evt) => evt.stopPropagation());
previewPopupCloseButton.addEventListener('click', () => closePopup(previewPopup));


function appendCard(cardData) {
    const element = generateCard(cardData);
    elementsContainer.append(element);
}

function appendCardFirst(cardData) {
    const element = generateCard(cardData);
    elementsContainer.prepend(element);
}

function generateCard(cardData) {
    const card = new Card(cardData, '#elementTemplate', openPreviewPopup);
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