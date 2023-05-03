const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { mnemonicGenerate } = require('@polkadot/util-crypto');

//Try to create an account 
/*
async function main () {
    const provider = new WsProvider('ws://127.0.0.1:9945');
    const api = await ApiPromise.create({ provider });

    // create a keyring with some non-default values specified
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
    const Gerard = keyring.addFromUri('//Gerard', { name: 'Gerard' });
    const keyString = Buffer.from(Gerard.publicKey).toString('hex');
    console.log(keyString);

    const Youness = keyring.addFromUri('//Youness', { name: 'Youness' });
    console.log(Youness.publicKey);

}
//main().catch(console.error);
*/


async function getDefaultAccountInfo() {
    const provider = new WsProvider('ws://127.0.0.1:9945');
    const api = await ApiPromise.create({ provider });
    const keyring = new Keyring({ type: 'sr25519' });

    // Définir l'adresse du compte de Alice
    const aliceAddress = keyring.addFromUri('//Alice').address;
    //const bobAddress = keyring.addFromUri('//Bob').address;

    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(aliceAddress);

    console.log(`${aliceAddress} has a balance of ${previousFree}, nonce ${previousNonce}`);
    console.log(`You may leave this example running and start example 06 or transfer any value to ${aliceAddress}`);

    // Here we subscribe to any balance changes and update the on-screen value
    api.query.system.account(aliceAddress, ({ data: { free: currentFree }, nonce: currentNonce }) => {
    // Calculate the delta
    const change = currentFree.sub(previousFree);

    // Only display positive value changes (Since we are pulling `previous` above already,
    // the initial balance change will also be zero)
    if (!change.isZero()) {
        console.log(`New balance change of ${change}, nonce ${currentNonce}`);

        previousFree = currentFree;
        previousNonce = currentNonce;
    }
    });
}

getDefaultAccountInfo().catch(console.error);