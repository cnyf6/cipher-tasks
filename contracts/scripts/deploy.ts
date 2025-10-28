import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting deployment process...");

  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log(`Deploying to network: ${network.name} (chainId: ${network.chainId})`);

  // Get deployer information
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await ethers.provider.getBalance(deployerAddress);

  console.log(`Deployer address: ${deployerAddress}`);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} ETH`);

  // Check balance
  if (balance === 0n) {
    throw new Error("Deployer account has no funds. Please fund the account before deploying.");
  }

  const minBalance = ethers.parseEther("0.01");
  if (balance < minBalance) {
    console.warn(`Warning: Deployer balance is low (${ethers.formatEther(balance)} ETH). Deployment may fail.`);
  }

  // Deploy parameters
  // Note: With euint64 storage, 18 decimals means the max whole tokens is ~18.
  // Use a safe initial supply within uint64 bounds.
  const initialSupply = ethers.parseUnits("10", 18); // 10 tokens (18 decimals)
  console.log(`Initial supply: ${ethers.formatUnits(initialSupply, 18)} tokens`);

  // Deploy contract
  console.log("\nDeploying ERC7984Token...");
  const Factory = await ethers.getContractFactory("ERC7984Token");
  const contract = await Factory.deploy(initialSupply);

  console.log("Waiting for deployment transaction to be mined...");
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("\n✅ ERC7984Token deployed successfully!");
  console.log(`📍 Contract address: ${address}`);

  // Verify deployment
  console.log("\nVerifying deployment...");
  const deployedCode = await ethers.provider.getCode(address);
  if (deployedCode === "0x") {
    throw new Error("Contract deployment failed - no code at contract address");
  }
  console.log("✅ Contract code verified");

  // Test contract functions
  console.log("\nTesting contract...");
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

  console.log(`Token name: ${name}`);
  console.log(`Token symbol: ${symbol}`);
  console.log(`Token decimals: ${decimals}`);

  // Save deployment information
  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    contractAddress: address,
    deployerAddress: deployerAddress,
    deploymentTimestamp: new Date().toISOString(),
    initialSupply: initialSupply.toString(),
    tokenName: name,
    tokenSymbol: symbol,
    tokenDecimals: decimals,
  };

  const deploymentPath = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }

  const fileName = `${network.name}-${Date.now()}.json`;
  const filePath = path.join(deploymentPath, fileName);
  fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, (_key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  , 2));

  console.log(`\n💾 Deployment info saved to: ${filePath}`);

  // Update .env instruction
  console.log("\n📝 Next steps:");
  console.log("1. Update your root .env file with:");
  console.log(`   VITE_CONTRACT_ADDRESS=${address}`);
  console.log("\n2. Ensure your .env has:");
  console.log(`   VITE_SEPOLIA_CHAIN_ID=${network.chainId}`);
  console.log("   VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com");
  console.log("\n3. Run 'npm run dev' to start the frontend");
  console.log("\n4. (Optional) Verify contract on Etherscan:");
  console.log(`   npx hardhat verify --network sepolia ${address} ${initialSupply.toString()}`);
}

main().catch((error) => {
  console.error("\n❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});


