const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', (req, res, next) => {
    Review
      .find(req.query)
      .populate('movie', {
        title: true,
        description: true,
        studio: true
      })
      .then(reviews => res.send(reviews))
      .catch(next);
  });
