#!/usr/bin/env node

// const TEST_NAME = 'js-bindings with promises';

const DBService = require('./DBService');

const { getIds, getDataForId } = require('./testQueries');

let sum = 0;

// console.time(TEST_NAME);

DBService.query(getIds).then(({ rows }) =>
  rows
    .reduce(
      (acc, { id }) =>
        acc.then(() =>
          DBService.query({ text: getDataForId, values: [id] }).then(
            ({ rows: d }) =>
              d.forEach(
                ({ metric }) =>
                  (sum += metric)
              )
          )
        ),
      Promise.resolve()
    )
    .then(() => {
      // console.timeEnd(TEST_NAME);
      console.log(sum);
      DBService.end();
    })
);
