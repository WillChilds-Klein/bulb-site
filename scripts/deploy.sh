#!/bin/bash

set -e
set -o noglob

USAGE=$(cat <<EOF
USAGE:
  ${0} [CF_DISTRIBUTION_ID] [S3_BUCKET_NAME]
NOTE: Uses env vars DPLY_CF_DISTRIBUTION_ID and DPLY_S3_BUCKET_NAME if set.
EOF
)

usage() {
    local exit_code=${1:-'0'}
    echo "$USAGE"
    exit ${exit_code}
}

BUILD_DIR='./build'
CF_INVALIDATION_PATHS=(
    '/index.html'
    '/asset-manifest.json'
    '/static/*'
)

CF_DISTRIBUTION_ID="${1:-$DPLY_CF_DISTRIBUTION_ID}"
S3_BUCKET_NAME="${2:-$DPLY_S3_BUCKET_NAME}"
if [[ -z $CF_DISTRIBUTION_ID || -z $S3_BUCKET_NAME ]]; then
    usage 1
fi

S3_URI="s3://${S3_BUCKET_NAME}/"

clean() {
    rm -rf "${BUILD_DIR}"
}

deploy() {
    npm run build
    aws s3 sync --delete "${BUILD_DIR}" ${S3_URI}
}

invalidate() {
    aws cloudfront create-invalidation --distribution-id ${CF_DISTRIBUTION_ID} \
                                       --paths ${CF_INVALIDATION_PATHS[*]}
}

main() {
    clean
    deploy
    invalidate
}; main
