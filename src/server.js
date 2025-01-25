const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config();
const initializeDatabase = require('./db/dbInit');


const PORT =  process.env.PORT || 8000;

// Load SSL/TLS certificate and private key
const httpsOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
};

const server = https.createServer(httpsOptions, app);

async function startServer() {   
    console.log('Initializing database...');

    if (process.env.NODE_ENV !== 'production') {
        await initializeDatabase(); // Run database initialization before starting the app.
    };    
    
    server.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    });
}

startServer();
