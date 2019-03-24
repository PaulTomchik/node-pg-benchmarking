#!/usr/bin/env node

const { pool, end } = require('../services/DBService');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

const addToSum = ({ metric }) => (sum += metric);

const doit = async id => {
  const { rows } = await pool.query(getDataForId, [id]);

  rows.forEach(addToSum);
};

(async () => {
  const { rows } = await pool.query(getIds);

  await Promise.all(rows.map(({ id }) => doit(id)));

  console.log(sum);
  end();
})();
