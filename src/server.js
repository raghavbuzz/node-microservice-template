const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config();

const PORT =  process.env.PORT || 8000;

// Load SSL/TLS certificate and private key
const httpsOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
};

const server = https.createServer(httpsOptions, app);

async function startServer() {   
    server.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    });
}

startServer();
