#!/usr/bin/env node

const DBService = require('../services/DBService.native');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

DBService.query(getIds, (err, rows) =>
  rows.reduce(
    (acc, { id }) => {
      return () =>
        DBService.query(getDataForId, [id], (e, d) => {
          d.forEach(({ metric }) => (sum += metric));
          acc();
        });
    },
    () => {
      console.log(sum);
      DBService.end();
    }
  )()
);
