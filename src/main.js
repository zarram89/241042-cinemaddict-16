import { Profile } from './view/profile-view';
import { Navigation } from './view/navigation-view';
import { Filter } from './view/filter-view';
import { Stats } from './view/stats-view';
import { SortFilms } from './view/sort-films-view';
import { Films } from './view/films-view';
import { FilmList } from './view/films-list-view';
import { FilmsListContainer } from './view/films-list-container-view';
import { FilmCard } from './view/film-card-view';
import { ShowMoreButton } from './view/button-show-more-view';
import { FooterStatistic } from './view/statistic-view';
import { FilmDetails } from './view/film-details-view';
import { RenderPosition, renderElement } from './render';
import { generateFilm } from './mock/film';
import { generateFilmsFilters } from './mock/filter';
import { generateProfile } from './mock/profile';

const FILM_COUNT = 25;
const FILM_COUNT_PER_STEP = 5;
const films = Array.from({ length: FILM_COUNT }, generateFilm);
const filters = generateFilmsFilters(films);
const profile = generateProfile();
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const footerStatisticElement = footerElement.querySelector('.footer__statistics');

renderElement(headerElement, new Profile(profile).element, RenderPosition.BEFORE_END);

renderElement(mainElement, new Navigation().element, RenderPosition.BEFORE_END);

const navigationElement = mainElement.querySelector('.main-navigation');
renderElement(navigationElement, new Filter(filters).element, RenderPosition.BEFORE_END);
renderElement(navigationElement, new Stats().element, RenderPosition.BEFORE_END);

renderElement(mainElement, new SortFilms().element, RenderPosition.BEFORE_END);

renderElement(mainElement, new Films().element, RenderPosition.BEFORE_END);

const filmsElement = mainElement.querySelector('.films');
renderElement(filmsElement, new FilmList(films).element, RenderPosition.BEFORE_END);


const filmsListElement = filmsElement.querySelector('.films-list');
renderElement(filmsListElement, new FilmsListContainer().element, RenderPosition.BEFORE_END);

const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

const removeFilmDetailsCard = (filmDetailsCard) => {

  const onCloseFilmDetailsCard = (evt) => {
    evt.preventDefault();
    bodyElement.classList.remove('hide-overflow');
    bodyElement.removeChild(filmDetailsCard.element);
  };

  filmDetailsCard
    .element
    .querySelector('.film-details__close-btn')
    .addEventListener('click', onCloseFilmDetailsCard);
};

const displayFilmDetailsCard = (filmCard, filmDetailsCard) => {

  const onShowDetailsCard = () => {
    bodyElement.classList.add('hide-overflow');
    bodyElement.appendChild(filmDetailsCard.element);
  };

  filmCard
    .element
    .querySelector('.film-card__link')
    .addEventListener('click', onShowDetailsCard);
};

for (const film of films.slice(0, FILM_COUNT_PER_STEP)) {
  const filmDetailsCard = new FilmDetails(film);
  removeFilmDetailsCard(filmDetailsCard);

  const filmCard = new FilmCard(film);
  displayFilmDetailsCard(filmCard, filmDetailsCard);

  renderElement(filmsListContainerElement, filmCard.element, RenderPosition.BEFORE_END);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButton = new ShowMoreButton();
  renderElement(filmsListElement, showMoreButton.element, RenderPosition.BEFORE_END);
  const showMoreElement = filmsListElement.querySelector('.films-list__show-more');

  showMoreElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        const filmDetailsCard = new FilmDetails(film);
        removeFilmDetailsCard(filmDetailsCard);

        const filmCard = new FilmCard(film);
        displayFilmDetailsCard(filmCard, filmDetailsCard);

        renderElement(filmsListContainerElement, filmCard.element, RenderPosition.BEFORE_END);
      });

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      showMoreElement.remove();
    }
  });
}

renderElement(footerStatisticElement, new FooterStatistic(films.length).element, RenderPosition.BEFORE_END);
