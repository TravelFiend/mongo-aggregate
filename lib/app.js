const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/beer', require('./routes/beer'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
