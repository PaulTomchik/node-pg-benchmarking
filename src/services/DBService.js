const { Client, Pool } = require('pg');

require('./loadEnvFile');

const client = new Client();
const pool = new Pool();

client.connect();

const end = () => Promise.all([client.end(), pool.end()]);

module.exports = {
  client,
  pool,
  end
};
