// Remix IDE Configuration
// Use this file to configure Remix for contract deployment

module.exports = {
  compiler: {
    version: "0.8.30",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "london"
    }
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: ["YOUR_PRIVATE_KEY"]
    },
    optimismGoerli: {
      url: "https://goerli.optimism.io",
      accounts: ["YOUR_PRIVATE_KEY"]
    },
    arbitrumGoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      accounts: ["YOUR_PRIVATE_KEY"]
    },
    polygonMumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};

