#!/usr/bin/env node

/* eslint no-await-in-loop: 0 */

// const TEST_NAME = 'js-bindings with promises';

const DBService = require('./DBService');

const { getIds, getDataForId } = require('./testQueries');

let sum = 0;

const addToSum = ({ metric }) => (sum += metric);

// console.time(TEST_NAME);

(async () => {
  const { rows } = await DBService.query(getIds);

  for (let i = 0; i < rows.length; ++i) {
    const { id } = rows[i];

    const { rows: d } = await DBService.query({
      text: getDataForId,
      values: [id]
    });

    d.forEach(addToSum);
  }
  // console.timeEnd(TEST_NAME);
  console.log(sum);
  DBService.end();
})();
