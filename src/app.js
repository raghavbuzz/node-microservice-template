const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { api } = require('./routes/api');
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(morgan('combined'));
app.use(express.json());

app.use('/v1', api);
app.get('/', (req, res) => {
    res.send('Server is running with Node.js and Express!');
})


module.exports = app;