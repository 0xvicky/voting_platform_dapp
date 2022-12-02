const {ethers} = require("hardhat");

async function main() {
const VotingFactory = await ethers.getContractFactory("VotingSystem");
console.log("Contract is deploying...");
const votingDeploy =  await VotingFactory.deploy(1670077681,["A","B","C","D"]);
await votingDeploy.deployed();
const contractAddress = await votingDeploy.address;
console.log(`Address of the contract is:${contractAddress}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

