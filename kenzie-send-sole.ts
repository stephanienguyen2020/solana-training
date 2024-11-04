import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

const sender = getKeypairFromEnvironment("SECRET_KEY_KENZIE");
const connection = new Connection(clusterApiUrl("devnet"));
console.log(
  `hi Loaded our keypair securely, using an env file! Our public key is ${sender.publicKey.toBase58()}`
);

const recipient = new PublicKey("7Tyjp4fGdka1yMWN9nWh2aLhSkXFUi8xCp3kHk6tvRJx");

console.log(`Sending SOL to ${recipient.toBase58()}`);
