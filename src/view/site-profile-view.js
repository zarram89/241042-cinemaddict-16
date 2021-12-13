export const createProfileTemplate = (user) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${user.rank}</p>
    <img class="profile__avatar" src="${user.avatar}" alt="Avatar" width="35" height="35">
  </section>`
);
