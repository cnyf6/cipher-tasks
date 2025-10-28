# User Guide - Confidential Freelancer Payment Platform

Welcome to the Confidential Freelancer Payment Platform! This guide will walk you through using the encrypted token system powered by Fully Homomorphic Encryption (FHE).

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Connecting Your Wallet](#connecting-your-wallet)
4. [Using the Token Page](#using-the-token-page)
5. [Transferring Tokens](#transferring-tokens)
6. [Checking Your Balance](#checking-your-balance)
7. [Troubleshooting](#troubleshooting)
8. [Security & Privacy](#security--privacy)
9. [FAQ](#faq)

---

## Getting Started

The Confidential Freelancer Payment Platform allows you to send and receive encrypted tokens on the Ethereum Sepolia testnet. All transaction amounts are encrypted using FHE technology, ensuring complete privacy.

**Live Platform**: https://cipher-tasks-main-pj1e4s5we-cys-projects-f19e6212.vercel.app

---

## Prerequisites

Before using the platform, you'll need:

### 1. MetaMask Wallet
- **Install MetaMask**: Download from [metamask.io](https://metamask.io)
- Available for Chrome, Firefox, Edge, and mobile devices
- Create a new wallet or import an existing one

### 2. Sepolia Test ETH
You need Sepolia ETH to pay for gas fees. Get free testnet ETH from:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [Google Cloud Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

**Amount needed**: ~0.01 ETH for multiple transactions

### 3. Modern Web Browser
- Chrome (recommended)
- Firefox
- Edge
- Brave

**Note**: Your browser must support WebAssembly (all modern browsers do)

---

## Connecting Your Wallet

### Step 1: Navigate to the Token Page

1. Visit the platform homepage
2. Click on **"Token"** in the navigation menu
3. Or directly access: `/token` path

### Step 2: Connect MetaMask

1. Click the **"Connect Wallet"** button
2. MetaMask will open automatically
3. Select the account you want to connect
4. Click **"Next"** then **"Connect"**

![Connect Wallet Example](https://via.placeholder.com/600x300?text=MetaMask+Connection)

### Step 3: Switch to Sepolia Network

If you're not on Sepolia network:

1. MetaMask will prompt you to switch networks
2. Click **"Switch Network"**
3. Confirm the network change

**Manual Network Switch**:
- Open MetaMask
- Click the network dropdown at the top
- Select **"Sepolia test network"**

**Network Details**:
- Network Name: Sepolia
- Chain ID: 11155111
- RPC URL: https://ethereum-sepolia-rpc.publicnode.com
- Currency Symbol: ETH
- Block Explorer: https://sepolia.etherscan.io

---

## Using the Token Page

The Token page has two main sections:

### 1. Transfer Tokens (Left Panel)
Send encrypted tokens to other addresses

### 2. View Balance (Right Panel)
Check your encrypted token balance

---

## Transferring Tokens

### Step-by-Step Transfer Process

#### 1. Enter Recipient Address
```
To Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0
```
- Must be a valid Ethereum address (starts with `0x`)
- Format: 42 characters (0x + 40 hex characters)
- Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0`

**Tips**:
- Copy-paste addresses to avoid typos
- Double-check the address before sending
- You can send to yourself for testing

#### 2. Enter Amount
```
Amount: 100
```
- Enter the number of tokens to send
- Must be a positive number
- Decimals are supported (e.g., 10.5)
- Unit: Full token units (internally uses 18 decimals)

**Important**: Ensure you have sufficient balance!

#### 3. Click "Transfer"

1. Click the **"Transfer"** button
2. Wait for FHE encryption (may take 5-10 seconds)
3. MetaMask will open with transaction details

#### 4. Confirm in MetaMask

**Transaction Details**:
- **To**: Contract Address (0xfA69b59E6F4895429e291Fd5ABf522812B40AA22)
- **Gas Fee**: ~0.001-0.003 ETH
- **Data**: Encrypted transaction data

**Action**: Click **"Confirm"** in MetaMask

#### 5. Wait for Confirmation

- Processing time: 15-30 seconds
- You'll see a loading indicator
- Success message appears when complete

**Success Message**:
```
✅ Transfer successful!
Transaction confirmed on Sepolia network
```

#### 6. Verify on Block Explorer

Click the transaction link to view on Etherscan:
```
https://sepolia.etherscan.io/tx/0x...
```

**What You'll See**:
- Transaction hash
- Block number
- Gas used
- Status: Success ✅
- **Note**: Amount is encrypted and not visible on explorer!

---

## Checking Your Balance

### Step-by-Step Balance Check

#### 1. Click "Get Balance" Button

Located in the right panel of the Token page

#### 2. Request Access Permission

First time only:
- MetaMask opens with "Request Balance Access" transaction
- This grants you permission to decrypt your balance
- Gas cost: ~0.0005 ETH
- Click **"Confirm"**

#### 3. Sign Decryption Request

MetaMask will ask for a signature:
- This creates an authorization signature
- **No gas cost** for signing
- Click **"Sign"**

**Signature Message Details**:
```
User Decrypt Request Verification
Contract: 0xfA69...
Valid for: 1 day
```

#### 4. Decryption Process

- The FHE system decrypts your balance
- Processing time: 5-15 seconds
- Your balance is decrypted client-side (secure!)

#### 5. View Your Balance

Your balance appears in the display:
```
Your Balance: 1,000,000 Tokens
```

**Balance Display**:
- Shows full token units
- Automatically formatted with commas
- Refresh by clicking "Get Balance" again

---

## Troubleshooting

### Common Issues and Solutions

#### ❌ "MetaMask is not installed"

**Solution**:
1. Install MetaMask from [metamask.io](https://metamask.io)
2. Refresh the page
3. Try connecting again

---

#### ❌ "Please switch to Sepolia network"

**Solution**:
1. Open MetaMask
2. Click network dropdown
3. Select "Sepolia test network"
4. If Sepolia isn't listed, add it manually with these details:
   - Network Name: Sepolia
   - RPC URL: https://ethereum-sepolia-rpc.publicnode.com
   - Chain ID: 11155111
   - Currency: ETH

---

#### ❌ "FHE initialization failed: Timeout"

**Solution**:
1. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Check your internet connection
4. Try a different browser
5. Disable browser extensions temporarily

---

#### ❌ "Insufficient funds for transaction"

**Solution**:
1. Check your Sepolia ETH balance in MetaMask
2. Get free testnet ETH from a faucet:
   - https://sepoliafaucet.com/
   - https://www.infura.io/faucet/sepolia
3. Wait for faucet transaction to complete (~30 seconds)
4. Try your transaction again

---

#### ❌ "Transaction rejected by user"

**Cause**: You clicked "Reject" in MetaMask

**Solution**:
1. Click the transfer/balance button again
2. Click "Confirm" in MetaMask this time

---

#### ❌ "Invalid recipient address"

**Solution**:
1. Check address format: must start with `0x`
2. Address must be 42 characters long
3. Copy-paste the address to avoid typos
4. Remove any extra spaces

---

#### ❌ "Amount must be a positive number"

**Solution**:
1. Enter a number greater than 0
2. Don't use negative numbers
3. Decimals are OK (e.g., 10.5)
4. Don't include commas or symbols

---

#### ❌ Transaction takes too long

**Solution**:
1. Check Sepolia network status: https://sepolia.etherscan.io/
2. Check your transaction on Etherscan (click the link)
3. If "Pending" for >5 minutes, it may be stuck:
   - Open MetaMask
   - Click "Activity"
   - Find the transaction
   - Click "Speed Up" or "Cancel"

---

#### ❌ "Failed to decrypt balance"

**Solution**:
1. Request balance access again (first button)
2. Wait for the access transaction to confirm
3. Then try "Get Balance" again
4. Make sure you sign the decryption request

---

## Security & Privacy

### What is Encrypted?

✅ **Encrypted (Private)**:
- Token amounts in transfers
- Your token balance
- All transaction values

❌ **Not Encrypted (Public)**:
- Sender address
- Recipient address
- Transaction timestamp
- That a transaction occurred

### How Privacy Works

1. **Transfer Encryption**:
   - Amount is encrypted on your device
   - Encrypted data sent to blockchain
   - Only decryptable by authorized parties

2. **Balance Decryption**:
   - Your balance is stored encrypted on-chain
   - You request permission to decrypt
   - Decryption happens locally (secure)

3. **Zero-Knowledge Proofs**:
   - Proves you have sufficient balance
   - Doesn't reveal the actual amount
   - Math-based verification

### Security Best Practices

✅ **DO**:
- Keep your MetaMask seed phrase safe
- Verify recipient addresses before sending
- Use the official platform URL
- Check transaction details in MetaMask
- Keep your browser updated

❌ **DON'T**:
- Share your private keys or seed phrase
- Connect to unknown websites
- Ignore MetaMask warnings
- Use public WiFi for transactions
- Trust unsolicited messages

---

## FAQ

### General Questions

**Q: Is this real money?**
A: No, this uses Sepolia testnet which has no real value. It's for testing and demonstration only.

**Q: Can I use this on Ethereum mainnet?**
A: Currently, this is deployed on Sepolia testnet only. Mainnet deployment would require additional auditing and testing.

**Q: Do I need to pay anything?**
A: You need Sepolia testnet ETH for gas fees (free from faucets). The tokens themselves are free for testing.

**Q: How do I get tokens?**
A: For testing purposes, you can request an airdrop from the platform administrator, or receive tokens from another user.

---

### Privacy Questions

**Q: Can others see my balance?**
A: No, your balance is encrypted on the blockchain. Only you can decrypt it with your private key.

**Q: Can others see how much I sent?**
A: No, transfer amounts are encrypted. Only the sender and recipient can decrypt the values.

**Q: What can people see publicly?**
A: Public information includes: sender address, recipient address, and that a transaction occurred. The amount is encrypted.

**Q: Is this more private than regular Ethereum?**
A: Yes! Regular Ethereum transactions show all amounts publicly. This platform encrypts all values.

---

### Technical Questions

**Q: What is FHE?**
A: Fully Homomorphic Encryption allows computations on encrypted data without decrypting it. This means the blockchain can verify transactions without seeing the amounts.

**Q: Why does encryption take time?**
A: FHE encryption is computationally intensive. It takes 5-10 seconds to encrypt data for maximum security.

**Q: What happens if encryption fails?**
A: The transaction won't be sent. You can try again by refreshing the page and retrying.

**Q: Can I cancel a transaction?**
A: Once confirmed on the blockchain, transactions are final. You can reject the MetaMask confirmation to prevent sending.

**Q: Why do I need to request balance access?**
A: This is a one-time permission that allows you to decrypt your balance. It's required for the FHE system's access control.

---

### Transaction Questions

**Q: How long do transactions take?**
A: Typical transaction times:
- Encryption: 5-10 seconds
- Blockchain confirmation: 15-30 seconds
- Total: ~30-40 seconds

**Q: What if my transaction fails?**
A: Check the error message, ensure you have enough ETH for gas, and verify the recipient address is correct.

**Q: Can I send to multiple addresses at once?**
A: Not currently. You need to send separate transactions for each recipient.

**Q: Is there a transaction limit?**
A: No hard limit, but you need sufficient token balance and ETH for gas.

---

### Wallet Questions

**Q: Can I use WalletConnect or other wallets?**
A: Currently, only MetaMask is supported. We may add more wallets in the future.

**Q: What if I lose access to my MetaMask?**
A: If you have your seed phrase, you can recover your wallet. Otherwise, access is permanently lost.

**Q: Can I use hardware wallets?**
A: Yes, if your hardware wallet is connected through MetaMask.

---

## Support & Resources

### Need Help?

- **GitHub Issues**: https://github.com/cnyf6/cipher-tasks/issues
- **Documentation**: Check the README.md in the repository
- **Etherscan**: https://sepolia.etherscan.io/

### Useful Links

- **Platform**: https://cipher-tasks-main-pj1e4s5we-cys-projects-f19e6212.vercel.app
- **GitHub**: https://github.com/cnyf6/cipher-tasks
- **MetaMask**: https://metamask.io
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Zama FHE**: https://docs.zama.ai/

### Contract Information

- **Contract Address**: `0xfA69b59E6F4895429e291Fd5ABf522812B40AA22`
- **Network**: Sepolia Testnet
- **Chain ID**: 11155111
- **View on Etherscan**: https://sepolia.etherscan.io/address/0xfA69b59E6F4895429e291Fd5ABf522812B40AA22

---

## Quick Reference Card

### Transfer Tokens
```
1. Enter recipient address (0x...)
2. Enter amount
3. Click "Transfer"
4. Confirm in MetaMask
5. Wait for confirmation
```

### Check Balance
```
1. Click "Get Balance"
2. (First time) Confirm access request
3. Sign decryption request
4. View your balance
```

### Gas Fees
```
- Transfer: ~0.001-0.003 ETH
- Balance Access: ~0.0005 ETH
- Signing: FREE
```

### Network Info
```
- Network: Sepolia
- Chain ID: 11155111
- RPC: https://ethereum-sepolia-rpc.publicnode.com
- Explorer: https://sepolia.etherscan.io
```

---

**Last Updated**: 2025-10-28
**Version**: 1.0.0
**Platform**: Confidential Freelancer Payment Platform

---

**Note**: This is a testnet demonstration. Always verify you're using the correct network before transactions!
