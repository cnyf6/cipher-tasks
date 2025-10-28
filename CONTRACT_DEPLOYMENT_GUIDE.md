# 智能合约部署完整流程

## 📋 目录
1. [部署前准备](#部署前准备)
2. [获取测试币](#获取测试币)
3. [配置环境](#配置环境)
4. [部署合约](#部署合约)
5. [验证部署](#验证部署)
6. [更新前端配置](#更新前端配置)
7. [常见问题](#常见问题)

---

## 🎯 部署前准备

### 1. 检查系统环境

```bash
# 检查Node.js版本（建议使用LTS版本）
node --version
# 建议版本: v20.x 或 v18.x

# 检查npm版本
npm --version

# 检查项目目录
pwd
# 应该在: /Users/zhuyingjie/code/zama/cipher-tasks-main
```

### 2. 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装合约依赖
cd contracts
npm install
cd ..
```

### 3. 准备MetaMask钱包

- ✅ 安装MetaMask浏览器扩展
- ✅ 创建或导入钱包
- ✅ 切换到Sepolia测试网络
- ✅ 导出私钥（用于部署）

**⚠️ 安全提示**: 
- 仅使用测试钱包的私钥
- 不要在生产环境使用测试私钥
- 不要将私钥提交到Git仓库

---

## 💰 获取测试币

### Sepolia测试币水龙头

1. **Alchemy Sepolia Faucet** (推荐)
   - 网址: https://sepoliafaucet.com/
   - 需要: Alchemy账号
   - 每日限额: 0.5 ETH

2. **Infura Sepolia Faucet**
   - 网址: https://www.infura.io/faucet/sepolia
   - 需要: Infura账号
   - 每日限额: 0.5 ETH

3. **QuickNode Faucet**
   - 网址: https://faucet.quicknode.com/ethereum/sepolia
   - 需要: Twitter账号
   - 每日限额: 0.1 ETH

### 所需金额
- **最低要求**: 0.01 ETH
- **推荐金额**: 0.05 ETH
- **用途**: 支付部署合约的Gas费用

### 验证余额

```bash
# 方法1: 在MetaMask中查看
# 切换到Sepolia网络，查看余额

# 方法2: 使用Etherscan
# 访问: https://sepolia.etherscan.io/
# 输入你的钱包地址查询
```

---

## ⚙️ 配置环境

### 1. 创建合约环境配置文件

```bash
# 进入contracts目录
cd contracts

# 复制环境变量模板
cp .env.example .env

# 编辑.env文件
nano .env  # 或使用你喜欢的编辑器
```

### 2. 配置私钥

在 `contracts/.env` 文件中填入以下内容：

```env
# Sepolia RPC URL (使用默认即可)
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# 你的MetaMask私钥（不包含0x前缀）
PRIVATE_KEY=your_private_key_here_without_0x_prefix
```

### 3. 获取私钥的步骤

1. 打开MetaMask
2. 点击右上角菜单 → 账户详情
3. 点击"导出私钥"
4. 输入密码
5. 复制私钥（去掉0x前缀）
6. 粘贴到 `.env` 文件

**示例**:
```
如果MetaMask显示: 0xabcd1234...
那么.env中填写: abcd1234...
```

### 4. 验证配置

```bash
# 检查.env文件是否存在
ls -la .env

# 确认.env不会被提交到Git
cat ../.gitignore | grep .env
# 应该看到: contracts/.env
```

---

## 🚀 部署合约

### 步骤1: 编译合约

```bash
# 确保在contracts目录
cd /Users/zhuyingjie/code/zama/cipher-tasks-main/contracts

# 清理之前的编译产物
rm -rf artifacts cache

# 编译合约
npx hardhat compile --force
```

**预期输出**:
```
Compiled 7 Solidity files successfully
Successfully generated 42 typings!
```

### 步骤2: 检查网络连接

```bash
# 测试RPC连接
curl -X POST https://ethereum-sepolia-rpc.publicnode.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### 步骤3: 运行部署脚本

```bash
# 执行部署
npx hardhat run scripts/deploy.ts --network sepolia
```

### 步骤4: 等待部署完成

**部署过程输出示例**:
```
Starting deployment process...
Deploying to network: sepolia (chainId: 11155111)
Deployer address: 0x1234...
Deployer balance: 0.05 ETH

Deploying ERC7984Token...
Waiting for deployment transaction to be mined...

✅ ERC7984Token deployed successfully!
📍 Contract address: 0xABCD1234567890ABCD1234567890ABCD12345678

Verifying deployment...
✅ Contract code verified

Testing contract...
Token name: Private Token
Token symbol: PRIV
Token decimals: 18

💾 Deployment info saved to: deployments/sepolia-1234567890.json

📝 Next steps:
1. Update your root .env file with:
   VITE_CONTRACT_ADDRESS=0xABCD1234567890ABCD1234567890ABCD12345678

2. Ensure your .env has:
   VITE_SEPOLIA_CHAIN_ID=11155111
   VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

3. Run 'npm run dev' to start the frontend

4. (Optional) Verify contract on Etherscan:
   npx hardhat verify --network sepolia 0xABCD... 10000000000000000000
```

### 步骤5: 保存合约地址

**重要**: 复制输出中的合约地址，格式如下：
```
0xABCD1234567890ABCD1234567890ABCD12345678
```

---

## ✅ 验证部署

### 1. 在Etherscan上查看

```bash
# 在浏览器中打开
https://sepolia.etherscan.io/address/<YOUR_CONTRACT_ADDRESS>
```

你应该能看到：
- ✅ 合约创建交易
- ✅ 合约字节码
- ✅ 初始交易记录

### 2. 本地验证

```bash
# 检查部署记录
ls -la contracts/deployments/
cat contracts/deployments/sepolia-*.json
```

部署信息应包含：
```json
{
  "network": "sepolia",
  "chainId": 11155111,
  "contractAddress": "0x...",
  "deployerAddress": "0x...",
  "deploymentTimestamp": "2025-...",
  "initialSupply": "10000000000000000000",
  "tokenName": "Private Token",
  "tokenSymbol": "PRIV",
  "tokenDecimals": 18
}
```

### 3. (可选) 在Etherscan上验证合约源码

```bash
cd contracts

# 验证合约
npx hardhat verify --network sepolia \
  <CONTRACT_ADDRESS> \
  10000000000000000000

# 示例
npx hardhat verify --network sepolia \
  0xABCD1234567890ABCD1234567890ABCD12345678 \
  10000000000000000000
```

**验证成功后**，你可以在Etherscan上看到：
- ✅ 合约源码
- ✅ ABI接口
- ✅ 读写功能界面

---

## 🔄 更新前端配置

### 1. 更新根目录.env文件

```bash
# 返回项目根目录
cd /Users/zhuyingjie/code/zama/cipher-tasks-main

# 编辑.env文件
nano .env
```

### 2. 填入合约地址

```env
# 将部署输出的合约地址填入这里
VITE_CONTRACT_ADDRESS=0xABCD1234567890ABCD1234567890ABCD12345678

# 确认以下配置正确
VITE_SEPOLIA_CHAIN_ID=11155111
VITE_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

### 3. 重新构建前端

```bash
# 重新构建（生产环境）
npm run build

# 或启动开发服务器
npm run dev
```

### 4. 验证前端连接

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:8080，你应该看到：
- ✅ 控制台不再显示占位符地址警告
- ✅ 可以连接MetaMask
- ✅ 可以查询余额
- ✅ 可以进行转账操作

---

## 🧪 测试合约功能

### 1. 连接MetaMask

1. 访问 http://localhost:8080
2. 切换MetaMask到Sepolia网络
3. 点击"连接钱包"按钮
4. 授权连接

### 2. 查看初始余额

```
部署者地址应该拥有 10 PRIV tokens
```

### 3. 测试转账

1. 创建另一个测试地址
2. 尝试转账少量代币（如0.1 PRIV）
3. 等待交易确认
4. 检查双方余额

### 4. 验证隐私保护

- 在Etherscan上查看交易
- 转账金额应该是加密的（不可见）
- 只有交易双方能解密查看金额

---

## ❌ 常见问题

### 问题1: 编译失败

**错误**: `Error: Cannot find module '@fhevm/solidity'`

**解决方案**:
```bash
cd contracts
rm -rf node_modules package-lock.json
npm install
```

---

### 问题2: 部署失败 - 余额不足

**错误**: `Error: insufficient funds for gas`

**解决方案**:
1. 检查钱包余额
2. 从水龙头获取更多测试币
3. 确认MetaMask连接到Sepolia网络

---

### 问题3: 私钥错误

**错误**: `Error: invalid private key`

**解决方案**:
1. 确认私钥不包含`0x`前缀
2. 确认私钥长度为64个字符
3. 重新从MetaMask导出私钥

---

### 问题4: RPC连接超时

**错误**: `Error: timeout of 20000ms exceeded`

**解决方案**:
```bash
# 尝试其他RPC节点
# 在 contracts/.env 中更新:
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/demo
# 或
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
```

---

### 问题5: 前端无法连接合约

**错误**: `Contract address appears to be invalid`

**解决方案**:
1. 确认合约地址格式正确（0x开头，40个十六进制字符）
2. 确认已重启开发服务器
3. 清除浏览器缓存

```bash
# 重启开发服务器
# 按 Ctrl+C 停止，然后
npm run dev
```

---

### 问题6: Gas估算失败

**错误**: `Error: cannot estimate gas`

**解决方案**:
1. 检查合约地址是否正确
2. 确认钱包有足够的ETH支付gas
3. 检查交易参数是否有效

---

## 📊 部署成本估算

### Sepolia测试网（当前）

| 项目 | Gas量 | 估算成本 |
|------|-------|---------|
| 合约部署 | ~2,000,000 | 0.02-0.05 ETH |
| transfer | ~150,000 | 免费（测试网） |
| approve | ~100,000 | 免费（测试网） |

### 以太坊主网（参考）

**⚠️ 注意**: 当前合约部署在Sepolia测试网，不要部署到主网！

| 项目 | Gas价格 | 估算成本（美元） |
|------|---------|----------------|
| 合约部署 | 50 Gwei | $200-500 |
| transfer | 50 Gwei | $10-20 |
| approve | 50 Gwei | $5-10 |

---

## 🎯 部署检查清单

### 部署前
- [ ] Node.js环境准备就绪
- [ ] contracts依赖已安装
- [ ] contracts/.env已配置
- [ ] 私钥已正确填入
- [ ] 钱包有足够测试币（≥0.05 ETH）
- [ ] MetaMask切换到Sepolia网络

### 部署中
- [ ] 合约编译成功
- [ ] 部署交易已提交
- [ ] 等待交易确认（1-2分钟）
- [ ] 记录合约地址

### 部署后
- [ ] 在Etherscan上验证部署
- [ ] 更新根目录.env文件
- [ ] 重启前端开发服务器
- [ ] 测试MetaMask连接
- [ ] 测试基本功能（查询余额）
- [ ] 测试转账功能

---

## 📞 获取帮助

### 文档资源
- [Zama FHE文档](https://docs.zama.ai/)
- [Hardhat文档](https://hardhat.org/docs)
- [Sepolia测试网信息](https://sepolia.dev/)

### 问题排查
1. 检查 [DEPLOYMENT.md](./DEPLOYMENT.md)
2. 查看 [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
3. 查看合约部署日志: `contracts/deployments/`

---

## 🎉 部署成功！

恭喜！如果你完成了所有步骤，你的隐私代币合约已经成功部署到Sepolia测试网。

### 下一步
1. 测试所有功能
2. 邀请其他人测试转账
3. 验证隐私保护特性
4. 准备生产环境部署计划

**预祝部署顺利！** 🚀
