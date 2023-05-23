LOG_DIR="log"
LOG_FILES=("alice.log" "bob.log" "charlie.log" "dave.log" "eve.log" "ferdie.log")

for file in "${LOG_FILES[@]}"
do
    tail -f "${LOG_DIR}/${file}" | while read -r LOGLINE
    do
        if echo "${LOGLINE}" | grep --line-buffered "Reorg on #" > /dev/null; then
            BLOCK_NUMBER=$(echo ${LOGLINE} | perl -nle'print $& if m{(?<=Reorg on #)\d+}')
            TIMESTAMP=$(date "+[%Y-%m-%d %H:%M:%S]")
            NODE_NAME=$(echo ${file} | cut -d'.' -f 1)
            echo "${TIMESTAMP} [${NODE_NAME} node] Reorg on block number #${BLOCK_NUMBER}"
        fi
    done &
done
wait
