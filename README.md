# node-pg-benchmarking

Benchmarking various node-postgres options for processing large datasets.

## Dataset

See (createBenchmarkingDatabase)[./bin/sql/createBenchmarkingDatabase.sql]

## Benchmarking scripts

See (src/)[./src/]

## Results

```
$ ./bin/runBenchmarkingTests | column -t -s,
filename                                exec_time_sec
tester.awk.sh                           150
tester.copy-stream.js                   125
tester.js-bindings-with-async-await.js  140
tester.js-bindings-with-cbs.js          143
tester.js-bindings-with-promises.js     143
tester.native-with-cbs.js               183
tester.native-with-sync.js              185
```
