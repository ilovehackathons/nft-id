import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction, sendAndConfirmRawTransaction } from "@solana/web3.js";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useState } from "react";

// No minting implemented for Twitter.
function TwitterCard({
  description,
  // profile_image_url,
  name,
  username,
  location,
  id,
  verified,
  url,
  public_metrics,
  // protected
  created_at,
  ...props
}) {
  const profile_image_url = props.profile_image_url?.replace(/_normal/g, "");

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl border-2 border-indigo-600">
      <figure>
        <img src={profile_image_url} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>@{username}</p>
        <p className="mt-3">{description}</p>
        <div className="card-actions justify-end">
          <button disabled className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ...">
            Twitter not supported yet
          </button>
        </div>
      </div>
    </div>
  );
}

function GitHubCard({
  user: {
    name,
    image
  },
  setUnderdogCreateResponse,
  setUnderdogClaimResponse
}) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const actuallyMintNonTransferableNft = useCallback(async (transactionUnderdogGaveMe: string) => {
    // Error: failed to send transaction: encoded solana_sdk::transaction::versioned::VersionedTransaction too large: 1732 bytes (max: encoded/raw 1644/1232)
    sendAndConfirmRawTransaction(connection, Buffer.from(transactionUnderdogGaveMe));
  }, [publicKey, sendTransaction, connection]);


  // This is just example code from https://github.com/solana-labs/wallet-adapter/blob/master/APP.md
  const sendZeroSol = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    // 890880 lamports as of 2022-09-01
    const lamports = await connection.getMinimumBalanceForRentExemption(0);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: 0,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, { minContextSlot });

    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
  }, [publicKey, sendTransaction, connection]);

  async function createAndMintNft() {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
      },
      body: JSON.stringify({
        attributes: { profileUrl: 'https://github.com/ilovehackathons' },
        upsert: false,
        name,
        image,
        receiverAddress: publicKey,
      })
    };

    setMinting(true)
    setErrored(false)
    setSuccessful(false)

    fetch('https://dev.underdogprotocol.com/v2/projects/n/1/nfts', options)
      .then(response => response.json())
      .then(response => {
        setUnderdogCreateResponse(response)
        console.log('The NFT was created and is waiting to be claimed:', response)
        claimAndMintNft(response.mintAddress)
      })
      .catch(err => {
        console.log('Underdog error:', err)
        setMinting(false)
        setErrored(true)
        setSuccessful(false)
      });
  }

  async function claimAndMintNft(mintAddress: string) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer e92661ae7cd4d3.645b0a2f83c8493b9ce760bdffc1e2d0'
      },
      body: JSON.stringify({ claimerAddress: publicKey })
    };

    fetch(`https://dev.underdogprotocol.com/v2/nfts/${mintAddress}/claim`, options)
      .then(response => response.json())
      .then(response => {
        setUnderdogClaimResponse(response)
        console.log("Here's the transaction to claim the NFT:", response)
        actuallyMintNonTransferableNft(response.transaction)
        // sendZeroSol() // Just for testing.
      })
      .catch(err => {
        console.log('Underdog error:', err)
        setMinting(false)
        setErrored(true)
        setSuccessful(false)
      });
  }

  const [minting, setMinting] = useState(false)
  const [errored, setErrored] = useState(false)
  const [sucessful, setSuccessful] = useState(false)

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl border-2 border-indigo-600">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>@{name}</p>
        <div className="card-actions justify-end">
          {!(minting || errored || sucessful) ? (
            <button className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..." onClick={createAndMintNft}>
              Mint
            </button>
          ) : sucessful ? (
            <p>Success!</p>
          ) : errored ? (
            <p>Error.</p>
          ) : <button disabled className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ...">
            Minting...
          </button>
          }
        </div>
      </div>
    </div>
  );
}

export default function NftIdGenerator() {
  const { data: session } = useSession() as any;
  const [underdogCreateResponse, setUnderdogCreateResponse] = useState({})
  const [underdogClaimResponse, setUnderdogClaimResponse] = useState({})
  if (session) {
    console.log(session)
    return (
      <>
        Signed in as {session.user.image.username ?? session.user.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        {session.user.image.username && <TwitterCard {...session.user.image} />}
        {session.user.name && <GitHubCard {...session} setUnderdogCreateResponse={setUnderdogCreateResponse} setUnderdogClaimResponse={setUnderdogClaimResponse} />}
        <h1 className="text-3xl">Profile data</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <h1 className="text-3xl">NFT creation response</h1>
        <pre>{JSON.stringify(underdogCreateResponse, null, 2)}</pre>
        <h1 className="text-3xl">NFT claim response</h1>
        <pre>{JSON.stringify(underdogClaimResponse, null, 2)}</pre>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
