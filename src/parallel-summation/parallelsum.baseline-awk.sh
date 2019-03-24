#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

GET_IDS_SQL="$( node -e 'console.log(require("../testQueries").getIds)' | sed 's/;//g' )"
GET_DATA_SQL="$( node -e 'console.log(require("../testQueries").getDataForId)' | sed 's/;//g' )"

psql -c "COPY ($GET_IDS_SQL) TO STDOUT;" |
  while read -r id; do
    echo "COPY ($(sed "s/\$1/'${id}'/g" <<< "$GET_DATA_SQL" | tr '\n' ' ')) TO STDOUT"
  done |
  parallel --jobs 10 -I% --max-args 1 psql -c % |
    awk '{total = total + $3}END{printf "%.6f\n", total}'

popd >/dev/null
