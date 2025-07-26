# 🚀 Woodfish Theme 发布检查清单

## 发布前检查

### 📋 必要文件检查
- [ ] `package.json` - 扩展配置完整
- [ ] `README.md` - 文档完善
- [ ] `LICENSE` - 许可证文件
- [ ] `CHANGELOG.md` - 更新日志
- [ ] `themes/woodfish-dark-color-theme.json` - 主题配置
- [ ] `themes/woodfish-theme-modular.css` - 模块化CSS
- [ ] `extension.js` - 扩展主文件
- [ ] `images/` - 预览图片

### 🎨 主题文件检查
- [ ] 所有模块CSS文件存在
- [ ] 主题配置JSON格式正确
- [ ] 颜色定义完整
- [ ] 语法高亮规则完整

### 📦 配置检查
- [ ] 版本号格式正确 (x.x.x)
- [ ] 发布者信息正确
- [ ] 关键词和描述优化
- [ ] 仓库链接正确
- [ ] 许可证信息正确

### 📚 文档检查
- [ ] README.md 包含所有必要章节
- [ ] 安装说明清晰
- [ ] 使用方法详细
- [ ] 预览图片存在且清晰
- [ ] 更新日志最新

### 🧪 功能测试
- [ ] 主题安装正常
- [ ] 主题切换正常
- [ ] 彩虹光标动画正常
- [ ] 发光效果正常
- [ ] 透明UI效果正常
- [ ] 语法高亮正常
- [ ] 自定义配置正常

## 发布流程

### 1. 自动检查
```bash
npm run pre-publish
```

### 2. 打包测试
```bash
npm run package
```

### 3. 本地测试
- 安装生成的.vsix文件
- 测试所有功能
- 验证主题效果

### 4. 发布到市场
```bash
# 登录VSCode市场
vsce login

# 发布扩展
npm run publish
```

### 5. GitHub发布
```bash
# 提交代码
git add .
git commit -m "Release v2.2.0"

# 创建标签
git tag v2.2.0

# 推送到远程
git push origin main --tags
```

### 6. 创建GitHub Release
- 在GitHub上创建新的Release
- 上传.vsix文件
- 添加发布说明
- 包含更新日志

## 发布后检查

### 📊 市场检查
- [ ] 扩展在VSCode市场可见
- [ ] 描述和截图正确显示
- [ ] 下载和安装正常
- [ ] 评分和评论监控

### 🔄 更新准备
- [ ] 更新版本号到下一个开发版本
- [ ] 创建下一版本的开发分支
- [ ] 更新项目看板和里程碑

## 紧急回滚

如果发现严重问题：

1. **从市场撤回**
```bash
vsce unpublish
```

2. **修复问题**
- 修复代码
- 更新版本号
- 重新测试

3. **重新发布**
```bash
npm run publish
```

## 联系信息

- 发布负责人: Woodfish
- 技术支持: 3053932588@qq.com
- 问题反馈: https://github.com/woodfish/woodfish-theme/issues