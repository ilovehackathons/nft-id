import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { NftId } from "../target/types/nft_id";

describe("nft-id", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.NftId as Program<NftId>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
