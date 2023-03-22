const editProfileButton = document.querySelector('.profile__edit');
const addProfileItemButton = document.querySelector('.profile__add');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');


const profilePopup = document.querySelector('.popup_edit-profile');
const profileContainer = profilePopup.querySelector('.popup__container');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profilePopupNameInput = profilePopup.querySelector('.popup__input_edit_name');
const profilePopupJobInput = profilePopup.querySelector('.popup__input_edit_job');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupSubmitButton = profilePopup.querySelector('.popup__submit');


const elementPopup = document.querySelector('.popup_add-item');
const elementContainer = elementPopup.querySelector('.popup__container');
const elementPopupCloseButton = elementPopup.querySelector('.popup__close');
const elementPopupNameInput = elementPopup.querySelector('.popup__input_edit_name');
const elementPopupLinkInput = elementPopup.querySelector('.popup__input_edit_link');
const elementPopupForm = elementPopup.querySelector('.popup__form');
const elementPopupSubmitButton = elementPopup.querySelector('.popup__submit');


const previewPopup = document.querySelector('.popup_preview');
const previewContainer = previewPopup.querySelector('.popup__container');
const previewPopupCloseButton = previewPopup.querySelector('.popup__close');
const previewPopupImage = previewPopup.querySelector('.popup__image');
const previewPopupImageTitle = previewPopup.querySelector('.popup__image-title');


const elementsContainer = document.querySelector('.element .element__list');
const elementTemplate = document.querySelector('#elementTemplate');

let activePopup = null;

function openPopup(popup) {
    activePopup = popup;
    popup.classList.add('popup_opened');

    document.addEventListener('keyup', handleKeyUp);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    activePopup = null;

    document.removeEventListener('keyup', handleKeyUp);
}

function handleKeyUp(evt) {
    if (activePopup == null) return;
    if (evt.code !== 'Escape') return;
    closePopup(activePopup);
}

function handleClick() {
    if (activePopup == null) return;
    closePopup(activePopup);
}
document.addEventListener('click', handleClick);

function openProfilePopup(evt) {
    evt.stopPropagation();

    profilePopupNameInput.defaultValue = profilePopupNameInput.value = profileNameElement.textContent;
    profilePopupJobInput.defaultValue = profilePopupJobInput.value = profileJobElement.textContent;

    profilePopupForm.reset();

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
editProfileButton.addEventListener('click', (evt) => openProfilePopup(evt));


function clearElementPopup() {
    elementPopupForm.reset();
}

function openElementPopup(evt) {
    evt.stopPropagation();
    
    clearElementPopup();
    openPopup(elementPopup);
}

function handleElementPopupSubmit(event) {
    event.preventDefault();

    appendItemFirst({
        name : elementPopupNameInput.value,
        link : elementPopupLinkInput.value
    });

    closePopup(elementPopup);
    clearElementPopup();
}

elementContainer.addEventListener('click', (evt) => evt.stopPropagation());
elementPopupForm.addEventListener('submit', handleElementPopupSubmit);
elementPopupCloseButton.addEventListener('click', () => closePopup(elementPopup));
addProfileItemButton.addEventListener('click', (evt)  => openElementPopup(evt));


function openPreviewPopup(imageUrl, text, evt) {
    evt.stopPropagation();

    previewPopupImage.src = imageUrl;
    previewPopupImage.alt = text;

    previewPopupImageTitle.textContent = text;

    openPopup(previewPopup);
}

previewContainer.addEventListener('click', (evt) => evt.stopPropagation());
previewPopupCloseButton.addEventListener('click', () => closePopup(previewPopup));


function initializeItems(initialCards) {
    initialCards.forEach(x => appendItem(x));
}

function appendItem(descriptor) {
    const element = createIten(descriptor);
    elementsContainer.append(element);
}

function appendItemFirst(descriptor) {
    const element = createIten(descriptor);
    elementsContainer.prepend(element);
}

function createIten(descriptor) {
    const { name, link } = descriptor;
    const result = elementTemplate.content.firstElementChild.cloneNode(true);

    const image = result.querySelector('.element__picture');
    image.src = link;
    image.alt = name;
    image.addEventListener('click', (evt) => openPreviewPopup(link, name, evt));

    const text = result.querySelector('.element__text');
    text.textContent = name;

    const elementRemove = result.querySelector('.element__delete');
    elementRemove.addEventListener('click', () => result.remove());

    const button = result.querySelector('.element__button');
    button.addEventListener('click', () => likeItem(result));

    return result;
}

function likeItem(item) {
    const button = item.querySelector('.element__button');
    button.classList.toggle('element__button_actve');
}

initializeItems([
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