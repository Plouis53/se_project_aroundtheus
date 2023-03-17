class Section {
  constructor({ items, renderer }, cardsList) {
    this._items = items;
    this._renderer = renderer;
    this.cardsList = cardsList;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this.cardsList.prepend(item);
  }
}
export default Section;
