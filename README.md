# NFT-ID

Bring your off-chain reputation onto chain. Link your web2 identify to your wallet address by connecting a social media account (e.g. GitHub) and minting an NFT that verifies you as the owner of that account.

## Solana Weekend Hacks

The project was originally started during the RustFi hackathon at Factory Berlin in October 2022, but the actual NFT minting was never implemented. Now, thanks to [Underdog](https://underdogprotocol.com), I'm adding this missing functionality.

I'm commiting new code directly to `main`. The original code will be in the `rustfi` branch.

### How to use

1. Connect your wallet (e.g. Phantom).
2. Connect a social media account (currently, only GitHub works).
3. Click *Prepare mint* to generate the NFT.
4. Click *Claim NFT* to put it in your wallet.

### If I had more time

Here are some TODOs/open questions:

- Move API key to the backend
- Can non-transferable NFTs be compressed?
- How to send the transaction that the 'Create an NFT' endpoint returns?
- Clean up the code
- Clean up the UI
- Implement Twitter
- Let the user choose what data to include in the NFT
- Make the NFT image a combination of the NFT-ID logo, the user's profile picture (if any) and the provider logo (e.g. GitHub)
- Get more data from GitHub
- Can a non-transferable NFT be added to a collection?
- Identify the NFT issuer (detect fakes)
- Does it need to be non-transferable at all (detect transfers)?

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
NEXT_PUBLIC_UNDERDOG_API_KEY=XXXXXXXXXX # Remove later. This shouldn't actually be in the frontend.
#UNDERDOG_API_KEY=XXXXXXXXXX # This will be used once the API calls are moved to the backend where they belongs.
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
5. `npm ci && npm ci -D` to install the exact versions of the dependencies.
6. `solana-keygen new --force --outfile wallet.json --no-bip39-passphrase`
7. `anchor build`
8. `solana airdrop 2 wallet.json` (repeat at least 3 times)
9. `anchor deploy`
10. Replace the old program ID (`3mAW7AVHr7TRvYkmeXKdTsDCYjdnJ2t4TpFeXPb57BRu`) in `Anchor.toml` and `lib.rs`.
11. `anchor test`
12. `node printPrivKey.js`
13. Import the private key in Phantom and switch to Devnet. The NFT should be there.

## Credits

- [create-solana-app](https://github.com/solana-developers/create-solana-app)
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
- [metaplex-anchor-nft](https://github.com/anoushk1234/metaplex-anchor-nft)
