#!/bin/bash

mkdir -p /tmp/sumologic/sources
cat <<EOF > /tmp/sumologic/sources/venom.json
{
    "api.version": "v1",
    "source":
    {
        "sourceType": "LocalFile",
        "name": "venom",
        "pathExpression": "/tmp/logs/venom/*.log",
        "category": "$SUMO_CATEGORY"
    }
}
EOF