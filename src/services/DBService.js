const { join } = require('path');

const { Client, Pool } = require('pg');

require('dotenv').config({ path: join(__dirname, '../../.env') });

const client = new Client();
const pool = new Pool();

client.connect();

const end = () => Promise.all([client.end(), pool.end()]);

module.exports = {
  client,
  pool,
  end
};
