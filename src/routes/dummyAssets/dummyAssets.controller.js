const dummyAssetsModel = require('../../models/dummyAssets.model');
const { successResponse, errorResponse } = require('../../utils/response');

const getAllDummyAssets = async (req, res) => {
    try {
        const dummyAssets = await dummyAssetsModel.getAll();
        successResponse(res, dummyAssets);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

const getDummyAssetById = async (req, res) => {
    try {
        const dummyAsset = await dummyAssetsModel.getById(req.params.id);
        if (!dummyAsset) return errorResponse(res, 'Asset not found', 404);
        successResponse(res, dummyAsset);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

const createDummyAsset = async (req, res) => {
    try {
        const newDummyAsset = await dummyAssetsModel.create(req.body);
        successResponse(res, newDummyAsset, 201);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

const updateDummyAsset = async (req, res) => {
    try {
        const updatedDummyAsset = await dummyAssetsModel.update(req.params.id, req.body);
        successResponse(res, updatedDummyAsset);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

const deleteDummyAsset = async (req, res) => {
    try {
        await dummyAssetsModel.delete(req.params.id);
        successResponse(res, { message: 'Asset deleted successfully' });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

module.exports = {
    getAllDummyAssets,
    getDummyAssetById,
    createDummyAsset,
    updateDummyAsset,
    deleteDummyAsset,
};