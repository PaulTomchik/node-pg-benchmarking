const { join } = require('path');

const { Client } = require('pg');

require('dotenv').config({ path: join(__dirname, '../.env') });

const client = new Client();

client.connect();

module.exports = client;
