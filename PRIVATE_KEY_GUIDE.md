# 🔑 私钥配置指南

## 📍 当前状态

✅ 配置文件已创建：`contracts/.env`  
❌ 需要填写：你的MetaMask私钥

---

## 📋 快速步骤

### 1️⃣ 从MetaMask获取私钥

```
MetaMask → 点击账户图标 → 账户详情 → 导出私钥 → 输入密码 → 复制
```

**私钥示例**：
```
0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

### 2️⃣ 编辑配置文件

在IDE中打开：
```
contracts/.env
```

或使用命令行：
```bash
nano contracts/.env
# 或
code contracts/.env
```

### 3️⃣ 填写私钥（去掉0x）

找到这一行：
```env
PRIVATE_KEY=your_private_key_here_without_0x_prefix
```

改为（**去掉0x前缀**）：
```env
PRIVATE_KEY=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

### 4️⃣ 验证配置

```bash
./verify-config.sh
```

---

## 🖼️ 详细图文步骤

### 步骤1: 打开MetaMask

1. 点击浏览器右上角的 **狐狸图标** 🦊
2. 如果已锁定，输入密码解锁

### 步骤2: 选择正确的网络和账户

1. 确保已切换到 **Sepolia测试网络**
   - 点击左上角网络下拉菜单
   - 选择 "Sepolia 测试网络"

2. 选择要用于部署的账户
   - 点击右上角的圆形账户图标
   - 选择你的测试账户

💡 **建议**: 使用专门的测试账户，不要使用主账户！

### 步骤3: 进入账户详情

1. 点击账户名称右边的 **三个点** `⋮`
2. 在弹出菜单中选择 **"账户详情"** (Account Details)

### 步骤4: 导出私钥

1. 在账户详情页面，点击 **"导出私钥"** (Export Private Key) 按钮
2. MetaMask会要求输入密码进行确认
3. 输入你的MetaMask密码
4. 点击 **"确认"** (Confirm) 按钮

⚠️ **警告**: 永远不要与他人分享你的私钥！

### 步骤5: 复制私钥

1. 私钥会以纯文本形式显示
2. 格式类似：`0xabcd...ef12`（64个十六进制字符 + 0x前缀）
3. 点击 **"复制到剪贴板"** 按钮
4. 或手动选中文本并复制

### 步骤6: 粘贴私钥到配置文件

1. 打开 `contracts/.env` 文件

2. 找到这一行：
   ```env
   PRIVATE_KEY=your_private_key_here_without_0x_prefix
   ```

3. 将其替换为你的私钥（**重要：删除开头的 0x**）

   **错误示例** ❌:
   ```env
   PRIVATE_KEY=0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
   ```

   **正确示例** ✅:
   ```env
   PRIVATE_KEY=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
   ```

4. 保存文件（Ctrl+S 或 Cmd+S）

---

## ✅ 验证配置

运行验证脚本：

```bash
./verify-config.sh
```

**预期输出**：
```
========================================
验证 contracts/.env 配置
========================================

✅ contracts/.env 文件存在
✅ 私钥已配置（不是默认值）
✅ 私钥格式正确（无0x前缀）
✅ 私钥长度正确（64字符）
✅ RPC URL已配置

========================================
✅ 配置验证通过！
========================================

下一步: 运行部署命令
  cd contracts
  npx hardhat run scripts/deploy.ts --network sepolia
```

---

## 🔒 安全提示

### ✅ 应该做的：
- ✅ 使用专门的测试账户
- ✅ 确保 `.env` 文件已在 `.gitignore` 中
- ✅ 部署后立即删除或更改私钥
- ✅ 定期检查 `.env` 文件权限

### ❌ 不应该做的：
- ❌ 不要使用主账户的私钥
- ❌ 不要将私钥提交到Git
- ❌ 不要与他人分享私钥
- ❌ 不要在公共场合展示私钥
- ❌ 不要在生产环境使用测试私钥

---

## 📂 文件位置

```
cipher-tasks-main/
├── contracts/
│   ├── .env.example     ← 模板文件（可以提交到Git）
│   └── .env            ← 你的配置文件（不会提交到Git）
└── .gitignore          ← 确保包含 contracts/.env
```

---

## ❓ 常见问题

### Q1: 找不到"导出私钥"选项？

**A**: 确保你：
1. 已解锁MetaMask
2. 进入了"账户详情"页面（不是设置页面）
3. 使用的是最新版本的MetaMask

### Q2: 私钥应该包含0x吗？

**A**: 不应该！
- MetaMask显示：`0xabcd...`
- .env中填写：`abcd...`（去掉0x）

### Q3: 私钥多长？

**A**: 64个十六进制字符（不包含0x前缀）

### Q4: 如何确认私钥正确？

**A**: 运行验证脚本：
```bash
./verify-config.sh
```

### Q5: 部署失败提示"invalid private key"？

**A**: 检查：
1. 是否去掉了0x前缀
2. 私钥长度是否为64字符
3. 是否有多余的空格或换行

---

## 🚀 下一步

配置完成后，你可以：

### 选项1: 使用快速部署脚本
```bash
./deploy-quick.sh
```

### 选项2: 手动部署
```bash
cd contracts
npx hardhat run scripts/deploy.ts --network sepolia
```

---

## 💰 部署前最后检查

- [ ] ✅ 私钥已填写到 `contracts/.env`
- [ ] ✅ 私钥已去掉0x前缀
- [ ] ✅ 钱包已切换到Sepolia网络
- [ ] ✅ 钱包有足够的Sepolia ETH（≥0.05 ETH）
- [ ] ✅ 运行 `./verify-config.sh` 验证通过

---

**准备好了？开始部署吧！** 🎉

```bash
./deploy-quick.sh
```
