export const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

// Больше шаблоны не нужны, переходим к отрисовке элементам
// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

export const renderElement = (container, element, place) => {
  if (element) {
    switch (place) {
      case RenderPosition.BEFORE_BEGIN:
        container.before(element);
        break;
      case RenderPosition.AFTER_BEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFORE_END:
        container.append(element);
        break;
      case RenderPosition.AFTER_END:
        container.after(element);
        break;
    }
  }
};

export const createElement = (templateElement) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = templateElement;

  return newElement.firstChild;
};
