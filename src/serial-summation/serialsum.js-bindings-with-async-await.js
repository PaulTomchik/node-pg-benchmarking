#!/usr/bin/env node

/* eslint no-await-in-loop: 0 */

const { client: DBService, end } = require('../services/DBService');

const { getIds, getDataForId } = require('../testQueries');

let sum = 0;

const addToSum = ({ metric }) => (sum += metric);

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
  console.log(sum);
  end();
})();
