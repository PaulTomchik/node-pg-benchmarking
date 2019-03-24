#!/usr/bin/env node

/* eslint no-await-in-loop: 0 */

const copyTo = require('pg-copy-streams').to;
const split2 = require('split2');

const { client: DBService } = require('../services/DBService');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

const doit = id => {
  return new Promise(resolve => {
    const sql = getDataForId.replace(/\$1/, `'${id}'`).replace(/;/, '');

    const stream = DBService.query(copyTo(`COPY (${sql}) TO STDOUT WITH CSV`));
    stream.pipe(split2()).on('data', line => {
      const [, , metric] = line.split(',');
      sum += +metric;
    });

    stream.on('end', resolve);
  });
};

(async () => {
  const { rows } = await DBService.query(getIds);

  for (let i = 0; i < rows.length; ++i) {
    const { id } = rows[i];

    await doit(id);
  }
  console.log(sum);
  DBService.end();
})();
