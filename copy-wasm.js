import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create target directory
const publicDir = join(__dirname, 'public', 'wasm');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Copy WASM files
const wasmFiles = [
  'node_modules/@zama-fhe/relayer-sdk/bundle/kms_lib_bg.wasm',
  'node_modules/@zama-fhe/relayer-sdk/bundle/tfhe_bg.wasm'
];

wasmFiles.forEach(file => {
  const source = join(__dirname, file);
  const filename = file.split('/').pop();
  const dest = join(publicDir, filename);
  
  try {
    copyFileSync(source, dest);
    console.log(`✅ Copied ${filename}`);
  } catch (err) {
    console.error(`❌ Failed to copy ${filename}:`, err.message);
  }
});

console.log('✅ WASM files copied to public/wasm/');
