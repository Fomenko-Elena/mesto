export default class Section {
    constructor({renderer}, containerSelector) {
        this._itemRenderer = renderer;
        this._containerElement = document.querySelector(containerSelector);        
    }

    addItem(element) {
        this._containerElement.prepend(element);
    }

    renderItem(itemData) {
        this._itemRenderer(itemData);
    }

    renderItems(items) {
        items.reverse().forEach(item => this.renderItem(item));
    }
}