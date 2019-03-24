#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

psql -c "COPY ($GET_IDS_SQL) TO STDOUT;" |
  while read -r id; do
    echo "COPY ($(sed "s/__ID__/${id}/g; s/;//g" <<< "$GET_DATA_SQL")) TO STDOUT"
  done |
  parallel --jobs "$BENCHMARKER_PARALLELISM" \
    psql -c {} "|" "awk '{total = total + \$3}END{printf \"%.6f\n\", total}'" |
  awk '{total = total + $1}END{printf "%.6f\n", total}'

popd >/dev/null
