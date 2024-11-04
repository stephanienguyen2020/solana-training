import "dotenv/config";

import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
  transfer,
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const sender = getKeypairFromEnvironment("SECRET_KEY_STEPHANIE");

console.log(`💰 Sender's public key: ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey("2dHqEZSKT9NUB57WzfaPjz9mgc55FcV1v58yWaYQMJwA");

const tokenMintAccount = new PublicKey(
  "HWtJhAmWujvevyVKvahYEgRn3pGdUgPa4r3wrrmnDcA8"
);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`💰 Sending 1 token to: ${recipient.toBase58()}`);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey,
  false,
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient,
  false,
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);

console.log(
  `💰 Source token account: ${sourceTokenAccount.address.toBase58()}`
);
console.log(
  `💰 Destination token account: ${destinationTokenAccount.address.toBase58()}`
);

const signature = await transfer(
  connection,
  sender,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  sender,
  1 * MINOR_UNITS_PER_MAJOR_UNITS,
  [],
  {},
  TOKEN_2022_PROGRAM_ID
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Explorer link: ${explorerLink}`);
