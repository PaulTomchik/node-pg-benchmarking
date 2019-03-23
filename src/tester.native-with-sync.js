#!/usr/bin/env node

// const TEST_NAME = 'native sync';

const DBService = require('./DBService.native');

const { getIds, getDataForId } = require('./testQueries');

let sum = 0;

// console.time(TEST_NAME);

const ids = DBService.querySync(getIds).map(({ id }) => id);

const addToSum = ({ metric }) => (sum += metric);

for (let i = 0; i < ids.length; ++i) {
  const d = DBService.querySync(getDataForId, [ids[i]]);
  d.forEach(addToSum);
}

// console.timeEnd(TEST_NAME);
console.log(sum);
