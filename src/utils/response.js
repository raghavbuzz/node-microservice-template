const logger = require('./logger')

const successResponse = (res, data, statusCode = 200) => {    
    logger.info('Success response:' + JSON.stringify(data));
    res.status(statusCode).json({ success: true, data });
};

const errorResponse = (res, message, statusCode = 500) => {
    logger.error('Error response:', JSON.stringify(message));
    res.status(statusCode).json({ success: false, message });
};

module.exports = {
    successResponse,
    errorResponse,
};