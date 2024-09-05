import "dotenv/config";
import { AnkrProvider, Balance } from "@ankr.com/ankr.js";
import { setTimeout } from "timers/promises";
import { writeFile } from "fs/promises";

/**
 * With an ANKR Advanced API key, checks the wallet address's balance
 * `iteration` number of times, printing the names of all of the tokens each
 * time. If provided an logfile, will save the full balance objects to that
 * filepath.
 */
async function main(
  apiKey: string,
  walletAddress: string,
  iterations?: number,
  logfile?: string,
) {
  const provider = new AnkrProvider(
    `https://rpc.ankr.com/multichain/${apiKey}`,
  );

  iterations ??= 5;
  let balances: Balance[] = [];

  for (let x = 0; x < iterations; ++x) {
    const data = await provider.getAccountBalance({
      // hardcoded for eth sepolia, can also be witnessed on eth holesky with a different wallet
      blockchain: ["eth_sepolia"],
      walletAddress,
    });

    // Print all token names
    console.log(data.assets.map((asset) => asset.tokenName).join(", "));

    // Saved in case user provides an logfile
    balances = balances.concat(data.assets);

    await setTimeout(5000);
  }

  if (logfile) {
    console.log(`Writing full balances to ${logfile}`);
    await writeFile(logfile, JSON.stringify(balances, null, 2));
  }
}

const apiKey = process.env.ANKR_API_KEY;
if (!apiKey) {
  console.error(
    "Please provide an ANKR Advanced API key in .env or in the ANKR_API_KEY env variable.",
  );
  process.exit(1);
}

main(
  apiKey,
  // wallet with only a small amount of eth sepolia
  "0xd60d9aa2c3fd053e50e1f518bad20366325a7291",
  5,
  `full_balances_${new Date().toISOString()}.json`,
).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
