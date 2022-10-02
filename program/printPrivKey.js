const bs58 = require("bs58");
const fs = require("fs");

const privKey = new Uint8Array(
  JSON.parse(fs.readFileSync("./wallet.json", { encoding: "utf8" }))
);

console.log(`Import in Phantom:\n\n${bs58.encode(privKey)}`);
