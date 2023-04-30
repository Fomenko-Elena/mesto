import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(settings) {
        super(settings);
        const { formSelector, inputSelectorList, submitFormHandler } = settings;
        this._submitFormHandler = submitFormHandler;
        this._form = this._popup.querySelector(formSelector);
        this._inputElementList = inputSelectorList.map(inputSelector => this._form.querySelector(inputSelector));
    }

    open(...args) {
        this._setInputValues(args);
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

    _setInputValues(args) {
        this._inputElementList.map((element, index) => {
            const value = args[index];
            if (!!value) {
                element.value = args[index];
            }
        });
    }

    _getInputValues() {
        return this._inputElementList.map(element => element.value);
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();

        this._submitFormHandler(this._getInputValues());

        this.close();
    }
}