#!/bin/bash

# 验证配置脚本

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================"
echo "验证 contracts/.env 配置"
echo "========================================"
echo ""

# 检查文件是否存在
if [ ! -f "contracts/.env" ]; then
    echo -e "${RED}❌ contracts/.env 文件不存在${NC}"
    echo ""
    echo "请运行: cp contracts/.env.example contracts/.env"
    exit 1
fi

echo -e "${GREEN}✅ contracts/.env 文件存在${NC}"

# 检查私钥是否配置
if grep -q "your_private_key_here" contracts/.env; then
    echo -e "${RED}❌ 私钥未配置（仍是默认值）${NC}"
    echo ""
    echo "请编辑 contracts/.env 文件，填入你的私钥"
    echo "编辑命令: nano contracts/.env"
    exit 1
fi

echo -e "${GREEN}✅ 私钥已配置（不是默认值）${NC}"

# 检查私钥格式
PRIVATE_KEY=$(grep "^PRIVATE_KEY=" contracts/.env | cut -d'=' -f2)

if [ -z "$PRIVATE_KEY" ]; then
    echo -e "${RED}❌ 私钥为空${NC}"
    exit 1
fi

# 检查是否包含0x前缀（不应该包含）
if [[ $PRIVATE_KEY == 0x* ]]; then
    echo -e "${RED}❌ 私钥不应包含0x前缀${NC}"
    echo ""
    echo "请去掉私钥开头的 0x"
    exit 1
fi

echo -e "${GREEN}✅ 私钥格式正确（无0x前缀）${NC}"

# 检查私钥长度（应该是64个字符）
KEY_LENGTH=${#PRIVATE_KEY}
if [ $KEY_LENGTH -ne 64 ]; then
    echo -e "${YELLOW}⚠️  警告: 私钥长度为 $KEY_LENGTH 字符（标准为64字符）${NC}"
else
    echo -e "${GREEN}✅ 私钥长度正确（64字符）${NC}"
fi

# 检查RPC URL
if grep -q "SEPOLIA_RPC_URL=" contracts/.env; then
    echo -e "${GREEN}✅ RPC URL已配置${NC}"
else
    echo -e "${RED}❌ RPC URL未配置${NC}"
    exit 1
fi

echo ""
echo "========================================"
echo -e "${GREEN}✅ 配置验证通过！${NC}"
echo "========================================"
echo ""
echo "下一步: 运行部署命令"
echo "  cd contracts"
echo "  npx hardhat run scripts/deploy.ts --network sepolia"
echo ""

exit 0
