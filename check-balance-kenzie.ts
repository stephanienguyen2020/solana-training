import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

console.log(` haha Connected to devnet`);

const publicKey = new PublicKey("2dHqEZSKT9NUB57WzfaPjz9mgc55FcV1v58yWaYQMJwA");

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `finished! The balance at address ${publicKey} is ${balanceInSOL} SOL`
);
