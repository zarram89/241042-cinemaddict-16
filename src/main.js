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
//import { createPopupTemplate } from './view/site-popup-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { generateFilmData, generateMenuData, generateSortMenuData, generateStatisticsData, generateUserDate, formatDate } from './mock/mocks.js';

console.log

const mockData = {
  user: generateUserDate(),
  films: new Array(20).fill().map(() => generateFilmData()),
  lastShownFilmIndex: 0,
};

const userFilmsStatistics = {
  favorites: 0,
  watchlist: 0,
  watched: 0,
  duration: 0,
  runtime: 0,
  genres: {},
  topGenre: '',
};

for (const film of mockData.films) {
  if (film.isInWatchList) {
    userFilmsStatistics.watchlist++;
  }
  if (film.isWatched) {
    userFilmsStatistics.watched++;
    userFilmsStatistics.runtime += film.runtime.hours * 60 + film.runtime.minutes;
  }
  if (film.isFavorite) {
    userFilmsStatistics.favorites++;
  }
  for (const genre of film.genres) {
    if (userFilmsStatistics.genres[genre]) {
      userFilmsStatistics.genres[genre]++;
    } else {
      userFilmsStatistics.genres[genre] = 1;
    }
  }
}

userFilmsStatistics.runtime = formatDate(userFilmsStatistics.runtime);

const maxGenresValue = Math.max(...Object.values(userFilmsStatistics.genres));

for (const key in userFilmsStatistics.genres) {
  if (userFilmsStatistics.genres[key] === maxGenresValue) {
    userFilmsStatistics.topGenre = key;
  }
}


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderTemplate(siteHeaderElement, createProfileTemplate(mockData.user), RenderPosition.BEFORE_END);
renderTemplate(siteMainElement, createSiteMenuTemplate(generateMenuData(), userFilmsStatistics), RenderPosition.BEFORE_END);
renderTemplate(siteMainElement, createSiteSortTemplate(generateSortMenuData()), RenderPosition.BEFORE_END);
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
//renderTemplate(siteFooterElement, createPopupTemplate, RenderPosition.AFTER_END);
