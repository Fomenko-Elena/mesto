let editProfileButton = document.querySelector('.profile__edit');
let profileNameElement = document.querySelector('.profile__name');
let profileJobElement = document.querySelector('.profile__job');

let popupElement = document.querySelector('.popup');
let popupCloseButton = popupElement.querySelector('.popup__close');
let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_edit_name');
let jobInput = formElement.querySelector('.popup__input_edit_job');

function openPopup() {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;

    popupElement.classList.add('popup_opened');
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;

    closePopup();
}


editProfileButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);