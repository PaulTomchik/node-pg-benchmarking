const { join } = require('path');

const Client = require('pg-native');

require('dotenv').config({ path: join(__dirname, '../.env') });

const client = new Client();

client.connectSync();

module.exports = client;
