import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.001");

  console.log("deploying");
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();
  console.log("deployed");

  console.log(
    `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );

  const provider = new ethers.providers.WebSocketProvider("ws://localhost:8545");
  //const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

  provider.on("block", (blockNumber) => {
    console.log("block", new Date(), blockNumber);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
