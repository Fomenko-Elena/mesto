export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    }

    enableValidation() {
        this._updateButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._updateButtonState();
            });
        });

        this._formElement.addEventListener('validateForm', () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
            this._updateButtonState();
        });
    }

    _updateButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._getErrorElementForInput(inputElement);

        inputElement.classList.add(this._settings.inputErrorClass);

        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._getErrorElementForInput(inputElement);

        inputElement.classList.remove(this._settings.inputErrorClass);

        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _getErrorElementForInput(inputElement) {
        return this._formElement.querySelector(`.${inputElement.name}-error`);
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some(input => { return !input.validity.valid; });
    }
}