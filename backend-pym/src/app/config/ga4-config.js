const path = require('path');
require('dotenv').config();

module.exports = {
    propertyId: process.env.GA4_PROPERTY_ID,
    credentialsPath: path.join(__dirname, '../../credentials/ga4-service-account.json'),
    cacheDuration: 300 // 5 minutos
};