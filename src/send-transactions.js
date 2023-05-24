// this script sends NB_OF_TRANSACTIONS transactions from URI_ACCOUNT_SENDER to URI_ACCOUNT_RECEIVER

const { ApiPromise, WsProvider } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");

URI_ACCOUNT_SENDER = "//Bob";
URI_ACCOUNT_RECEIVER = "//Alice";
UNIT_TO_TRANSFER = 12;
NB_OF_TRANSACTIONS = 3;
// port for the local node
PORT = 9945;

async function main() {
  const provider = new WsProvider("ws://127.0.0.1:" + PORT);
  const api = await ApiPromise.create({ provider });

  // Construct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  const sender = keyring.addFromUri(URI_ACCOUNT_SENDER);
  const receiver = keyring.addFromUri(URI_ACCOUNT_RECEIVER);

  // Get the current nonce for the account
  let { nonce } = await api.query.system.account(sender.address);

  // Create a extrinsic, transferring 12345 units to Alice
  const transfer = api.tx.balances.transfer(receiver.address, UNIT_TO_TRANSFER);

  for (let i = 0; i < NB_OF_TRANSACTIONS; i++) {
    // Sign and send the transaction using our account
    const hash = await transfer.signAndSend(sender, { nonce });

    console.log("Transfer sent with hash", hash.toHex());
    nonce++;
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
