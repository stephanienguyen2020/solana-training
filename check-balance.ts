import "dotenv/config";

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

// import {
//   getKeypairFromEnvironment,
//   airdropIfRequired,
// } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`🔗 Connected to ${connection.getVersion()}`);

const publicKey = new PublicKey("7Tyjp4fGdka1yMWN9nWh2aLhSkXFUi8xCp3kHk6tvRJx");

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

// await airdropIfRequired(
//   connection,
//   publicKey,
//   1 * LAMPORTS_PER_SOL,
//   0.5 * LAMPORTS_PER_SOL
// );
// use faucet.solana.com to get SOL

console.log(`💰 The balance at address ${publicKey} is ${balanceInSOL} SOL`);
