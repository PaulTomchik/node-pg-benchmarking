# node-pg-benchmarking

Benchmarking various node-postgres options for processing large datasets.

## Dataset

See (createBenchmarkingDatabase)[./bin/sql/createBenchmarkingDatabase.sql]

## Benchmarking scripts

See (src/)[./src/]

## Results

```
$ ./bin/runBenchmarkingTests | column -t -s,
filename                                     exec_time_sec
serialsum.baseline-get-ids-1.sh              18
serialsum.baseline-all-database.sh           38
parallelsum.baseline-awk.sh                  70
serialsum.copy-stream.js                     125
parallelsum.js-bindings-with-async-await.js  137
serialsum.js-bindings-with-async-await.js    140
serialsum.js-bindings-with-promises.js       142
serialsum.js-bindings-with-cbs.js            145
serialsum.baseline-awk.sh                    153
serialsum.native-with-cbs.js                 183
serialsum.native-with-sync.js                187
```
