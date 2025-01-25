const express = require('express');
const dummyAssetsRouter = require('./dummyAssets/dummyAssets.router');

const api = express.Router();

api.use('/dummyAssets', dummyAssetsRouter);
module.exports = { api };