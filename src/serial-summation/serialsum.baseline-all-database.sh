#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

SQL="
WITH cte_sums AS (
  SELECT
      id,
      SUM(metric) AS s
    FROM benchmarking_data
    WHERE (
      id IN ($GET_IDS_SQL)
    )
    GROUP BY id
)
  SELECT SUM(s)
    FROM cte_sums
  ;
"

psql -tA -c "$SQL"

popd >/dev/null
