# Production Deployment Guide

This guide walks you through deploying the Confidential Freelancer Payment Platform to production.

## Prerequisites

- Node.js 20+ and npm installed
- MetaMask wallet with Sepolia ETH for contract deployment
- A hosting platform account (Vercel, Netlify, or similar)
- Git repository access

## Step 1: Environment Setup

### 1.1 Clone and Install

```bash
git clone <your-repo-url>
cd cipher-tasks-main
npm install
cd contracts && npm install && cd ..
```

### 1.2 Configure Environment Variables

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Contract address - will be filled after deployment
VITE_CONTRACT_ADDRESS=

# Sepolia network configuration
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

Create `contracts/.env`:

```bash
cd contracts
cp .env.example .env
```

Edit `contracts/.env`:
```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_private_key_here
```

**Security Warning**: Never commit `.env` files with real private keys!

## Step 2: Smart Contract Deployment

### 2.1 Get Sepolia ETH

Get testnet ETH from a Sepolia faucet:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

### 2.2 Deploy Contract

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

Expected output:
```
Starting deployment process...
Deploying to network: sepolia (chainId: 11155111)
Deployer address: 0x...
Deployer balance: 0.5 ETH

Deploying ERC7984Token...
✅ ERC7984Token deployed successfully!
📍 Contract address: 0x...

Next steps:
1. Update your root .env file with:
   VITE_CONTRACT_ADDRESS=0x...
```

### 2.3 Update Environment Variables

Copy the contract address from the deployment output and update your root `.env` file:

```env
VITE_CONTRACT_ADDRESS=0xYourContractAddressHere
```

### 2.4 (Optional) Verify Contract on Etherscan

```bash
cd contracts
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <INITIAL_SUPPLY>
```

Example:
```bash
npx hardhat verify --network sepolia 0x123... 1000000000000000000000000
```

## Step 3: Frontend Build and Test

### 3.1 Test Locally

```bash
npm run dev
```

Visit `http://localhost:8080` and test:
- Connect MetaMask (switch to Sepolia network)
- Navigate to `/token` page
- Test transfer and balance retrieval functions

### 3.2 Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 3.3 Preview Production Build

```bash
npm run preview
```

## Step 4: Deploy to Hosting Platform

### Option A: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_CONTRACT_ADDRESS`
   - `VITE_SEPOLIA_CHAIN_ID`
   - `VITE_SEPOLIA_RPC_URL`

4. Redeploy to apply environment variables:
```bash
vercel --prod
```

### Option B: Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the site:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Set environment variables in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add all `VITE_*` variables

### Option C: Deploy to GitHub Pages

1. Update `vite.config.ts` to set the base path:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
});
```

2. Build:
```bash
npm run build
```

3. Deploy using GitHub Actions (workflow already configured in `.github/workflows/`)

## Step 5: Post-Deployment Verification

### 5.1 Functional Testing

Test the following on your production site:

- [ ] Site loads correctly
- [ ] MetaMask connection works
- [ ] Token transfer functionality works
- [ ] Balance retrieval works
- [ ] Error messages display correctly
- [ ] Mobile responsiveness

### 5.2 Security Checks

- [ ] All `.env` files are in `.gitignore`
- [ ] No private keys in repository
- [ ] CSP headers are set correctly
- [ ] HTTPS is enabled
- [ ] Contract address is correct

### 5.3 Performance Monitoring

Check the following metrics:
- Page load time < 3 seconds
- First Contentful Paint < 1.5 seconds
- Time to Interactive < 3 seconds

Use tools like:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## Step 6: Monitoring and Maintenance

### 6.1 Set Up Monitoring

Consider setting up:
- Error tracking (e.g., Sentry)
- Analytics (e.g., Google Analytics, Plausible)
- Uptime monitoring (e.g., UptimeRobot)

### 6.2 Regular Maintenance

- Monitor contract events on Etherscan
- Check for dependency updates: `npm outdated`
- Review security advisories: `npm audit`
- Backup deployment information from `contracts/deployments/`

## Troubleshooting

### Contract Deployment Fails

**Problem**: Transaction fails or runs out of gas
**Solution**:
- Ensure you have enough Sepolia ETH (minimum 0.01 ETH recommended)
- Increase gas limit in `hardhat.config.ts`

### Frontend Can't Connect to Contract

**Problem**: "Contract address not found" error
**Solution**:
- Verify `VITE_CONTRACT_ADDRESS` is set correctly
- Rebuild the frontend after updating environment variables
- Clear browser cache

### MetaMask Connection Issues

**Problem**: MetaMask not detected
**Solution**:
- Ensure MetaMask is installed
- Check if site is on HTTPS (required for MetaMask)
- Try refreshing the page

### Build Errors

**Problem**: TypeScript or build errors
**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist .vite
npm run build
```

## Support and Resources

- [Zama FHE Documentation](https://docs.zama.ai/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Project Issues](https://github.com/your-repo/issues)

## Security Considerations

1. **Private Keys**: Never commit private keys or `.env` files
2. **Contract Ownership**: Consider implementing access controls for production
3. **Rate Limiting**: Implement rate limiting for API calls
4. **Input Validation**: All user inputs are validated client and contract-side
5. **Regular Updates**: Keep dependencies updated for security patches

## Rollback Plan

If issues occur in production:

1. Revert to previous deployment:
```bash
vercel rollback  # or your platform's rollback command
```

2. If contract needs changes:
   - Deploy new contract version
   - Update `VITE_CONTRACT_ADDRESS`
   - Redeploy frontend

3. Communicate with users about any issues or maintenance

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
