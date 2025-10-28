# 🔧 FHE初始化失败 - 故障排查指南

## 问题描述

错误信息：
```
Failed to initialize FHE encryption. Please check your network connection and try again.
```

发生位置：Token页面，点击Transfer按钮时

---

## 🎯 可能的原因

### 1. 网络连接问题
FHE SDK需要连接到Zama的网关服务器

### 2. CORS/安全头问题
浏览器安全策略可能阻止了必要的请求

### 3. WASM加载问题
FHE库依赖WebAssembly，可能加载失败

### 4. MetaMask网络不匹配
MetaMask可能没有连接到Sepolia网络

---

## ✅ 解决方案

### 方案1: 检查浏览器控制台（最重要）

1. 打开浏览器开发者工具（F12）
2. 切换到Console标签
3. 刷新页面并尝试操作
4. 查看详细的错误信息

**查找关键信息：**
- 🔍 "Failed to initialize FHE SDK"
- 🔍 网络请求失败（红色）
- 🔍 CORS错误
- 🔍 WASM加载错误

---

### 方案2: 确认MetaMask连接到Sepolia

1. 打开MetaMask
2. 检查左上角网络是否为"Sepolia测试网络"
3. 如果不是，切换到Sepolia
4. 刷新页面并重试

---

### 方案3: 清除缓存并重启

```bash
# 停止开发服务器（Ctrl+C）

# 清除缓存
rm -rf node_modules/.vite
rm -rf dist

# 重启
npm run dev
```

---

### 方案4: 检查网络连接

测试能否访问Zama的服务：

```bash
# 测试网络连接
ping gateway.zama.ai

# 或在浏览器中访问
# https://gateway.zama.ai/health
```

---

### 方案5: 使用备用配置

如果Zama的默认网关不可用，可以尝试使用备用配置。

**编辑文件**: `src/utils/fhe.ts`

在`initializeFHE`函数中添加超时和重试逻辑。

---

## 🔍 调试步骤

### 第1步: 启用详细日志

代码已更新，现在会输出详细的初始化日志：

```
🔐 Initializing FHE SDK...
📡 Using Sepolia config: {...}
✅ SDK initialized
🔧 Creating FHE instance...
✅ FHE instance created successfully
```

如果卡在某一步，说明该步骤有问题。

### 第2步: 检查SepoliaConfig

在浏览器控制台输入：

```javascript
import('@zama-fhe/relayer-sdk/web').then(sdk => {
  console.log('Sepolia Config:', sdk.SepoliaConfig);
});
```

应该看到类似这样的输出：
```javascript
{
  chainId: 11155111,
  publicKey: "...",
  network: "...",
  // ... 其他配置
}
```

### 第3步: 手动测试FHE初始化

在浏览器控制台：

```javascript
// 1. 导入SDK
const { initSDK, createInstance, SepoliaConfig } = await import('@zama-fhe/relayer-sdk/web');

// 2. 初始化SDK
await initSDK();
console.log('SDK initialized');

// 3. 创建实例
const instance = await createInstance(SepoliaConfig);
console.log('Instance created:', instance);
```

---

## 🚑 临时解决方案

如果FHE初始化持续失败，可以暂时使用模拟模式进行开发测试：

### 选项1: 本地开发模拟

创建文件 `src/utils/fhe-mock.ts`:

```typescript
// 模拟FHE实例，仅用于开发测试
export async function initializeFHEMock() {
  return {
    createEncryptedInput: (contractAddr: string, userAddr: string) => ({
      add64: (value: bigint) => {},
      encrypt: async () => ({
        handles: ['0x' + '0'.repeat(64)],
        inputProof: '0x' + '0'.repeat(128)
      })
    }),
    publicDecrypt: async (values: any[]) => [BigInt(10)]
  };
}
```

**注意**: 这只是开发时的临时方案，不能用于生产环境！

---

## 📊 已知问题

### Issue 1: Zama网关在某些地区可能无法访问

**症状**: 长时间卡在"Creating FHE instance"
**解决**: 使用VPN或等待网络恢复

### Issue 2: CORS策略

**症状**: 控制台出现CORS错误
**解决**: 确保vite.config.ts中的CORS头配置正确

### Issue 3: WASM加载失败

**症状**: "Failed to load WASM module"
**解决**: 检查服务器MIME类型配置

---

## 📞 获取更多帮助

### 查看Zama官方文档
- https://docs.zama.ai/
- https://github.com/zama-ai/fhevm

### 检查SDK版本
```bash
npm list @zama-fhe/relayer-sdk
```

当前版本: 0.2.0

### 查看SDK示例
https://github.com/zama-ai/fhevm-react-template

---

## 🔄 下一步

完成故障排查后，请尝试：

1. ✅ 刷新页面
2. ✅ 重新连接MetaMask
3. ✅ 点击Transfer按钮
4. ✅ 查看控制台日志
5. ✅ 报告具体的错误信息

---

**记住**: FHE技术需要连接到Zama的基础设施，确保网络连接稳定！
