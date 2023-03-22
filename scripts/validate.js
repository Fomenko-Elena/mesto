const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputElement.classList.add(settings.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);

    buttonElement.classList.add(settings.inactiveButtonClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputElement.classList.remove(settings.inputErrorClass);

    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';

    buttonElement.classList.remove(settings.inactiveButtonClass);
  }; 
  

const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some(input => { return !input.validity.valid; } );
};

const updateButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  
    updateButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settings);
        updateButtonState(inputList, buttonElement, settings);
      });
    });

    formElement.addEventListener('reset',() => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, settings);
        });
        updateButtonState(inputList, buttonElement, settings);
    });
}; 
  

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
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