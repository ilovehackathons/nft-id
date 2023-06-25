// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import NftIdGenerator from "../../components/NftIdGenerator";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          NFT-ID{" "}
          <span className="text-sm font-normal align-top text-slate-700">
            v{pkg.version}
          </span>
        </h1>
        <p className="md:w-full text-center text-slate-300 my-2">
          <p>Bring your web2 reputation onto chain.</p>
          Connect GitHub or Twitter and mint your profile as an NFT on Solana (powered by <a href="https://underdogprotocol.com" className="text-blue-300 hover:text-blue-200">Underdog</a>).
        </p>
        <NftIdGenerator />

        {/* <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
          <pre data-prefix=">">
            <code className="truncate">Start building on Solana </code>
          </pre>
        </div> */}
        <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>
      </div>
    </div>
  );
};
