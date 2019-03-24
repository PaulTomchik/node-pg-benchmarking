#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

psql -c "COPY ($GET_IDS_SQL) TO STDOUT;" |
  while read -r id; do
    sql="$( sed "s/__ID__/${id}/g" <<< "$GET_DATA_SQL" )"
    psql -c "COPY ($sql) TO STDOUT" |
      awk '{total = total + $3}END{printf "%.6f\n", total}'
  done |
    awk '{total = total + $1}END{printf "%.6f\n", total}'


popd >/dev/null
