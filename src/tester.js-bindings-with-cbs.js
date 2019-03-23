#!/usr/bin/env node

// const TEST_NAME = 'js-bindings with callbacks';

const DBService = require('./DBService');

const { getIds, getDataForId } = require('./testQueries');

let sum = 0;

// console.time(TEST_NAME);

DBService.query(getIds, (err, { rows }) =>
  rows.reduce(
    (acc, { id }) => {
      return () =>
        DBService.query(
          {
            text: getDataForId,
            values: [id]
          },
          (e, { rows: d }) => {
            d.forEach(({ metric }) => (sum += metric));
            acc();
          }
        );
    },
    () => {
      // console.timeEnd(TEST_NAME);
      console.log(sum);
      DBService.end();
    }
  )()
);
