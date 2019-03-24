#!/bin/bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

. ../.env

export POSTGRES_DB="$PGDATABASE"
export POSTGRES_USER="$PGUSER"
export POSTGRES_PASSWORD="$PGPASSWORD"

docker-compose down
