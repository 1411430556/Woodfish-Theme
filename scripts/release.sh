#!/bin/bash

# Woodfish Theme 发布脚本
echo "🚀 Woodfish Theme 发布脚本"
echo "================================"

# 检查Git状态
echo "📋 检查Git状态..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  工作目录不干净，请先提交或暂存更改"
    git status --short
    read -p "是否继续？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 运行发布前检查
echo "🔍 运行发布前检查..."
node scripts/pre-publish-check.js
if [ $? -ne 0 ]; then
    echo "❌ 发布前检查失败"
    exit 1
fi

# 获取版本号
VERSION=$(node -p "require('./package.json').version")
echo "📦 当前版本: $VERSION"

# 打包扩展
echo "📦 打包扩展..."
npm run package
if [ $? -ne 0 ]; then
    echo "❌ 打包失败"
    exit 1
fi

echo "✅ 扩展打包完成: woodfish-theme-$VERSION.vsix"

# 询问是否发布
echo "🌐 准备发布..."
echo "1. VSCode 市场发布"
echo "2. GitHub Release"
echo "3. 两者都发布"
echo "4. 仅打包，不发布"

read -p "请选择 (1-4): " -n 1 -r
echo

case $REPLY in
    1)
        echo "📤 发布到VSCode市场..."
        vsce publish
        ;;
    2)
        echo "📤 准备GitHub Release..."
        echo "请手动执行以下命令："
        echo "git add ."
        echo "git commit -m 'Release v$VERSION'"
        echo "git tag v$VERSION"
        echo "git push origin main --tags"
        echo "然后在GitHub上创建Release并上传 woodfish-theme-$VERSION.vsix"
        ;;
    3)
        echo "📤 发布到VSCode市场..."
        vsce publish
        echo "📤 准备GitHub Release..."
        git add .
        git commit -m "Release v$VERSION"
        git tag v$VERSION
        git push origin main --tags
        echo "✅ 请在GitHub上创建Release并上传 woodfish-theme-$VERSION.vsix"
        ;;
    4)
        echo "✅ 仅打包完成，跳过发布"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo "🎉 发布流程完成！"