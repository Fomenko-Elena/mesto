import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(settings) {
        super(settings);
        const { formSelector, inputSelector, submitFormHandler } = settings;
        this._submitFormHandler = submitFormHandler;
        this._form = this._popup.querySelector(formSelector);
        this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    }

    open(values) {
        this._setInputValues(values || {});
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

        this._submitFormHandler(this._getInputValues());

        this.close();
    }
}