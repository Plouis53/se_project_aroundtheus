export default class section {
    constructor({ items, renderer }, cardsList) {
      this._items = items;
      this._renderer = renderer;
      this.cardsList = cardsList;
    }
  
    renderItems() {
      this._items.forEach(this._renderer);
    }
  
    addItem(item) {
      const newItem = this._renderer(item);
      this.cardsList.prepend(newItem);
    }
  }