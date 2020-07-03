const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .get('/', (req, res, next) => {
    Movie
      .find(req.query)
      .then(movies => res.send(movies))
      .catch(next);
  });
