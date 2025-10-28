# Confidential Freelancer Payment Platform

A secure Web3 freelancer payment platform with end-to-end encryption, powered by Fully Homomorphic Encryption (FHE) technology from Zama.

## Features

- **Private Token Transfers**: Transfer tokens with encrypted amounts using FHE
- **Encrypted Balances**: All balances remain encrypted on-chain
- **Decentralized**: Built on Ethereum (Sepolia testnet)
- **User-Friendly**: Modern UI with MetaMask integration
- **Type-Safe**: Full TypeScript support with strict type checking
- **Production-Ready**: Comprehensive error handling, security headers, and optimized builds

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Ethers.js** - Ethereum wallet integration

### Smart Contracts
- **Solidity 0.8.24** - Smart contract language
- **Hardhat** - Ethereum development environment
- **@fhevm/solidity** - Zama's FHE library for Solidity
- **ERC7984** - Private token standard

### Encryption
- **Zama FHE** - Fully Homomorphic Encryption for on-chain privacy
- **@zama-fhe/relayer-sdk** - Client-side FHE operations

## Quick Start

### Prerequisites

- Node.js 20+ and npm
- MetaMask browser extension
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd cipher-tasks-main

# Install frontend dependencies
npm install

# Install contract dependencies
cd contracts
npm install
cd ..
```

### Configuration

#### 1. Frontend Environment Setup

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env`:
```env
VITE_CONTRACT_ADDRESS=       # Will be filled after contract deployment
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

#### 2. Contract Environment Setup

```bash
# Navigate to contracts directory
cd contracts

# Copy example environment file
cp .env.example .env
```

Edit `contracts/.env`:
```env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_wallet_private_key_here  # NEVER commit this!
```

### Deploy Smart Contract

```bash
# Compile contracts
cd contracts
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia
```

**Important**: Copy the deployed contract address from the output and update `VITE_CONTRACT_ADDRESS` in your root `.env` file.

### Run Development Server

```bash
# Start the development server
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080)

### Test the Application

1. Install and setup MetaMask
2. Switch to Sepolia testnet
3. Get some Sepolia ETH from a [faucet](https://sepoliafaucet.com/)
4. Navigate to `/token` page
5. Connect your wallet
6. Test encrypted token transfers and balance retrieval

## Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Contracts

```bash
cd contracts
npm run build                    # Compile contracts
npm run deploy:sepolia          # Deploy to Sepolia
npx hardhat test                # Run tests (if available)
```

## Project Structure

```
cipher-tasks-main/
├── src/
│   ├── components/          # React components
│   │   └── ui/             # shadcn/ui components
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing page
│   │   └── Token.tsx       # Private token interface
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   │   └── fhe.ts          # FHE SDK initialization
│   ├── config/             # Configuration files
│   │   └── env.ts          # Environment validation
│   └── abi/                # Contract ABIs
├── contracts/
│   ├── contracts/          # Solidity contracts
│   │   └── ERC7984Token.sol
│   ├── scripts/            # Deployment scripts
│   └── deployments/        # Deployment records
├── public/                 # Static assets
└── dist/                   # Production build output
```

## Security Features

- **Strict TypeScript**: Full type safety with strict mode enabled
- **Input Validation**: Client-side validation for all user inputs
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Security Headers**: CSP, X-Frame-Options, X-Content-Type-Options
- **Environment Validation**: Runtime checks for required environment variables
- **FHE Encryption**: All token amounts encrypted using Zama's FHE

## Production Deployment

For detailed production deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick overview:
1. Deploy smart contract to Sepolia
2. Update environment variables
3. Build frontend: `npm run build`
4. Deploy to hosting platform (Vercel, Netlify, etc.)
5. Configure environment variables on hosting platform

## How FHE Works

Fully Homomorphic Encryption (FHE) allows computations on encrypted data without decryption:

1. **Encrypt**: User encrypts the transfer amount on the client side
2. **Process**: Smart contract processes encrypted amounts directly
3. **Store**: Balances remain encrypted on-chain
4. **Decrypt**: Only the owner can decrypt their balance

This ensures complete privacy - no one (not even miners or validators) can see transaction amounts or balances.

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions
- [Zama FHE Docs](https://docs.zama.ai/) - FHE documentation
- [FHE Complete Guide](./FHE_COMPLETE_GUIDE_FULL_CN.md) - Comprehensive FHE guide (Chinese)

## Troubleshooting

### Common Issues

**Contract deployment fails**
- Ensure you have enough Sepolia ETH (minimum 0.01 ETH)
- Check your `PRIVATE_KEY` in `contracts/.env`

**Frontend can't connect to contract**
- Verify `VITE_CONTRACT_ADDRESS` is set correctly
- Rebuild after updating environment variables

**MetaMask not connecting**
- Ensure MetaMask is installed
- Switch to Sepolia network in MetaMask
- Refresh the page

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review [Zama's documentation](https://docs.zama.ai/)

---

Built with ❤️ using Zama FHE technology
