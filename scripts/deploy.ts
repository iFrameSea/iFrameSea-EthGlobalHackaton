import { ethers } from 'hardhat';

async function main() {
  const MintArt = await ethers.getContractFactory('IFRAMESEA');
  const mintArt = await MintArt.deploy(
    '0xd75C76eaaf6264247693ed1196E07C7A08d1B490'
  );

  await mintArt.deployed();

  console.log(`deployed to ${mintArt.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
