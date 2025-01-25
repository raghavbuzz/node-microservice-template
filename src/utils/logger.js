const { createLogger, format, transports } = require('winston');

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// Define the format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
  )
);

// Create a logger instance
const logger = createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    new transports.Console({
      level: 'info', // Only show 'info' level and above in the console
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error', // Log only 'error' level messages here
    }),
    new transports.File({
      filename: 'logs/combined.log',
      level: 'info', // Log 'info' level and above messages here
    }),
  ],
});

// If in production, log only to files
if (process.env.NODE_ENV === 'production') {
  logger.remove(new transports.Console());
}

module.exports = logger;
