/**
 * Environment configuration with validation
 * Ensures all required environment variables are present at runtime
 */

interface EnvConfig {
  contractAddress: string;
  sepoliaChainId: number;
  sepoliaRpcUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

function getEnvVar(key: string, required: boolean = true): string {
  const value = import.meta.env[key];

  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please check your .env file and ensure ${key} is set.`
    );
  }

  return value || '';
}

function validateConfig(config: EnvConfig): void {
  const isPlaceholder = config.contractAddress === '0x0000000000000000000000000000000000000000';

  // Validate contract address format
  if (config.contractAddress && !/^0x[a-fA-F0-9]{40}$/.test(config.contractAddress)) {
    console.warn(
      '⚠️ Warning: VITE_CONTRACT_ADDRESS appears to be invalid. ' +
      'Expected format: 0x followed by 40 hexadecimal characters'
    );
  }

  // Warn about placeholder address in development
  if (isPlaceholder && config.isDevelopment) {
    console.warn(
      '⚠️ Development Mode: Using placeholder contract address.\n' +
      'To use real contract features:\n' +
      '1. Deploy contract: cd contracts && npx hardhat run scripts/deploy.ts --network sepolia\n' +
      '2. Update VITE_CONTRACT_ADDRESS in .env file\n' +
      '3. Restart dev server'
    );
  }

  // Error if using placeholder in production
  if (isPlaceholder && config.isProduction) {
    throw new Error(
      '❌ Production Error: Cannot use placeholder contract address in production.\n' +
      'Please deploy the contract and set VITE_CONTRACT_ADDRESS in your environment variables.'
    );
  }

  // Validate chain ID
  if (config.sepoliaChainId !== 11155111) {
    console.warn(
      `⚠️ Warning: VITE_SEPOLIA_CHAIN_ID is ${config.sepoliaChainId}, ` +
      'expected 11155111 for Sepolia testnet'
    );
  }

  // Validate RPC URL format
  if (config.sepoliaRpcUrl && !config.sepoliaRpcUrl.startsWith('http')) {
    throw new Error('VITE_SEPOLIA_RPC_URL must be a valid HTTP(S) URL');
  }
}

// Load and validate environment configuration
const config: EnvConfig = {
  contractAddress: getEnvVar('VITE_CONTRACT_ADDRESS', true),
  sepoliaChainId: parseInt(getEnvVar('VITE_SEPOLIA_CHAIN_ID', false) || '11155111', 10),
  sepoliaRpcUrl: getEnvVar('VITE_SEPOLIA_RPC_URL', false) || 'https://ethereum-sepolia-rpc.publicnode.com',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate configuration
validateConfig(config);

// Log configuration in development mode (without sensitive data)
if (config.isDevelopment) {
  console.log('Environment Configuration:', {
    contractAddress: config.contractAddress,
    chainId: config.sepoliaChainId,
    rpcUrl: config.sepoliaRpcUrl,
    mode: config.isDevelopment ? 'development' : 'production',
  });
}

export default config;
