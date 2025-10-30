#!/usr/bin/env bash
set -e

cat >/usr/local/etc/php/conf.d/zzz-custom.ini <<EOF
memory_limit = ${PHP_MEMORY_LIMIT}
upload_max_filesize = ${PHP_UPLOAD_MAX_FILESIZE}
post_max_size = ${PHP_POST_MAX_SIZE}
max_execution_time = ${PHP_MAX_EXECUTION_TIME}
max_input_vars = ${PHP_MAX_INPUT_VARS}
realpath_cache_size = 4096k
realpath_cache_ttl  = 600
EOF

exec "$@"
