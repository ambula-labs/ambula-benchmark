// Import the API, Keyring and some utility functions
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');


async function main () {
  const provider = new WsProvider('ws://127.0.0.1:9945');
  const api = await ApiPromise.create({ provider });

  // Construct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice').address;
  const bob = keyring.addFromUri('//Bob')
  // Create a extrinsic, transferring 12345 units to Alice
  const transfer = api.tx.balances.transfer(alice, 12345);

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(bob);

  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());