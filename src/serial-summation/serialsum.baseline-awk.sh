#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

GET_IDS_SQL="$( node -e 'console.log(require("../testQueries").getIds)' | sed 's/;//g' )"
GET_DATA_SQL="$( node -e 'console.log(require("../testQueries").getDataForId)' | sed 's/;//g' )"

psql -c "COPY ($GET_IDS_SQL) TO STDOUT;" |
  while read -r id; do
    sql="$( sed "s/\$1/'${id}'/g" <<< "$GET_DATA_SQL" )"
    psql -c "COPY ($sql) TO STDOUT" |
      awk '{total = total + $3}END{printf "%.6f\n", total}'
  done |
    awk '{total = total + $1}END{printf "%.6f\n", total}'


popd >/dev/null
