export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    enableValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)

        this._updateButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._updateButtonState(inputList, buttonElement);
            });
        });

        this._formElement.addEventListener('validateForm', () => {
            inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
            this._updateButtonState(inputList, buttonElement);
        });
    }

    _updateButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'disabled');
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _showInputError(inputElement, errorMessage, settings) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);

        inputElement.classList.add(this._settings.inputErrorClass);

        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);

        inputElement.classList.remove(this._settings.inputErrorClass);

        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement, this._settings);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(input => { return !input.validity.valid; });
    }
}