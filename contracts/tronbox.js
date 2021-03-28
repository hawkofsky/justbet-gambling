const port = process.env.HOST_PORT || 9090
process.env.PRIVATE_KEY_SHASTA = 'c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd'
process.env.PRIVATE_KEY_MAINNET = 'c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd'
process.env.PRIVATE_KEY_NILE = 'c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd'

module.exports = {
  networks: {
    mainnet: {
      // Don't put your private key here:
      privateKey: process.env.PRIVATE_KEY_MAINNET,
      /*
Create a .env file (it must be gitignored) containing something like

  export PRIVATE_KEY_MAINNET=4E7FECCB71207B867C495B51A9758B104B1D4422088A87F4978BE64636656243

Then, run the migration with:

  source .env && tronbox migrate --network mainnet

*/
      userFeePercentage: 100,
      feeLimit: 1e8,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: process.env.PRIVATE_KEY_SHASTA,
      userFeePercentage: 0,
      feeLimit: 1e8,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: 2
    },
    tronex: {
      privateKey: process.env.PRIVATE_KEY_SHASTA,
      userFeePercentage: 50,
      feeLimit: 1e8,
      fullHost: 'https://testhttpapi.tronex.io',
      network_id: 2
    },
    nile: {
      privateKey: process.env.PRIVATE_KEY_NILE,
      fullHost: 'https://api.nileex.io/',
      network_id: '3'
    },
    dev: {
      // For trontools/quickstart docker image
      privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      userFeePercentage: 0,
      feeLimit: 1e8,
      fullHost: 'http://127.0.0.1:9090',
      network_id: '9'
    },
    compilers: {
      solc: {
        version: '0.5.8'
      }
    }
  }
}
