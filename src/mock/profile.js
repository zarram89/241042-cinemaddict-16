import { getRandomInteger } from '../util';

const getRandomRating = () => {
  const ratings = [
    'Movie Buff',
    'Movie Critic',
    'Movie Pro',
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);
  return ratings[randomIndex];
};

const getRandomAvatar = () => {
  const avatars = [
    './images/bitmap.png',
    './images/bitmap@2x.png',
    './images/bitmap@3x.png'
  ];

  const randomIndex = getRandomInteger(0, avatars.length - 1);
  return avatars[randomIndex];
};

export const generateProfile = () => ({
  rating: getRandomRating(),
  avatar: getRandomAvatar()
});
