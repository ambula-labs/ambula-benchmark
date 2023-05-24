// this script is used to handle the balance change of the account URI_ACCOUNT

const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");

URI_ACCOUNT = "//Alice";
// port for the local node
PORT = 9945;

async function getDefaultAccountInfo() {
  const provider = new WsProvider("ws://127.0.0.1:" + PORT);
  const api = await ApiPromise.create({ provider });
  const keyring = new Keyring({ type: "sr25519" });

  // Définir l'adresse du compte de Alice
  const accountAddress = keyring.addFromUri(URI_ACCOUNT).address;

  // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let {
    data: { free: previousFree },
    nonce: previousNonce,
  } = await api.query.system.account(accountAddress);

  console.log(
    `${accountAddress} has a balance of ${previousFree}, nonce ${previousNonce}`
  );
  console.log(
    `You may leave this example running and start example 06 or transfer any value to ${accountAddress}`
  );

  // Here we subscribe to any balance changes and update the on-screen value
  api.query.system.account(
    accountAddress,
    ({ data: { free: currentFree }, nonce: currentNonce }) => {
      // Calculate the delta
      const change = currentFree.sub(previousFree);

      // Only display positive value changes (Since we are pulling `previous` above already,
      // the initial balance change will also be zero)
      if (!change.isZero()) {
        console.log(`New balance change of ${change}, nonce ${currentNonce}`);

        previousFree = currentFree;
        previousNonce = currentNonce;
      }
    }
  );
}

getDefaultAccountInfo().catch(console.error);
