class Section {
  constructor({ items, renderer }, itemsList) {
    this._items = items;
    this._renderer = renderer;
    this._itemsList = itemsList;
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(item) {
    const newItem = this._renderer(item);
    this._itemsList.prepend(newItem);
  }
}
export default Section;
