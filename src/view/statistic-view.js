import { createElement } from '../render';

const createFooterStatisticTemplate = (count = 0) => (
  `<p>${count} movies inside</p>`
);

export class FooterStatistic {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get template() {
    return createFooterStatisticTemplate(this.#count);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
