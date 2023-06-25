import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Message, MessageV0, Transaction, VersionedMessage, VersionedTransaction } from "@solana/web3.js";
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

  const wallet = useWallet();

  async function generateClaimLink(nftId: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
      }
    };

    fetch(`https://dev.underdogprotocol.com/v2/projects/n/1/nfts/${nftId}/claim`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response); setClaimLink(response.link)
        setMinting(false)
        setErrored(false)
        setSuccessful(true)

      })
      .catch(err => {
        console.error(err);
        setMinting(false)
        setErrored(true)
        setSuccessful(false)
      });
  }

  // Doesn't work
  // const actuallyMintNonTransferableNft = useCallback(async (transactionUnderdogGaveMe: string) => {
  //   try {
  //     const buffer = Buffer.from(transactionUnderdogGaveMe)
  //     const u8arr = Uint8Array.from(buffer)

  //     // const msgv0 = MessageV0.deserialize(u8arr) // Error: Expected versioned message but received legacy message
  //     const msg = Message.from(u8arr)
  //     console.log('msg:', msg)

  //     // const tx = Transaction.from()
  //     // await wallet.sendTransaction(tx, connection)

  //     // await wallet.sendTransaction()

  //     // const base64Tx = Buffer.from(transactionUnderdogGaveMe)

  //     // const message = VersionedMessage.deserialize(base64Tx)



  //     // console.log(message.header)

  //     // const tx = new VersionedTransaction(message)
  //     // console.log(tx.signatures)


  //     // // const signedTx = await wallet.signTransaction(tx)

  //     // const result = await wallet.sendTransaction(tx, connection)
  //     // // const sig = await connection.sendEncodedTransaction(signedTx.toString())
  //     // // console.log(sig)
  //     // // const result = await wallet.sendTransaction(VersionedTransaction.deserialize(bufferRes), connection);

  //     // // console.log("sendTransaction successful!", result);
  //     setErrored(false)
  //     setSuccessful(true)
  //   }
  //   catch (e) {
  //     console.log('signMessage/sendTransaction error:', e)
  //     setErrored(true)
  //     setSuccessful(false)
  //   }
  //   setMinting(false)

  // }, [publicKey, sendTransaction, connection]);

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
        // claimAndMintNft(response.mintAddress)
        generateClaimLink(response.id)
      })
      .catch(err => {
        console.log('Underdog error:', err)
        setMinting(false)
        setErrored(true)
        setSuccessful(false)
      });
  }

  // async function claimAndMintNft(mintAddress: string) {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       accept: 'application/json',
  //       'content-type': 'application/json',
  //       authorization: 'Bearer e92661ae7cd4d3.645b0a2f83c8493b9ce760bdffc1e2d0'
  //     },
  //     body: JSON.stringify({ claimerAddress: publicKey })
  //   };

  //   fetch(`https://dev.underdogprotocol.com/v2/nfts/${mintAddress}/claim`, options)
  //     .then(response => response.json())
  //     .then(response => {
  //       setUnderdogClaimResponse(response)
  //       console.log("Here's the transaction to claim the NFT:", response)
  //       actuallyMintNonTransferableNft(response.transaction)
  //     })
  //     .catch(err => {
  //       console.log('Underdog error:', err)
  //       setMinting(false)
  //       setErrored(true)
  //       setSuccessful(false)
  //     });
  // }

  const [minting, setMinting] = useState(false)
  const [errored, setErrored] = useState(false)
  const [sucessful, setSuccessful] = useState(false)
  const [claimLink, setClaimLink] = useState()

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
              // <p>Check your wallet for the NFT.</p>
              <p>Visit this link to claim your NFT: <a target="_blank" rel="noopener" href={claimLink} className="text-blue-300 hover:text-blue-200">Underdog</a></p>
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
