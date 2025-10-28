#!/usr/bin/env node

/**
 * Production Readiness Check Script
 *
 * This script checks if the project is ready for production deployment.
 * Run with: node scripts/check-production-ready.js
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let hasErrors = false;

function checkPassed(message) {
  checks.push({ status: '✓', message, type: 'success' });
}

function checkWarning(message) {
  checks.push({ status: '⚠', message, type: 'warning' });
}

function checkFailed(message) {
  checks.push({ status: '✗', message, type: 'error' });
  hasErrors = true;
}

console.log('\n🔍 Running Production Readiness Checks...\n');

// Check 1: Environment files exist
console.log('📋 Checking configuration files...');

if (fs.existsSync('.env.example')) {
  checkPassed('Root .env.example exists');
} else {
  checkFailed('Root .env.example is missing');
}

if (fs.existsSync('contracts/.env.example')) {
  checkPassed('Contracts .env.example exists');
} else {
  checkFailed('Contracts .env.example is missing');
}

// Check 2: .gitignore contains .env
console.log('🔒 Checking .gitignore...');

if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  if (gitignore.includes('.env') || gitignore.includes('*.env')) {
    checkPassed('.env files are in .gitignore');
  } else {
    checkFailed('.env files are NOT in .gitignore - SECURITY RISK!');
  }
} else {
  // In some CI/build environments (e.g., Vercel), dotfiles like .gitignore
  // may not be included in the deployment filesystem. Treat as warning there.
  if (process.env.VERCEL || process.env.CI) {
    checkWarning('.gitignore file is missing in build environment');
  } else {
    checkFailed('.gitignore file is missing');
  }
}

// Check 3: Package.json scripts
console.log('📦 Checking package.json scripts...');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredScripts = ['dev', 'build', 'preview', 'lint'];
requiredScripts.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    checkPassed(`Script "${script}" is defined`);
  } else {
    checkFailed(`Script "${script}" is missing`);
  }
});

// Check 4: TypeScript configuration
console.log('📝 Checking TypeScript configuration...');

if (fs.existsSync('tsconfig.json')) {
  checkPassed('tsconfig.json exists');

  if (fs.existsSync('tsconfig.app.json')) {
    try {
      // Read file and remove comments for JSON parsing
      const content = fs.readFileSync('tsconfig.app.json', 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*/g, ''); // Remove single-line comments
      const tsconfigApp = JSON.parse(content);

      if (tsconfigApp.compilerOptions?.strict === true) {
        checkPassed('TypeScript strict mode is enabled');
      } else {
        checkWarning('TypeScript strict mode is disabled');
      }
    } catch (e) {
      checkWarning('Could not parse tsconfig.app.json');
    }
  }
} else {
  checkFailed('tsconfig.json is missing');
}

// Check 5: Contract files
console.log('📄 Checking smart contract files...');

if (fs.existsSync('contracts/contracts/ERC7984Token.sol')) {
  checkPassed('ERC7984Token.sol exists');
} else {
  checkFailed('ERC7984Token.sol is missing');
}

if (fs.existsSync('contracts/scripts/deploy.ts')) {
  checkPassed('Deployment script exists');
} else {
  checkFailed('Deployment script is missing');
}

// Check 6: Required directories
console.log('📁 Checking project structure...');

const requiredDirs = [
  'src',
  'src/components',
  'src/pages',
  'src/hooks',
  'src/utils',
  'src/config',
  'contracts',
  'contracts/contracts',
  'contracts/scripts',
  'public'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    checkPassed(`Directory "${dir}" exists`);
  } else {
    checkFailed(`Directory "${dir}" is missing`);
  }
});

// Check 7: Security files
console.log('🛡️ Checking security configuration...');

if (fs.existsSync('public/_headers')) {
  checkPassed('Security headers file exists');
} else {
  checkWarning('Security headers file (public/_headers) is missing');
}

// Check 8: Documentation
console.log('📚 Checking documentation...');

if (fs.existsSync('README.md')) {
  const readme = fs.readFileSync('README.md', 'utf8');
  if (readme.length > 1000) {
    checkPassed('README.md is comprehensive');
  } else {
    checkWarning('README.md may be incomplete');
  }
} else {
  checkFailed('README.md is missing');
}

if (fs.existsSync('DEPLOYMENT.md')) {
  checkPassed('DEPLOYMENT.md exists');
} else {
  checkWarning('DEPLOYMENT.md is missing');
}

// Check 9: No .env files in repo
console.log('🔐 Checking for sensitive files...');

if (!fs.existsSync('.env')) {
  checkPassed('No .env file in repository (good)');
} else {
  checkWarning('.env file exists - ensure it is in .gitignore');
}

if (!fs.existsSync('contracts/.env')) {
  checkPassed('No contracts/.env file in repository (good)');
} else {
  checkWarning('contracts/.env file exists - ensure it is in .gitignore');
}

// Check 10: Source files exist
console.log('⚛️  Checking source files...');

const requiredSourceFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/utils/fhe.ts',
  'src/config/env.ts',
  'src/hooks/usePrivateToken.ts',
  'src/pages/Token.tsx'
];

requiredSourceFiles.forEach(file => {
  if (fs.existsSync(file)) {
    checkPassed(`${file} exists`);
  } else {
    checkFailed(`${file} is missing`);
  }
});

// Check 11: Vite config
console.log('⚡ Checking Vite configuration...');

if (fs.existsSync('vite.config.ts')) {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  if (viteConfig.includes('build')) {
    checkPassed('Vite build configuration exists');
  } else {
    checkWarning('Vite build configuration may be missing');
  }
} else {
  checkFailed('vite.config.ts is missing');
}

// Print results
console.log('\n' + '='.repeat(60));
console.log('📊 CHECK RESULTS');
console.log('='.repeat(60) + '\n');

const successChecks = checks.filter(c => c.type === 'success');
const warningChecks = checks.filter(c => c.type === 'warning');
const errorChecks = checks.filter(c => c.type === 'error');

console.log(`✓ Passed: ${successChecks.length}`);
console.log(`⚠ Warnings: ${warningChecks.length}`);
console.log(`✗ Failed: ${errorChecks.length}\n`);

// Print all checks
checks.forEach(check => {
  const color = check.type === 'success' ? '\x1b[32m' :
                check.type === 'warning' ? '\x1b[33m' : '\x1b[31m';
  const reset = '\x1b[0m';
  console.log(`${color}${check.status}${reset} ${check.message}`);
});

// Final verdict
console.log('\n' + '='.repeat(60));

if (hasErrors) {
  console.log('\n❌ PRODUCTION READINESS: FAILED');
  console.log('\nPlease fix the errors above before deploying to production.\n');
  process.exit(1);
} else if (warningChecks.length > 0) {
  console.log('\n⚠️  PRODUCTION READINESS: PASSED WITH WARNINGS');
  console.log('\nYou can deploy, but consider addressing the warnings above.\n');
  process.exit(0);
} else {
  console.log('\n✅ PRODUCTION READINESS: PASSED');
  console.log('\nYour project is ready for production deployment!\n');
  console.log('Next steps:');
  console.log('1. Deploy smart contract: cd contracts && npm run deploy:sepolia');
  console.log('2. Update VITE_CONTRACT_ADDRESS in .env');
  console.log('3. Build frontend: npm run build');
  console.log('4. Deploy to hosting platform\n');
  process.exit(0);
}
