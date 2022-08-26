require('express-async-errors');
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(express.static('public')); 
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
