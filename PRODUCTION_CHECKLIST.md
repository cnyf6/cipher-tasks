# Production Deployment Checklist

Use this checklist before deploying to production to ensure everything is ready.

## Pre-Deployment Checklist

### Environment Configuration

- [ ] `.env.example` files are present in root and `contracts/` directories
- [ ] All required environment variables are documented
- [ ] `.env` files are listed in `.gitignore`
- [ ] Production environment variables are set on hosting platform

### Security

- [ ] No private keys or secrets in repository
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] Environment variable validation is in place
- [ ] Input validation implemented for all user inputs
- [ ] Error messages don't expose sensitive information

### Smart Contracts

- [ ] Contracts compiled successfully
- [ ] Contracts deployed to Sepolia testnet
- [ ] Contract address saved and documented
- [ ] Deployment information saved in `contracts/deployments/`
- [ ] Contract verified on Etherscan (optional but recommended)

### Code Quality

- [ ] TypeScript strict mode enabled
- [ ] No TypeScript errors
- [ ] ESLint passes without errors
- [ ] All unused imports removed
- [ ] Console.logs removed from production code (handled by build config)

### Functionality

- [ ] MetaMask connection works
- [ ] Token transfer functionality tested
- [ ] Balance retrieval functionality tested
- [ ] Error handling tested (invalid inputs, rejected transactions, etc.)
- [ ] Loading states work correctly
- [ ] Toast notifications display properly

### Build and Performance

- [ ] Production build completes successfully
- [ ] Build artifacts are optimized (minified, tree-shaken)
- [ ] Chunk sizes are reasonable (< 1MB per chunk)
- [ ] Images are optimized
- [ ] Lazy loading implemented where appropriate

### Documentation

- [ ] README.md is complete and up-to-date
- [ ] DEPLOYMENT.md contains accurate deployment instructions
- [ ] All environment variables are documented
- [ ] API/contract interactions are documented

### Testing

- [ ] Application tested in development mode
- [ ] Application tested in production build
- [ ] Tested on different browsers (Chrome, Firefox, Safari)
- [ ] Tested on mobile devices (responsive design)
- [ ] Network error handling tested

### Monitoring and Maintenance

- [ ] Error tracking configured (optional: Sentry, LogRocket)
- [ ] Analytics configured (optional: Google Analytics, Plausible)
- [ ] Backup of deployment information
- [ ] Rollback plan documented

## Post-Deployment Checklist

### Immediate Checks (within 1 hour)

- [ ] Site is accessible via production URL
- [ ] HTTPS is working
- [ ] MetaMask connects successfully
- [ ] At least one test transaction completed
- [ ] Error pages work correctly (404, etc.)
- [ ] Mobile view works correctly

### Extended Checks (within 24 hours)

- [ ] Monitor error logs for unexpected issues
- [ ] Check analytics for traffic patterns
- [ ] Verify all pages are accessible
- [ ] Check performance metrics (Lighthouse score)
- [ ] Test from different geographic locations

### Weekly Checks

- [ ] Review error logs
- [ ] Check for security updates: `npm audit`
- [ ] Monitor contract transactions on Etherscan
- [ ] Review user feedback

### Monthly Checks

- [ ] Update dependencies: `npm update`
- [ ] Security audit: `npm audit fix`
- [ ] Review and optimize performance
- [ ] Update documentation if needed

## Common Issues and Solutions

### Issue: Build Fails

**Symptoms**: Build command exits with errors

**Solutions**:
1. Clear cache: `rm -rf node_modules dist .vite && npm install`
2. Check TypeScript errors: `npx tsc --noEmit`
3. Fix any linting errors: `npm run lint`

### Issue: Environment Variables Not Working

**Symptoms**: App can't connect to contract

**Solutions**:
1. Verify variables start with `VITE_` prefix
2. Restart dev server after changing `.env`
3. Rebuild for production after env changes

### Issue: MetaMask Not Connecting

**Symptoms**: Wallet connection fails

**Solutions**:
1. Ensure site is on HTTPS in production
2. Check MetaMask is on Sepolia network
3. Clear browser cache and reload

### Issue: Contract Calls Failing

**Symptoms**: Transactions fail or revert

**Solutions**:
1. Verify contract address is correct
2. Ensure wallet has enough Sepolia ETH
3. Check if wallet is connected to Sepolia network
4. Review transaction on Etherscan for error details

## Performance Targets

Aim for these performance metrics:

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

Test using:
- Chrome DevTools Lighthouse
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## Security Best Practices

1. **Never commit sensitive data**
   - Private keys
   - API keys
   - Passwords

2. **Keep dependencies updated**
   - Run `npm audit` regularly
   - Update to patch security vulnerabilities

3. **Validate all inputs**
   - Client-side validation
   - Contract-side validation

4. **Use HTTPS**
   - Required for MetaMask
   - Protects user data

5. **Set security headers**
   - CSP (Content Security Policy)
   - X-Frame-Options
   - X-Content-Type-Options

## Deployment Commands Reference

```bash
# Install dependencies
npm install
cd contracts && npm install && cd ..

# Configure environment
cp .env.example .env
cp contracts/.env.example contracts/.env
# Edit both .env files

# Deploy contract
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
cd ..

# Update VITE_CONTRACT_ADDRESS in root .env

# Build frontend
npm run build

# Test production build locally
npm run preview

# Deploy to hosting platform
# (Vercel)
vercel --prod

# (Netlify)
netlify deploy --prod --dir=dist
```

## Support

If you encounter issues not covered in this checklist:

1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review the [README.md](./README.md) troubleshooting section
3. Check [Zama FHE Documentation](https://docs.zama.ai/)
4. Open an issue on GitHub

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
