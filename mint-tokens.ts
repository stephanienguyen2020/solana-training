import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

import "dotenv/config";

import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY_STEPHANIE");

const tokenMintAccount = new PublicKey(
  "HWtJhAmWujvevyVKvahYEgRn3pGdUgPa4r3wrrmnDcA8"
);

const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey,
  false,
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);

const transactionSignature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount.address,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS,
  [],
  {},
  TOKEN_2022_PROGRAM_ID
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Explorer link: ${link}`);
