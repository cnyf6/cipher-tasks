#!/bin/bash

# 智能合约快速部署脚本
# 使用方法: chmod +x deploy-quick.sh && ./deploy-quick.sh

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# 打印标题
print_header() {
    echo ""
    echo "=========================================="
    echo -e "${BLUE}$1${NC}"
    echo "=========================================="
    echo ""
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 主函数
main() {
    print_header "🚀 智能合约部署向导"
    
    # 步骤1: 检查环境
    print_info "步骤1/6: 检查系统环境..."
    
    if ! command_exists node; then
        print_error "Node.js未安装！请先安装Node.js"
        exit 1
    fi
    print_success "Node.js 版本: $(node --version)"
    
    if ! command_exists npm; then
        print_error "npm未安装！请先安装npm"
        exit 1
    fi
    print_success "npm 版本: $(npm --version)"
    
    # 步骤2: 检查项目目录
    print_info "步骤2/6: 检查项目结构..."
    
    if [ ! -d "contracts" ]; then
        print_error "contracts目录不存在！请在项目根目录运行此脚本"
        exit 1
    fi
    print_success "项目结构正确"
    
    # 步骤3: 检查环境配置
    print_info "步骤3/6: 检查环境配置..."
    
    if [ ! -f "contracts/.env" ]; then
        print_warning "contracts/.env 文件不存在"
        echo ""
        read -p "是否要创建 contracts/.env 文件? (y/n) " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "创建 contracts/.env 文件..."
            cp contracts/.env.example contracts/.env
            print_success "已创建 contracts/.env"
            print_warning "请编辑 contracts/.env 文件，填入你的私钥"
            echo ""
            echo "使用命令: nano contracts/.env"
            echo "或在IDE中打开文件进行编辑"
            echo ""
            read -p "按回车键继续... (请先配置好私钥)" -r
        else
            print_error "部署需要 contracts/.env 文件"
            exit 1
        fi
    else
        print_success "环境配置文件存在"
        
        # 检查私钥是否配置
        if grep -q "your_private_key_here" contracts/.env; then
            print_error "私钥未配置！请编辑 contracts/.env 文件"
            echo ""
            echo "使用命令: nano contracts/.env"
            exit 1
        fi
    fi
    
    # 步骤4: 安装依赖
    print_info "步骤4/6: 检查并安装依赖..."
    
    if [ ! -d "contracts/node_modules" ]; then
        print_warning "contracts依赖未安装"
        read -p "是否要安装依赖? (y/n) " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "安装依赖中..."
            cd contracts
            npm install
            cd ..
            print_success "依赖安装完成"
        else
            print_error "部署需要安装依赖"
            exit 1
        fi
    else
        print_success "依赖已安装"
    fi
    
    # 步骤5: 编译合约
    print_info "步骤5/6: 编译智能合约..."
    
    cd contracts
    print_info "清理旧的编译产物..."
    rm -rf artifacts cache 2>/dev/null || true
    
    print_info "开始编译..."
    if npx hardhat compile --force; then
        print_success "合约编译成功"
    else
        print_error "合约编译失败"
        exit 1
    fi
    cd ..
    
    # 步骤6: 部署合约
    print_info "步骤6/6: 部署合约到Sepolia测试网..."
    
    echo ""
    print_warning "请确认以下信息："
    echo "  - 你的钱包已有足够的Sepolia测试币（≥0.05 ETH）"
    echo "  - 私钥已正确配置在 contracts/.env 文件中"
    echo "  - 你已连接到网络"
    echo ""
    read -p "确认开始部署? (y/n) " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "部署已取消"
        exit 0
    fi
    
    print_info "开始部署..."
    cd contracts
    
    if npx hardhat run scripts/deploy.ts --network sepolia; then
        print_success "🎉 合约部署成功！"
        echo ""
        print_header "📝 后续步骤"
        echo "1. 复制上面输出的合约地址"
        echo "2. 编辑根目录的 .env 文件"
        echo "3. 将合约地址填入 VITE_CONTRACT_ADDRESS"
        echo "4. 运行 'npm run dev' 启动前端"
        echo ""
        print_info "查看部署记录: ls -la contracts/deployments/"
        echo ""
    else
        print_error "部署失败，请检查错误信息"
        exit 1
    fi
    
    cd ..
}

# 运行主函数
main

exit 0
