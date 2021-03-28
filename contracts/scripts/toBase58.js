const tronWeb = require("tronweb");

console.log(tronWeb.address.fromHex(process.argv[2]));