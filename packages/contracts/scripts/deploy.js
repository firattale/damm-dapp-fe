// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
	const NFTContract = await hre.ethers.getContractFactory("NFTContract");
	const nftContract = await NFTContract.deploy("https://api.coolcatsnft.com/cat/");
	const [owner] = await ethers.getSigners();
	await nftContract.deployed();
	await nftContract.mint(owner.address);
	await nftContract.mint(owner.address);
	await nftContract.mint(owner.address);
	const balance = await nftContract.balanceOf(owner.address);
	console.log(`===== The contract deployed to ${nftContract.address}`);
	console.log(`==== The ${owner.address} has ${balance} NFTs`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
