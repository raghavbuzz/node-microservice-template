const logger = require('./logger')

const successResponse = (res, data, statusCode = 200) => {
    logger.info('Success response:', data);
    res.status(statusCode).json({ success: true, data });
};

const errorResponse = (res, message, statusCode = 500) => {
    logger.error('Error response:', message);
    res.status(statusCode).json({ success: false, message });
};

module.exports = {
    successResponse,
    errorResponse,
};