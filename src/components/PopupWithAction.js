import Popup from "./Popup";

export default class PopupWithAction extends Popup {
    constructor(settings) {
        super(settings);
        const { formSelector, submitButtonSelector, actionInProgressText } = settings;
        this._form = this._popup.querySelector(formSelector);
        this._buttonElement = this._form.querySelector(submitButtonSelector);
        this._actionInProgressText = actionInProgressText;
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
        this._buttonElement.textContent = this._actionInProgressText;

        this._action()
            .then(() => this.close())
            .finally(() => this._buttonElement.textContent = originalText);
    }
}