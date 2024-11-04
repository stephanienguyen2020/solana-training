import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY_KENZIE");

console.log(
  `🙂‍↔️ Finished! We've loadedx yayyyyyysiencs Our public key is : ${keypair.publicKey.toBase58()}`
);
