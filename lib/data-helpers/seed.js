const chance = require('chance').Chance();
const Movie = require('../models/Movie');
const Review = require('../models/Review');

const seedData = async(object) => {
  const numberMoviesToSeed = object.movies || 5;
  const numberReviewsToSeed = object.reviews || 100;

  const movieArr = await Promise.all([...Array(numberMoviesToSeed)].map(() => {
    return Movie.create({
      title: chance.word(),
      description: chance.sentence(),
      studio: chance.name()
    });
  }));

  await Promise.all([...Array(numberReviewsToSeed)].map(() => {
    return Review.create({
      movie: chance.pickone(movieArr),
      authorName: chance.name(),
      comment: chance.sentence()
    });
  }));
};

module.exports = {
  seedData
};
