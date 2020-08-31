#!/bin/bash

# nginx dns resolve for sitemap
if [ "$NAMESERVER" == "" ]; then
    export NAMESERVER=`cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' '`
fi
sed -i "s/resolver.*;/resolver $NAMESERVER;/g" /etc/nginx/nginx.conf


# robots.txt for staging
if [ $CONFIG_ENV == "staging" ]; then
  cp /opt/vcam/ironman/sitemap/robots_stg.txt /opt/vcam/ironman/dist/robots.txt
fi

# Check NODE_PORT variable is exist

if [[ -z "${NODE_PORT}" ]]; then
  NODE_PORT="6001"
else
  NODE_PORT="${NODE_PORT}"
fi

sed -i "s/__NODE_PORT__}/$NODE_PORT/g" /etc/nginx/nginx.conf

# Create Nginx pid
procs=$(cat /proc/cpuinfo |grep processor | wc -l)
sed -i -e "s/worker_processes  1/worker_processes $procs/" /etc/nginx/nginx.conf

mkdir -p /run/nginx

/usr/bin/supervisord -n -c /etc/supervisord.conf