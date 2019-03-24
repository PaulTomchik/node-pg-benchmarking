const { join } = require('path');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand(dotenv.config({ path: join(__dirname, '../../.env') }));
