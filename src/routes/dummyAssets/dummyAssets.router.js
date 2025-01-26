const express = require('express');
const dummyAssetsRouter = express.Router();
const dummyAssetsController  = require('./dummyAssets.controller');

/**
 * @swagger
 * /assets:
 *   get:
 *     summary: Get all assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: A list of assets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asset'
 */
dummyAssetsRouter.get('/', dummyAssetsController.getAllDummyAssets);

dummyAssetsRouter.get('/:id', dummyAssetsController.getDummyAssetById);
dummyAssetsRouter.post('/', dummyAssetsController.createDummyAsset);
dummyAssetsRouter.put('/:id', dummyAssetsController.updateDummyAsset);
dummyAssetsRouter.delete('/:id', dummyAssetsController.deleteDummyAsset);
dummyAssetsRouter.get('/category/:category', dummyAssetsController.getDummyAssetsByCategory);

module.exports = dummyAssetsRouter;