import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY_STEPHANIE");
const connection = new Connection(clusterApiUrl("devnet"));
console.log(
  `🔗 Loaded our keypair securely, using an env file! Our public key is ${sender.publicKey.toBase58()}`
);

const recipient = new PublicKey("2dHqEZSKT9NUB57WzfaPjz9mgc55FcV1v58yWaYQMJwA");
console.log(`Sending SOL to Kenzie${recipient.toBase58()}`);

const transaction = new Transaction();

const sendSolInstrution = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: LAMPORTS_PER_SOL * 0.01,
});

transaction.add(sendSolInstrution);

const memoInstruction = createMemoInstruction("Sending SOL to Kenzie");

transaction.add(memoInstruction);

console.log(`memo is ${memoInstruction.data}`);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction sent: ${signature}`);
