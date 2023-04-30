export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._itemRenderer = renderer;
        this._containerElement = document.querySelector(containerSelector);        
    }

    addItem(element, addFirst = true) {
        if (addFirst) {
            this._containerElement.prepend(element);
        } else {
            this._containerElement.append(element);
        }
    }

    renderItems() {
        this._items.forEach(item => this._itemRenderer(item));
    }
}