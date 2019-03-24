#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

GET_IDS_SQL="$( node -e 'console.log(require("../testQueries").getIds)' | sed 's/;//g' )"

SQL="
  SELECT SUM(metric)
    FROM benchmarking_data
    WHERE (
      id IN ($GET_IDS_SQL)
    )
  ;
"

psql -c "$SQL" >/dev/null

popd >/dev/null
