import FilmsListView from '../view/films-list-view.js';
import EmptyFilmsListTitleView from '../view/empty-films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { RenderPosition, render, remove } from '../utils/render.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils/common.js';
import SortView from '../view/sort-view.js';
import { SortType } from '../const.js';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/film.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsBoardPresenter {
  #filmsBoardContainer = null;

  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortComponent = new SortView();
  #filmsListTitleComponent = null;

  #films = [];
  #listFilters = [];
  #activeFilter = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map;
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  constructor(filmsBoardContainer) {
    this.#filmsBoardContainer = filmsBoardContainer;
  }

  init = (films, listFilters) => {
    this.#films = [...films];
    this.#sourcedFilms = [...films];
    this.#listFilters = [...listFilters];
    this.#activeFilter = this.#listFilters.find((filter) => filter.isChecked);

    render(this.#filmsBoardContainer, this.#filmsListComponent, RenderPosition.BEFORE_END);

    this.#renderFilmsBoard();
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #clearFilmsBoard = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
    remove(this.#sortComponent);
  };

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderLoadMoreButton = () => {
    render(this.#filmsListComponent, this.#showMoreButtonComponent, RenderPosition.BEFORE_END);

    this.#showMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  };

  #renderFilmsListTitle = () => {
    this.#filmsListTitleComponent = new EmptyFilmsListTitleView(this.#activeFilter);

    render(this.#filmsListComponent, this.#filmsListTitleComponent, RenderPosition.AFTER_BEGIN);
  };

  #renderFilmsListContainer = () => {
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFORE_END);
  };

  #renderFilmsBoard = () => {
    this.#sortComponent.init(this.#currentSortType);
    this.#renderSort();
    this.#renderFilmsListTitle();

    if (this.#activeFilter.count === 0) {
      return;
    }

    this.#renderFilmsListContainer();
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderSort = () => {
    render(this.#filmsBoardContainer, this.#sortComponent, RenderPosition.BEFORE_BEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortFilms(sortType);

    this.#clearFilmsBoard();
    this.#renderFilmsBoard();
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmsByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

}
