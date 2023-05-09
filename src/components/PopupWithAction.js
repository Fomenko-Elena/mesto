import Popup from "./Popup";

export default class PopupWithAction extends Popup {
    constructor(settings) {
        super(settings);
        const { formSelector, submitButtonSelector } = settings;
        this._form = this._popup.querySelector(formSelector);
        this._buttonElement = this._form.querySelector(submitButtonSelector);
    }

    open(action) {
        this._action = action;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
    }

    close() {
        super.close();
        this._action = null;
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();

        const originalText = this._buttonElement.textContent;
        this._buttonElement.textContent = 'Сохранение...';

        this._action()
            .finally(() => {
                this.close();
                this._buttonElement.textContent = originalText;
            });
    }
}