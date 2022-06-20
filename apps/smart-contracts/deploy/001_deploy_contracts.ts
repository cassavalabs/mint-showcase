import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("Deployer " + deployer);

  //Deploy mintable collections
  await deploy("ERC721Mintable", {
    from: deployer,
    args: ["CassavaLand", "CASSA", "ipfs://"],
    log: true,
  });

  await deploy("ERC1155Mintable", {
    from: deployer,
    args: ["CassavaLand", "CASSA", "ipfs://"],
    log: true,
  });

  await deploy("CassavaLandNFTFactory", {
    from: deployer,
    log: true,
  });
};

export default main;
