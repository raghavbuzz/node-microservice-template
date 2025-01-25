const express = require('express');
const dummyAssetsRouter = express.Router();
const dummyAssetsController  = require('./dummyAssets.controller');

dummyAssetsRouter.get('/', dummyAssetsController.getAllDummyAssets);
dummyAssetsRouter.get('/:id', dummyAssetsController.getDummyAssetById);
dummyAssetsRouter.post('/', dummyAssetsController.createDummyAsset);
dummyAssetsRouter.put('/:id', dummyAssetsController.updateDummyAsset);
dummyAssetsRouter.delete('/:id', dummyAssetsController.deleteDummyAsset);

module.exports = dummyAssetsRouter;