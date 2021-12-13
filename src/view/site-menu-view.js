export const createSiteMenuTemplate = (menu, stat) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${menu.selected === 'allMovies' ? 'main-navigation__item--active' : ''}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${menu.selected === 'watchlist' ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${stat.watchlist}</span></a>
      <a href="#history" class="main-navigation__item ${menu.selected === 'history' ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${stat.watched}</span></a>
      <a href="#favorites" class="main-navigation__item ${menu.selected === 'favorites' ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${stat.favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${menu.selected === 'stats' ? 'main-navigation__item--active' : ''}">Stats</a>
  </nav>`
);
