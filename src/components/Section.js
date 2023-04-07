class Section {
  constructor({ items, renderer }, itemsList) {
    this._items = items;
    this._renderer = renderer;
    this._itemsList = document.querySelector( itemsList);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._itemsList.prepend(item);
  }
}

export default Section;
