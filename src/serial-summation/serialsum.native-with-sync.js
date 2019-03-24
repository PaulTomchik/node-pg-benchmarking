#!/usr/bin/env node

const DBService = require('../services/DBService.native');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

const ids = DBService.querySync(getIds).map(({ id }) => id);

const addToSum = ({ metric }) => (sum += metric);

for (let i = 0; i < ids.length; ++i) {
  const d = DBService.querySync(getDataForId, [ids[i]]);
  d.forEach(addToSum);
}

console.log(sum);
