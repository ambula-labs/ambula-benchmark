#!/bin/bash

# this script is used to monitor the logs of the nodes and display a message when a reorg occurs

for file in log/alice.log log/bob.log log/charlie.log log/dave.log log/eve.log log/ferdie.log
do
    tail -f ${file} | while read -r LOGLINE
    do
        if echo "${LOGLINE}" | grep --line-buffered "Reorg on #" > /dev/null; then
            BLOCK_NUMBER=$(echo ${LOGLINE} | perl -nle'print $& if m{(?<=Reorg on #)\d+}')
            TIMESTAMP=$(date "+[%Y-%m-%d %H:%M:%S]")
            NODE_NAME=$(echo ${file} | cut -d'/' -f 2 | cut -d'.' -f 1)
            echo "${TIMESTAMP} [${NODE_NAME} node] Reorg on block number #${BLOCK_NUMBER}"
        fi
    done &
done
wait

