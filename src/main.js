import { createProfileTemplate } from './view/site-profile-view.js';
import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSiteSortTemplate } from './view/site-sort-view.js';
import { createSiteFilmsTemplate } from './view/site-films-view.js';
import { createSiteAllFilmsTemplate } from './view/site-all-films-list-view.js';
import { createSiteFilmCardTemplate } from './view/site-film-card-view.js';
import { createShowMoreTemplate } from './view/site-show-more-view.js';
import { createSiteTopRatedFilmsTemplate } from './view/site-top-rated-view.js';
import { createSiteMostCommentedFilmsTemplate } from './view/site-most-commented-view.js';
import { createSiteStatisticsTemplate } from './view/site-statistics-view.js';
import { createPopupTemplate } from './view/site-popup-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderTemplate(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFORE_END);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.BEFORE_END);
renderTemplate(siteMainElement, createSiteSortTemplate(), RenderPosition.BEFORE_END);
renderTemplate(siteMainElement, createSiteFilmsTemplate(), RenderPosition.BEFORE_END);

const siteFilmsBoardElement = document.querySelector('.films');

renderTemplate(siteFilmsBoardElement, createSiteAllFilmsTemplate(), RenderPosition.BEFORE_END);

const filmsListContainer = siteFilmsBoardElement.querySelector('.films-list__container');

for (let i = 0; i < 5; i++) {
  renderTemplate(filmsListContainer, createSiteFilmCardTemplate(), RenderPosition.BEFORE_END);
}

renderTemplate(siteFilmsBoardElement, createShowMoreTemplate(), RenderPosition.BEFORE_END);
renderTemplate(siteFilmsBoardElement, createSiteTopRatedFilmsTemplate(), RenderPosition.BEFORE_END);

const topRatedFilmsListContainer = siteFilmsBoardElement.querySelector('.films-list--top-rated .films-list__container');

for (let i = 0; i < 2; i++) {
  renderTemplate(topRatedFilmsListContainer, createSiteFilmCardTemplate(), RenderPosition.BEFORE_END);
}

renderTemplate(siteFilmsBoardElement, createSiteMostCommentedFilmsTemplate(), RenderPosition.BEFORE_END);

const mostCommentedFilmsListContainer = siteFilmsBoardElement.querySelector('.films-list--most-commented .films-list__container');

for (let i = 0; i < 2; i++) {
  renderTemplate(mostCommentedFilmsListContainer, createSiteFilmCardTemplate(), RenderPosition.BEFORE_END);
}

const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteFooterElement, createSiteStatisticsTemplate(), RenderPosition.BEFORE_END);
renderTemplate(siteFooterElement, createPopupTemplate, RenderPosition.AFTER_END);

// const filmsListContainer = siteMainElement.querySelector('.films-list__container');

// for (let i = 0; i < FILMS_COUNT; i++) {
//   renderTemplate(filmsListContainer, createSiteFilmCardTemplate(), RenderPosition.BEFOREEND);
// }


// const renderBeforeEnd = (container, template) => renderTemplate(container, template, RenderPosition.BEFORE_END);

// const renderFilmItems = (container, count) => {
//   Array(count).fill(0).forEach(() => renderBeforeEnd(container, createSiteFilmCardTemplate()));
// };

// const renderAllFilms = (container) => {
//   renderBeforeEnd(container, createSiteAllFilmsTemplate());
//   renderFilmItems(container.querySelector('.films-list__container'), 5);
//   renderBeforeEnd(container, createShowMoreTemplate());
// };

// const renderTopRated = (container) => {
//   renderBeforeEnd(container, createSiteTopRatedFilmsTemplate());
//   renderFilmItems(container.querySelector('.films-list--top-rated .films-list__container'), 2);
// };

// const renderMostCommented = (container) => {
//   renderBeforeEnd(container, createSiteMostCommentedFilmsTemplate());
//   renderFilmItems(container.querySelector('.films-list--most-commented .films-list__container'), 2);
// };

// const renderFilms = (container) => {
//   renderAllFilms(container);
//   renderTopRated(container);
//   renderMostCommented(container);
// };

// const renderSite = (container) => {
//   renderBeforeEnd(container, createSiteMenuTemplate());
//   renderBeforeEnd(container, createSiteSortTemplate());
//   renderBeforeEnd(container, createSiteFilmsTemplate());
//   renderFilms(container.querySelector('.films'));
// };

// renderBeforeEnd(
//   document.querySelector('header'),
//   createSiteRatingTemplate()
// );

// renderSite(document.querySelector('.main'));

// renderBeforeEnd(
//   document.querySelector('footer'),
//   createSiteStatisticsTemplate()
// );

// renderBeforeEnd(
//   document.querySelector('body'),
//   createPopupTemplate()
// );
