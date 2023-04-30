export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._itemRenderer = renderer;
        this._containerElement = document.querySelector(containerSelector);        
    }

    addItem(element) {
        this._containerElement.prepend(element);
    }

    renderItem(itemData) {
        this._itemRenderer(itemData);
    }

    renderItems() {
        this._items.reverse().forEach(item => this.renderItem(item));
    }
}