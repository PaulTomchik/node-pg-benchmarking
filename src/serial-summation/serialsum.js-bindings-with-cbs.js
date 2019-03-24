#!/usr/bin/env node

const { client: DBService, end } = require('../services/DBService');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

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
      console.log(sum);
      end();
    }
  )()
);
