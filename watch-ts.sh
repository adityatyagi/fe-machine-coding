#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./watch-ts.sh <path_to_ts_file>"
  exit 1
fi

nodemon --watch "$1" --exec "ts-node $1"
