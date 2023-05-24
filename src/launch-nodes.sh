#!/bin/bash

# this script is used to launch pre-configured nodes (Alice, Bob, Charlie, Dave, Eve, Ferdie) on the local network

# path to the node template
NODE_TEMPLATE="../../ambula/target/release/node-template"
# predefined nodes
NODES=("alice" "bob" "charlie" "dave" "eve" "ferdie")
# alice node ports
P2P_PORT=30333
WS_PORT=9945
RPC_PORT=9933
# Alice node key
ALICE_NODE_KEY="0000000000000000000000000000000000000000000000000000000000000001"
# Alice bootstrap node
BOOTSTRAP_NODE="/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp"

# loop over the nodes
for NODE in ${NODES[@]}; do
  if [ "$NODE" == "alice" ]; then
    NODE_KEY="--node-key $ALICE_NODE_KEY"
    BOOTSTRAP=""
  else
    NODE_KEY=""
    BOOTSTRAP="--bootnodes $BOOTSTRAP_NODE"
  fi
  
  $NODE_TEMPLATE \
    --base-path /tmp/$NODE \
    --chain local \
    --$NODE \
    --port $P2P_PORT \
    --ws-port $WS_PORT \
    --rpc-port $RPC_PORT \
    --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
    --validator \
    $NODE_KEY \
    $BOOTSTRAP \
    > log/$NODE.log 2>&1 &
  
  echo "$NODE node launched"

  # incrementing the ports for the next node
  P2P_PORT=$((P2P_PORT+1))
  WS_PORT=$((WS_PORT+1))
  RPC_PORT=$((RPC_PORT+1))

  if [ "$NODE" == "alice" ]; then
    sleep 5
  fi

  PIDS+=($!)
done

echo "All nodes launched."

trap "echo 'Stopping nodes'; kill ${PIDS[*]}; exit" SIGINT SIGTERM

# infinite loop to keep the script running
while true; do sleep 1; done