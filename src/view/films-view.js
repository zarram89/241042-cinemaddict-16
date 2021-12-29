import { createElement } from '../render';

const createFilmsTemplate = () => (
  '<section class="films"></section>'
);

export class Films {
  #element = null;

  get template() {
    return createFilmsTemplate();
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
