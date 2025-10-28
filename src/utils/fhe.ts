// Declare global SDK interface
declare global {
  interface Window {
    relayerSDK?: {
      initSDK: () => Promise<void>;
      createInstance: (config: any) => Promise<any>;
      SepoliaConfig: any;
    };
  }
}

let fheInstance: any | null = null;
let initPromise: Promise<any> | null = null;

// Wait for SDK to be loaded
function waitForSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.relayerSDK) {
      resolve();
      return;
    }

    let attempts = 0;
    const maxAttempts = 100; // 10 seconds (increased for production environments)
    const interval = setInterval(() => {
      attempts++;
      if (window.relayerSDK) {
        clearInterval(interval);
        resolve();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for FHE SDK to load. Please refresh the page.'));
      }
    }, 100);
  });
}

export async function initializeFHE() {
  if (fheInstance) return fheInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      console.log('🔐 Initializing FHE SDK...');

      // Wait for SDK bundle to load
      console.log('⏳ Waiting for SDK bundle to load...');
      await waitForSDK();
      console.log('✅ SDK bundle loaded');

      const sdk = window.relayerSDK!;

      // Check if SDK exports are available
      if (!sdk.initSDK || !sdk.createInstance || !sdk.SepoliaConfig) {
        throw new Error('SDK exports not found. Please refresh the page.');
      }

      console.log('📡 Using Sepolia config:', sdk.SepoliaConfig);

      // Initialize the SDK with proper configuration
      await sdk.initSDK();
      console.log('✅ SDK initialized');

      // Create instance with Sepolia config
      console.log('🔧 Creating FHE instance...');
      const instance = await sdk.createInstance(sdk.SepoliaConfig);

      console.log('✅ FHE instance created successfully');
      fheInstance = instance;
      return instance;
    } catch (error) {
      // Reset promise so it can be retried
      initPromise = null;
      console.error('❌ Failed to initialize FHE SDK:', error);

      // Provide more detailed error message
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);

        throw new Error(
          `FHE initialization failed: ${error.message}\n\n` +
          'Possible solutions:\n' +
          '1. Refresh the page to ensure SDK bundle is loaded\n' +
          '2. Ensure you are connected to Sepolia network in MetaMask\n' +
          '3. Check your browser supports WebAssembly (most modern browsers do)\n' +
          '4. Verify your network connection is stable\n' +
          '5. Clear browser cache and restart development server'
        );
      }

      throw new Error(
        'Failed to initialize FHE encryption. Please refresh the page and try again.'
      );
    }
  })();

  return initPromise;
}

export function resetFHE() {
  fheInstance = null;
  initPromise = null;
}


