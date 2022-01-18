import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view.js';
import EmptyFilmsListTitleView from './view/empty-films-list-title-view.js';
import FilmsListContainerView from './view/films-list-container-view';
import FilmCardView from './view/film-card-view.js';
import FilmPopupView from './view/film-popup-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FilmsTotalCountView from './view/films-total-count-view.js';
import { RenderPosition, render } from './render.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';

const FILM_COUNT = 0;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsComponent = new FilmsView();

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopupViewComponent = new FilmPopupView(film);

  const showPopup = () => {
    document.body.classList.add('hide-overflow');

    render(siteFooterElement, filmPopupViewComponent.element, RenderPosition.AFTER_END);
  };

  const closePopup = () => {
    document.body.classList.remove('hide-overflow');

    filmPopupViewComponent.element.remove();
    filmPopupViewComponent.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
    evt.preventDefault();
    showPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmPopupViewComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(container, filmCardComponent.element, RenderPosition.BEFORE_END);
};

const renderFilmsList = (container, listFilms, listFilters) => {
  const filmsListComponent = new FilmsListView();
  const activeFilter = listFilters.find((filter) => filter.isChecked);

  if (activeFilter.count > 0) {
    const filmsListContainerComponent = new FilmsListContainerView();

    render(filmsListComponent.element, filmsListContainerComponent.element, RenderPosition.BEFORE_END);

    for (let i = 0; i < Math.min(listFilms.length, FILM_COUNT_PER_STEP); i++) {
      renderFilm(filmsListContainerComponent.element, listFilms[i]);
    }

    if (listFilms.length > FILM_COUNT_PER_STEP) {
      let renderedFilmCount = FILM_COUNT_PER_STEP;

      const showMoreButtonComponent = new ShowMoreButtonView();

      render(filmsListComponent.element, showMoreButtonComponent.element, RenderPosition.BEFORE_END);

      showMoreButtonComponent.element.addEventListener('click', (evt) => {
        evt.preventDefault();

        listFilms
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
          .forEach((film) => renderFilm(filmsListContainerComponent.element, film));

        renderedFilmCount += FILM_COUNT_PER_STEP;

        if (renderedFilmCount >= listFilms.length) {
          showMoreButtonComponent.element.remove();
          showMoreButtonComponent.removeElement();
        }
      });
    }
  } else {
    render(filmsListComponent.element, new EmptyFilmsListTitleView(activeFilter).element, RenderPosition.AFTER_BEGIN);
  }

  render(container, filmsListComponent.element, RenderPosition.BEFORE_END);
};

const renderUserRank = (container, allFilters) => {
  const watchedFilmCount = allFilters.find(({ name }) => name === 'history').count;
  render(container, new UserRankView(watchedFilmCount).element, RenderPosition.BEFORE_END);
};

renderUserRank(siteHeaderElement, filters);
render(siteMainElement, new FilterView(filters).element, RenderPosition.BEFORE_END);
render(siteMainElement, new SortView().element, RenderPosition.BEFORE_END);
renderFilmsList(filmsComponent.element, films, filters);
render(siteMainElement, filmsComponent.element, RenderPosition.BEFORE_END);
render(footerStatisticsElement, new FilmsTotalCountView(FILM_COUNT).element, RenderPosition.BEFORE_END);
