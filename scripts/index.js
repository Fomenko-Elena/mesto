const editProfileButton = document.querySelector('.profile__edit');
const addProfileItemButton = document.querySelector('.profile__add');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

editProfileButton.addEventListener('click', openEditProfilePopup);
addProfileItemButton.addEventListener('click', openAddItemPopup);

const pageElement = document.querySelector('.page');

function openPopup(popupName, setupPopupHandler) {
    const popup = document.querySelector(popupName);
    let isInitialized = popup.hasOwnProperty('__isInitialized') && popup.__isInitialized || false;
    if (isInitialized !== true) {
        popup.__isInitialized = true;
        popup.classList.toggle('popup_initialized');
        popup.closePopup = function() {
            popup.classList.toggle('popup_opened');
        }

        const close = popup.querySelector('.popup__close');
        close.addEventListener('click', () => popup.closePopup());
    }

    setupPopupHandler(popup, isInitialized);

    popup.classList.toggle('popup_opened')
}

function openFormPopup(popupName, setupPopupHandler, submitHandler) {
    openPopup(
        popupName,
        (popup, isInitialized) => {
            if (!isInitialized) {
                const form = popup.querySelector('.popup__form');
                const submit = form.querySelector('.popup__submit');
                form.addEventListener(
                    'submit', 
                    evnt => {
                        submitHandler(evnt, form);    
                        popup.closePopup();
                    });
            }
            setupPopupHandler(popup, isInitialized);
        });
}

function openEditProfilePopup() {
    openFormPopup(
        '.popup_edit-profile', 
        popup => {
            const nameInput = popup.querySelector('.popup__input_edit_name');
            nameInput.value = profileNameElement.textContent;

            const jobInput = popup.querySelector('.popup__input_edit_job');
            jobInput.value = profileJobElement.textContent;

        },
        (evnt, form) => {
            const nameInput = form.querySelector('.popup__input_edit_name');
            profileNameElement.textContent = nameInput.value;

            const jobInput = form.querySelector('.popup__input_edit_job');
            profileJobElement.textContent = jobInput.value;

            evnt.preventDefault();
        }
    );
}

function openAddItemPopup() {
    openFormPopup(
        '.popup_add-item', 
        () => {},
        (evnt, form) => {
            const nameInput = form.querySelector('.popup__input_edit_name');
            const linkInput = form.querySelector('.popup__input_edit_link');

            appendItemFirst({
                name: nameInput.value,
                link: linkInput.value
            });

            evnt.preventDefault();
        }
    );
}

function openPreviewPopup(imageUrl, text) {
    openPopup(
        '.popup_preview',
        popup => {
            const image = popup.querySelector('.popup__image');
            image.src = imageUrl;

            const title = popup.querySelector('.popup__image-title');
            title.textContent = text;
    });
}

const elementList = document.querySelector('.element .element__list');
const elementTemplate = document.querySelector('#elementTemplate');
const elements = [];

function initializeItems(initialCards) {
    initialCards.forEach(x => appendItem(x));
}

function appendItem(descriptor) {
    const element = createIten(descriptor);
    elementList.appendChild(element);
}

function appendItemFirst(descriptor) {
    const element = createIten(descriptor);
    elementList.insertBefore(element, elementList.children[0]);
}

function createIten(descriptor) {
    const { name, link } = descriptor;
    const result = elementTemplate.content.firstElementChild.cloneNode(true);

    const image = result.querySelector('.element__picture');
    image.src = link;
    image.alt = name;
    image.addEventListener('click', () => openPreviewPopup(link, name));

    const text = result.querySelector('.element__text');
    text.textContent = name;

    const remove = result.querySelector('.element__delete');
    remove.addEventListener('click', () => result.remove());

    const like = result.querySelector('.element__button');
    like.addEventListener('click', () => likeItem(result));

    return result;
}

function likeItem(item) {
    const like = item.querySelector('.element__button');
    like.classList.toggle('element__button_actve');
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