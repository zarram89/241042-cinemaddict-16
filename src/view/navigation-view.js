import { createElement } from '../render';

const createNavigationTemplate = () => (
  '<nav class="main-navigation"></nav>'
);

export class Navigation {
  #element = null;

  get template() {
    return createNavigationTemplate();
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
