import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: [2000, 3000],
      },
    },
  },
};

export default config;
