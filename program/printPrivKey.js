const bs58 = require("bs58");

const privKey = new Uint8Array([
  8, 49, 6, 146, 222, 58, 233, 30, 31, 72, 163, 28, 132, 95, 235, 156, 246, 190,
  51, 106, 108, 82, 61, 109, 246, 15, 138, 56, 187, 103, 59, 144, 17, 229, 218,
  90, 108, 66, 99, 119, 23, 225, 107, 240, 185, 229, 104, 111, 175, 187, 117,
  47, 63, 221, 52, 34, 65, 106, 203, 215, 103, 244, 135, 174,
]); // content of wallet.json

console.log(`Import in Phantom:\n\n${bs58.encode(privKey)}`);
