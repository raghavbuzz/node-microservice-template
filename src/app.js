const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');

const logger = require('./utils/logger');
const { api } = require('./routes/api');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/v1', api);

app.get('/', (req, res) => {
    res.send('Server is running with Node.js and Express!');
});

module.exports = app;