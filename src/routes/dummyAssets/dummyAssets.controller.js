const Joi = require('joi');
const dummyAssetsModel = require('../../models/dummyAssets.model');
const { successResponse, errorResponse } = require('../../utils/response');

// Joi Schema for Asset Validation
const assetSchema = Joi.object({
    name: Joi.string().max(255).required().messages({
        'string.empty': 'Name is required.',
        'string.max': 'Name cannot exceed 255 characters.'
    }),
    category: Joi.string().max(100).required().messages({
        'string.empty': 'Category is required.',
        'string.max': 'Category cannot exceed 100 characters.'
    }),
    price: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Price must be a number.',
        'number.positive': 'Price must be a positive number.',
        'number.precision': 'Price must have up to 2 decimal places.',
    }),
    purchase_date: Joi.date().iso().required().messages({
        'date.base': 'Purchase date must be a valid date.',
        'date.iso': 'Purchase date must follow the ISO 8601 format.',
    }),
    status: Joi.string().valid('Active', 'Retired', 'Maintenance').default('Active').messages({
        'any.only': 'Status must be one of the following: Active, Retired, Maintenance.'
    }),
    description: Joi.string().max(1000).allow(null, '').messages({
        'string.max': 'Description cannot exceed 1000 characters.',
    }),
});

// Validation Utility
const validateAsset = (assetData) => {
    const { error, value } = assetSchema.validate(assetData, { abortEarly: false });
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    return value;
};

// Get All Asset
const getAllDummyAssets = async (req, res) => {
    try {        
        const dummyAssets = await dummyAssetsModel.getAll();
        successResponse(res, dummyAssets);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Get Asset By Id
const getDummyAssetById = async (req, res) => {
    try {
        const dummyAsset = await dummyAssetsModel.getById(req.params.id);
        if (!dummyAsset) return errorResponse(res, 'Asset not found', 404);
        successResponse(res, dummyAsset);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Create Asset
const createDummyAsset = async (req, res) => {
    try {
        // Validate input data
        const validatedAsset = validateAsset(req.body);        
        const newDummyAsset = await dummyAssetsModel.create(validatedAsset);
        successResponse(res, newDummyAsset, 201);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Update Asset
const updateDummyAsset = async (req, res) => {
    try {
        // Validate input data
        const validatedAsset = validateAsset(req.body);

        const updatedDummyAsset = await dummyAssetsModel.update(req.params.id, validatedAsset);
        successResponse(res, updatedDummyAsset);
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Delete Asset
const deleteDummyAsset = async (req, res) => {
    try {
        await dummyAssetsModel.delete(req.params.id);
        successResponse(res, { message: 'Asset deleted successfully' });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Get assets by category
const getDummyAssetsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const dummyAssets = await dummyAssetsModel.getAssetsByCategory(category);
        successResponse(res, dummyAssets);
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
    getDummyAssetsByCategory
};