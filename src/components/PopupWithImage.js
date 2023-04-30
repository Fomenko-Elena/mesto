import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(settings) {
        super(settings);
        const { imageSelector, titleSelector } = settings;
        this._imageElement = this._popup.querySelector(imageSelector);
        this._titleElement = this._popup.querySelector(titleSelector);
    }

    open(name, link) {
        this._imageElement.src = link;
        this._imageElement.alt = name;

        this._titleElement.textContent = name;

        super.open();
    }
}