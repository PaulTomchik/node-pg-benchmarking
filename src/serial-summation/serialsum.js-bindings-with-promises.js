#!/usr/bin/env node

const { client: DBService, end } = require('../services/DBService');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

DBService.query(getIds).then(({ rows }) =>
  rows
    .reduce(
      (acc, { id }) =>
        acc.then(() =>
          DBService.query({ text: getDataForId, values: [id] }).then(
            ({ rows: d }) => d.forEach(({ metric }) => (sum += metric))
          )
        ),
      Promise.resolve()
    )
    .then(() => {
      console.log(sum);
      end();
    })
);
