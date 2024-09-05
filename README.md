`tokenName` does not appear to be consistent when making `getAccountBalance` queries with the ANKR Advanced API with Ethereum Testnet Sepolia and Ethereum Testnet Holesky chains. It can sometimes be "ETH" and sometimes be "Ethereum Testnet Sepolia/Holesky". After a few requests, the API eventually seems to "settle" and pick one to consistently return.

## Installation
Run `npm i` to install dependencies.

## Usage
You must provide an ANKR Advanced API key in the `ANKR_API_KEY` env variable, either in a `.env` file or in the terminal environment.

`npm start` will run a quick example with a proven problematic wallet. The `examples` folder has some examples of problematic runs. After running this a few times, it is likely the API will "settle" and refuse to flip the token names on that wallet anymore, until run later in the future (undetermined when exactly this resets, but doesn't seem to be longer than 30 minutes).
