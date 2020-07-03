const express = require('express');
const app = express();
app.use(express.json());

// to add paths later if necessary
app.use('/api/v1/movies', require('./routes/movies'));
app.use('/api/v1/reviews', require('./routes/reviews'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
