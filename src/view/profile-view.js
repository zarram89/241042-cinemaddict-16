export const createProfileTemplate = (profile) => {
  if (profile) {
    const { rating, avatar } = profile;

    return `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src=${avatar} alt="Avatar" width="35" height="35">
    </section>`;
  }
  return '';
};

