/**
 * This script is used to listen to new blocks on the local chain
 * and print their data :
 * - Block number
 * - Block hash
 * - Block author FIXME: allways the same author
 * - Extrinsics list (list of transactions in the block)
 */

const { ApiPromise, WsProvider } = require("@polkadot/api");

PORT = 9945; //Bob

async function main() {
  const provider = new WsProvider("ws://127.0.0.1:" + PORT);
  const api = await ApiPromise.create({ provider });

  console.log("Listening to new blocks on ws://127.0.0.1:" + PORT);

  await api.rpc.chain.subscribeNewHeads(async (header) => {
    const blockHash = header.hash;
    const block = await api.rpc.chain.getBlock(blockHash);
    const author = (await api.derive.chain.getHeader(blockHash)).author;
    const extrinsics = block.block.extrinsics;

    // Printing block data
    console.log("------------------------------------------------------");
    console.log(`Chain is at block:\t#${header.number}`);
    console.log(`Block hash:\t\t${header.hash}`);
    console.log(`Block author:\t\t${author}`);
    console.log(`Extrinsics list (${extrinsics.length}):`);
    extrinsics.forEach((extrinsic, index) => {
      console.log(` - Extrinsic ${index}:\t\t${extrinsic.hash}`);
    });
  });
}

main().catch(console.error);
