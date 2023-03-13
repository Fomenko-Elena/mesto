const editProfileButton = document.querySelector('.profile__edit');
const addProfileItemButton = document.querySelector('.profile__add');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

editProfileButton.addEventListener('click', openEditProfilePopup);
addProfileItemButton.addEventListener('click', openAddItemPopup);

const popupTemplate = document.querySelector('#popupTemplate');
const popupInvisibleContainerTemplate = document.querySelector('#popupInvisibleContainerTemplate');
const pageElement = document.querySelector('.page');

function openPopup(popupTemplate, popupElements, elementsAttachedHandler) {
    const popup = popupTemplate.content.firstElementChild.cloneNode(true);
    popup.closePopup = function() {
        popup.addEventListener('transitionend', () => popup.remove());
        popup.classList.remove('popup_opened');
    }

    const close = popup.querySelector('.popup__close');    
    close.addEventListener('click', () => popup.closePopup());

    const container = popup.querySelector('.popup__container');
    popupElements.forEach(node => container.insertBefore(node, null));

    elementsAttachedHandler(popup);

    pageElement.insertBefore(popup, null);

    requestAnimationFrame(() => popup.classList.add('popup_opened'));
}

const formPopupTemplate = document.querySelector('#formPopupTemplate');
function openFormPopup(formTitle, formActionName, formElementsTemplate, elementsAttachedHandler, submitHandler) {
    const formNodes = cloneTemplateChildNodes(formPopupTemplate);
    openPopup(
        popupTemplate,
        formNodes, 
        popup => {
        const form = popup.querySelector('.popup__form');

        const title = popup.querySelector('.popup__title');
        title.textContent = formTitle;

        const submit = form.querySelector('.popup__submit');
        submit.textContent = formActionName;

        const formElements = cloneTemplateChildNodes(formElementsTemplate);
        formElements.forEach(node => form.insertBefore(node, submit));

        form.addEventListener(
            'submit', 
            evnt => {
                submitHandler(evnt, form);    
                popup.closePopup();
            });

        elementsAttachedHandler(form);
    });
}

const editProfileFormTemplate = document.querySelector('#editProfileFormTemplate');
function openEditProfilePopup() {
    openFormPopup(
        'Редактировать профиль', 
        'Сохранить', 
        editProfileFormTemplate, 
        form => {
            const nameInput = form.querySelector('.popup__input_edit_name');
            nameInput.value = profileNameElement.textContent;

            const jobInput = form.querySelector('.popup__input_edit_job');
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

const addItemFormTemplate = document.querySelector('#addItemFormTemplate');
function openAddItemPopup() {
    openFormPopup(
        'Новое место', 
        'Создать', 
        addItemFormTemplate, 
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

const previewImageTemplate = document.querySelector('#previewImageTemplate');
function openPreviewPopup(imageUrl, text) {
    const previewNodes = cloneTemplateChildNodes(previewImageTemplate);
    openPopup(
        popupInvisibleContainerTemplate,
        previewNodes, 
        popup => {
            const image = popup.querySelector('.popup__image');
            image.src = imageUrl;

            const title = popup.querySelector('.popup__image-title');
            title.textContent = text;
    });
}

function cloneTemplateChildNodes(tenpalte) {
    const nodes = [];
    tenpalte.content.childNodes.forEach(x => nodes.push(x.cloneNode(true)));
    return nodes;
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