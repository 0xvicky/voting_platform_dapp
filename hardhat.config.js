require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const RPC__URL = process.env.RPC_URL;
const GOERLI__PRIVATE_KEY = process.env.PRIVATE_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  path:{
    artifacts:'./src/artifacts'
  },
  networks: {
    goerli: {
      url: RPC__URL,
      accounts: [GOERLI__PRIVATE_KEY],
      chainId: 5
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
};
