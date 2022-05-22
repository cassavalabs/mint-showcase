import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import { getRPC, getPrivateKey } from "./utils";

import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const chainIds = {
  hardhat: 31337,
  moonbeam: 1284,
  moonbase: 1287,
  moonriver: 1285,
};

function createConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url = getRPC(network);
  return {
    accounts: getPrivateKey(network),
    chainId: chainIds[network],
    url,
    gasPrice: "auto",
  };
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    moonbeam: createConfig("moonbeam"),
    moonbase: createConfig("moonbase"),
    moonriver: createConfig("moonriver"),
  },
  namedAccounts: {
    deployer: "0x51685d226F643814EC3081593f0753CC8b2C38D1",
    admin: "0x51685d226F643814EC3081593f0753CC8b2C38D1",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "../../libs/sdk/src/lib/typechain",
    target: "ethers-v5",
  },
};

export default config;
