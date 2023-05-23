#!/bin/bash

# this script is used to launch pre-configured nodes (Alice, Bob, Charlie, Dave, Eve, Ferdie) on the local network


../../ambula/target/release/node-template \
--base-path /tmp/alice \
--chain local \
--alice \
--port 30333 \
--ws-port 9945 \
--rpc-port 9933 \
--node-key 0000000000000000000000000000000000000000000000000000000000000001 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator > log/alice.log 2>&1 &

echo "Alice node launched"
sleep 5

../../ambula/target/release/node-template \
--base-path /tmp/bob \
--chain local \
--bob \
--port 30334 \
--ws-port 9946 \
--rpc-port 9934 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp \
> log/bob.log 2>&1 &
echo "Bob node launched"

../../ambula/target/release/node-template \
--base-path /tmp/charlie \
--chain local \
--charlie \
--port 30335 \
--ws-port 9947 \
--rpc-port 9935 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp \
> log/charlie.log 2>&1 &
echo "Charlie node launched"

../../ambula/target/release/node-template \
--base-path /tmp/dave \
--chain local \
--dave \
--port 30336 \
--ws-port 9948 \
--rpc-port 9936 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp \
> log/dave.log 2>&1 &
echo "Dave node launched"

../../ambula/target/release/node-template \
--base-path /tmp/eve \
--chain local \
--eve \
--port 30337 \
--ws-port 9949 \
--rpc-port 9937 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp \
> log/eve.log 2>&1 &
echo "Eve node launched"

../../ambula/target/release/node-template \
--base-path /tmp/ferdie \
--chain local \
--ferdie \
--port 30338 \
--ws-port 9950 \
--rpc-port 9938 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp \
> log/ferdie.log 2>&1
echo "Ferdie node launched"

echo "All nodes launched"

