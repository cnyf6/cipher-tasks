import { useMemo, useState } from 'react';
import { BrowserProvider, Contract, Interface, parseUnits, isAddress, hexlify } from 'ethers';
import config from '@/config/env';
import { initializeFHE } from '@/utils/fhe';

interface TransferResult {
  success: boolean;
  error?: string;
}

export function usePrivateToken(contractAddress: string, abi: any[]) {
  const [isTransferring, setIsTransferring] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  function normalizeAbi(originalAbi: any[]): any[] {
    return originalAbi.map((item) => {
      if (item.type !== 'function' && item.type !== 'constructor') return item;

      const mapParamType = (param: any) => {
        const t = (param.type || '').toString();
        const isEncryptedFixed =
          t.startsWith('externalEuint') ||
          t.startsWith('euint') ||
          t.startsWith('ebool');
        return {
          ...param,
          // FHE encrypted numeric/boolean values are fixed 32 bytes (bytes32) at ABI layer
          type: isEncryptedFixed ? 'bytes32' : param.type,
        };
      };

      return {
        ...item,
        inputs: Array.isArray(item.inputs) ? item.inputs.map(mapParamType) : item.inputs,
        outputs: Array.isArray(item.outputs) ? item.outputs.map(mapParamType) : item.outputs,
      };
    });
  }

  const normalizedAbi = useMemo(() => normalizeAbi(abi), [abi]);

  // Check if MetaMask is installed
  function checkWalletConnection(): void {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      throw new Error(
        'MetaMask is not installed. Please install MetaMask to use this feature.'
      );
    }
  }

  async function ensureSepoliaNetwork(provider: BrowserProvider): Promise<BrowserProvider> {
    const network = await provider.getNetwork();
    if (Number(network.chainId) === Number(config.sepoliaChainId)) return provider;

    // Try to switch network in wallet
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // 11155111
      });
      // Re-create provider after switch
      return new BrowserProvider((window as any).ethereum);
    } catch (switchErr: any) {
      throw new Error('Please switch MetaMask to Sepolia network and try again.');
    }
  }

  async function assertContractDeployed(provider: BrowserProvider, address: string): Promise<void> {
    const code = await provider.getCode(address as any);
    if (!code || code === '0x') {
      throw new Error('Contract is not deployed on the connected network.');
    }
  }

  async function transfer(to: string, amount: string): Promise<TransferResult> {
    try {
      setIsTransferring(true);

      // Validate inputs
      if (!to || !amount) {
        return { success: false, error: 'Recipient address and amount are required' };
      }

      if (!isAddress(to)) {
        return { success: false, error: 'Invalid recipient address' };
      }

      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        return { success: false, error: 'Amount must be a positive number' };
      }

      checkWalletConnection();

      let provider = new BrowserProvider((window as any).ethereum);
      provider = await ensureSepoliaNetwork(provider);
      const signer = await provider.getSigner();
      const userAddr = await signer.getAddress();

      const contract = new Contract(contractAddress, normalizedAbi, signer);
      const fhe = await initializeFHE();

      const amountWei = parseUnits(amount, 18);

      const input = fhe.createEncryptedInput(contractAddress, userAddr);
      input.add64(amountWei);
      const { handles, inputProof } = await input.encrypt();

      await assertContractDeployed(provider, contractAddress);

      // Sanity checks for encryption outputs
      if (!handles || !Array.isArray(handles) || !handles[0]) {
        throw new Error('Encryption failed: missing handle');
      }
      if (!inputProof) {
        throw new Error('Encryption failed: missing inputProof');
      }

      // Convert handle and inputProof to 0x hexadecimal explicitly
      const handleHex = hexlify(handles[0]);
      const proofHex = hexlify(inputProof);

      // Encode using explicit Interface (consistent with on-chain signature: bytes32, bytes)
      const iface = new Interface(['function transfer(address to, bytes32 amount, bytes proof) returns (bool)']);
      const data = iface.encodeFunctionData('transfer', [to, handleHex, proofHex]);
      if (!data || data === '0x') {
        throw new Error('Encoding failed: empty calldata for transfer');
      }
      console.debug('transfer calldata prefix:', data.slice(0, 10));
      console.debug('handle length:', handleHex.length, 'proof length:', proofHex.length);

      // Perform static call simulation (need to include from, otherwise FHE verification fails due to msg.sender mismatch)
      try {
        await provider.call({ from: userAddr, to: contractAddress, data });
      } catch (simErr: any) {
        console.error('Static call failed (preflight):', simErr);
        throw new Error('Transfer simulation failed. Please check inputs and network.');
      }

      const tx = await signer.sendTransaction({ to: contractAddress, data, gasLimit: 1200000, value: 0 });
      const receipt = await tx.wait();

      if (receipt.status === 0) {
        return { success: false, error: 'Transaction failed' };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Transfer failed:', err);

      let errorMessage = 'Transfer failed';
      if (typeof err?.shortMessage === 'string') {
        errorMessage = err.shortMessage;
      }
      if (err.code === 4001) {
        errorMessage = 'Transaction rejected by user';
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient funds for transaction';
      } else if (String(err?.message || '').includes('missing revert data')) {
        errorMessage = 'Execution reverted during gas estimation. Check network and inputs.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      return { success: false, error: errorMessage };
    } finally {
      setIsTransferring(false);
    }
  }

  async function getBalance(): Promise<string | null> {
    try {
      setIsLoadingBalance(true);
      checkWalletConnection();

      let provider = new BrowserProvider((window as any).ethereum);
      provider = await ensureSepoliaNetwork(provider);
      const signer = await provider.getSigner();
      const userAddr = await signer.getAddress();

      const contract = new Contract(contractAddress, normalizedAbi, signer);

      // Request balance access
      await assertContractDeployed(provider, contractAddress);
      const accessTx = await contract.requestBalanceAccess();
      await accessTx.wait();

      const encryptedBalance = await contract.balanceOf(userAddr);
      const handleHex = typeof encryptedBalance === 'string' ? encryptedBalance : hexlify(encryptedBalance);
      const fhe = await initializeFHE();

      // Switch to user decryption flow to avoid public decryption ACL restrictions
      const keypair = await fhe.generateKeypair();
      const nowSec = Math.floor(Date.now() / 1000);
      const startTimestamp = nowSec - 60; // Allow slight time drift
      const durationDays = 1; // Valid for 1 day

      const eip712 = await fhe.createEIP712(
        keypair.publicKey,
        [contractAddress],
        startTimestamp,
        durationDays
      );

      const signature = await (signer as any).signTypedData(
        eip712.domain,
        { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification },
        eip712.message
      );

      const result = await fhe.userDecrypt(
        [{ handle: handleHex, contractAddress }],
        keypair.privateKey,
        keypair.publicKey,
        signature,
        [contractAddress],
        userAddr,
        startTimestamp,
        durationDays
      );

      const value = result[handleHex];
      if (value === undefined || value === null) {
        throw new Error('Failed to decrypt balance');
      }
      return String(value);
    } catch (err: any) {
      console.error('Failed to get balance:', err);

      let errorMessage = 'Failed to retrieve balance';
      if (err.code === 4001) {
        errorMessage = 'Request rejected by user';
      } else if (err.message) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoadingBalance(false);
    }
  }

  return { transfer, getBalance, isTransferring, isLoadingBalance };
}


