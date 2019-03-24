#!/usr/bin/env node

/* eslint no-await-in-loop: 0 */

const { client: DBService } = require('../services/DBService');

const { getDataForId } = require('../testQueries');

const doit = async id => {
  const { rows } = await DBService.query(getDataForId, [id]);

  return rows.reduce((acc, { metric }) => acc + metric, 0);
};

process.on('message', async id => {
  const sum = await doit(id);

  console.log(sum);
});
