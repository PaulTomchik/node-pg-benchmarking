#!/usr/bin/env bash

set -e
set -a

pushd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null

. ../../.env

GET_IDS_SQL="$( node -e 'console.log(require("../testQueries").getIds)' | sed 's/;//g' )"

psql -c "$GET_IDS_SQL" >/dev/null

popd >/dev/null
