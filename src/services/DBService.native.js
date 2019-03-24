const Client = require('pg-native');

require('./loadEnvFile');

const client = new Client();

client.connectSync();

module.exports = client;
