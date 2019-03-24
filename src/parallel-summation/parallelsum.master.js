#!/usr/bin/env node

const { fork } = require('child_process');
const { join } = require('path');

const split2 = require('split2');

const { pool, end } = require('../services/DBService');

const { getIds } = require('../testQueries');

const numWorkers = process.env.BENCHMARKER_PARALLELISM;

(async () => {
  const { rows } = await pool.query(getIds);

  const ids = rows.map(({ id }) => id);

  let remaining = ids.length;
  let sum = 0;

  [...new Array(numWorkers)]
    .map(() =>
      fork(join(__dirname, './parallelsum.worker.js'), {
        stdio: ['ipc', 'pipe']
      })
    )
    .forEach(worker => {
      worker.stdout.pipe(split2()).on('data', line => {
        sum += +line;

        if (ids.length) {
          worker.send(ids.pop());
        } else {
          worker.kill();
        }

        if (!--remaining) {
          console.log(sum);
        }
      });

      worker.send(ids.pop());
    });

  end();
})();
