import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY_STEPHANIE");

console.log(
  `Finished! Stephanie's public key is ${keypair.publicKey.toBase58()} `
);
console.log(`Yay 🙂‍↔️`);
