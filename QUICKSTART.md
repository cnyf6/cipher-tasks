# Quick Start Guide

Get the Confidential Freelancer Payment Platform running in 5 minutes!

## Prerequisites

Before you begin, ensure you have:

- [x] Node.js 20+ installed ([Download](https://nodejs.org/))
- [x] MetaMask browser extension ([Install](https://metamask.io/))
- [x] Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))
- [x] A wallet with private key for contract deployment

## Step 1: Install Dependencies (2 min)

```bash
# Install frontend dependencies
npm install

# Install contract dependencies
cd contracts
npm install
cd ..
```

## Step 2: Configure Environment (1 min)

### Frontend Configuration

```bash
# Copy environment template
cp .env.example .env
```

Open `.env` and fill in (contract address will be added after deployment):

```env
VITE_CONTRACT_ADDRESS=
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

### Contract Configuration

```bash
# Navigate to contracts and copy template
cd contracts
cp .env.example .env
```

Open `contracts/.env` and add your wallet private key:

```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_private_key_here
```

⚠️ **Security Warning**: Never commit `.env` files!

## Step 3: Deploy Smart Contract (2 min)

```bash
# Make sure you're in the contracts directory
cd contracts

# Compile contracts
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia
```

**Example Output:**
```
✅ ERC7984Token deployed successfully!
📍 Contract address: 0x1234567890abcdef1234567890abcdef12345678
```

**Important**: Copy the contract address from the output!

## Step 4: Update Contract Address

Go back to the root directory and update `.env`:

```bash
cd ..
nano .env  # or use your preferred editor
```

Add the deployed contract address:

```env
VITE_CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678  # Your actual address
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

## Step 5: Start Development Server (< 1 min)

```bash
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080)

## Step 6: Test the Application

### Connect Wallet

1. Click "Connect Wallet" or navigate to `/token` page
2. MetaMask will pop up
3. Make sure you're on Sepolia network
4. Approve the connection

### Test Token Transfer

1. Go to `/token` page
2. Enter recipient address (can use another address you control)
3. Enter amount (e.g., `1.5`)
4. Click "Transfer"
5. Confirm transaction in MetaMask
6. Wait for confirmation

### Check Balance

1. Click "Get My Balance" button
2. Approve the balance access request in MetaMask
3. Your encrypted balance will be decrypted and displayed

## Troubleshooting

### "MetaMask not detected"
- Install MetaMask extension
- Refresh the page

### "Network mismatch"
- Switch MetaMask to Sepolia network
- Network ID should be 11155111

### "Contract deployment failed"
- Ensure you have enough Sepolia ETH (minimum 0.01 ETH)
- Check your private key is correct in `contracts/.env`

### "Transaction failed"
- Make sure you have Sepolia ETH for gas
- Verify contract address in `.env` is correct

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

When ready to deploy to production:

```bash
# Run production readiness check
npm run check:production

# Build for production
npm run build

# Deploy dist/ folder to your hosting platform
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

## What's Next?

- 📖 Read the [README.md](./README.md) for complete documentation
- 🚀 Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- ✅ Review [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) before going live
- 📚 Learn more about [FHE technology](./FHE_COMPLETE_GUIDE_FULL_CN.md)

## Need Help?

- Check the [README.md troubleshooting section](./README.md#troubleshooting)
- Review [Zama FHE documentation](https://docs.zama.ai/)
- Open an issue on GitHub

---

**Estimated Setup Time**: ~5 minutes
**Difficulty**: Beginner-friendly

Happy building with FHE! 🔐
