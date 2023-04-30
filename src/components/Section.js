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
        return this._itemRenderer(itemData);
    }

    renderItems() {
        this._items.forEach(item => {
            const element = this.renderItem(item);
            this._containerElement.append(element);
        });
    }
}