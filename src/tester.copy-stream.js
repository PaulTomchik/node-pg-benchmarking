#!/usr/bin/env node

/* eslint no-await-in-loop: 0 */

// const TEST_NAME = 'pg-copy-streams';

const copyTo = require('pg-copy-streams').to;
const split2 = require('split2');

const DBService = require('./DBService');

const { getIds, getDataForId } = require('./testQueries');

let sum = 0;

// console.time(TEST_NAME);

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
  // console.timeEnd(TEST_NAME);
  console.log(sum);
  DBService.end();
})();
