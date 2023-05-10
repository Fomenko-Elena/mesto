import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(settings) {
        super(settings);
        const { formSelector, inputSelector, submitButtonSelector, submitFormHandler } = settings;
        this._submitFormHandler = submitFormHandler;
        this._form = this._popup.querySelector(formSelector);
        this._buttonElement = this._form.querySelector(submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    }

    open(values) {
        this._data = values || {};
        this._setInputValues(this._data);
        this._form.dispatchEvent(new Event('validateForm'));
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
    }

    close() {
        super.close();
        this._form.reset();
        this._data = null;
    }

    _setInputValues(values) {
        this._inputList.forEach(input => {
            const value = values[input.name];
            if (!!value) {
                input.value = value;
            }
        });
    }

    _getInputValues() {
        const result = {};
        this._inputList.forEach(element => result[element.name] = element.value);
        return result;
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();

        const originalText = this._buttonElement.textContent;
        this._buttonElement.textContent = 'Сохранение...';

        const data = Object.assign(Object.assign({}, this._data), this._getInputValues());
        this._submitFormHandler(data)
            .then(() => this.close())
            .finally(() => this._buttonElement.textContent = originalText);
    }
}