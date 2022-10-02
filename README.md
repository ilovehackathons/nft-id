# NFT-ID

Verify your identity with an NFT on Solana. First, connect your wallet (e.g. Phantom). Then, connect a social account (GitHub and Twitter are already supported). Finally, mint your soulbound NFT-ID. You're now verified! ✅

## Demo

We're live on [https://nft-id.vercel.app/](https://nft-id.vercel.app/)! 🎉

## Usage

### Frontend

1. Run `cd app` to change to the frontend subdirectory. The following commands must be run from there.
2. Go to https://generate-secret.vercel.app/32 and copy the secret.
3. Create `.env.local` (in `app`!) with the following contents:

```
GITHUB_ID=XXXXXXXXXX
GITHUB_SECRET=XXXXXXXXXX
TWITTER_CLIENT_ID=XXXXXXXXXX
TWITTER_CLIENT_SECRET=XXXXXXXXXX
SECRET=XXXXXXXXXX
NEXTAUTH_URL=http://localhost:3000 # Change the URL on production!
```

(Replace each `XXXXXXXXXX` with a valid value.)

4. Run `npm install` to install the dependencies.
5. Run `npm run dev` to start the application locally.
6. Go to [http://localhost:3000/](http://localhost:3000/) to see the app.

P.S. You can deploy the app to Vercel for free by following the instructions [here](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). (Remember to set the environment variables.)

### Backend

1. Install [Rust](https://www.rust-lang.org/tools/install).
2. Install [Solana](https://docs.solana.com/cli/install-solana-cli-tools#macos--linux).
3. Install [Anchor](https://www.anchor-lang.com/docs/installation#anchor).
4. `cd program` to change to the program subdirectory. All the following commands must be run from there!
5. `npm ci` to install the exact versions of the dependencies.
6. `node printPrivKey.js`
7. Import the private key in Phantom and switch to Devnet.
8. `anchor build`
9. `solana airdrop 2 wallet.json` (a couple of times)
10. `anchor deploy`
11. Replace the old program ID (`eaAguoetxqxFdB7Qb1J7nEt52hphWfLnsyi8ZXQ8iNn`) in `Anchor.toml` and `lib.rs`.
12. `anchor test --skip-deploy` (try without `--skip-deploy` if it fails)
13. If the last command was successful, the NFT should be visible in Phantom.
