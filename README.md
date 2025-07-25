# Woodfish Theme

一个优雅的 VSCode 渐变主题，提供现代化的视觉体验和舒适的编程环境。

![Woodfish Theme](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![VSCode](https://img.shields.io/badge/VSCode-%5E1.74.0-blue.svg)

## ✨ 特性

- 🎨 **渐变设计**: 精心设计的渐变色彩，提供视觉层次感
- 🌙 **深色主题**: 护眼的深色配色方案，适合长时间编程
- ☀️ **浅色主题**: 清新的浅色配色方案，适合白天使用
- 🎯 **语法高亮**: 优化的代码语法高亮，提高代码可读性
- 🔧 **自定义配置**: 支持用户自定义样式配置
- 🚀 **性能优化**: 轻量级设计，不影响编辑器性能
- 🔄 **自动更新**: VSCode 更新后自动重新应用主题

## 📦 安装

### 方法一：从 VSCode 扩展市场安装

1. 打开 VSCode
2. 按 `Ctrl+Shift+X` 打开扩展面板
3. 搜索 "Woodfish Theme"
4. 点击安装

### 方法二：手动安装

1. 下载最新的 `.vsix` 文件
2. 在 VSCode 中按 `Ctrl+Shift+P` 打开命令面板
3. 输入 `Extensions: Install from VSIX...`
4. 选择下载的 `.vsix` 文件

## 🚀 使用方法

### 启用主题

1. 安装扩展后，按 `Ctrl+Shift+P` 打开命令面板
2. 输入 `Woodfish Theme: 启用 Woodfish Theme`
3. 选择并执行命令
4. 重启 VSCode 以应用更改

### 禁用主题

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 `Woodfish Theme: 禁用 Woodfish Theme`
3. 选择并执行命令
4. 重启 VSCode 以应用更改

### 选择颜色主题

1. 按 `Ctrl+K Ctrl+T` 打开主题选择器
2. 选择 "Woodfish Dark" 或 "Woodfish Light"

## ⚙️ 配置

在 VSCode 设置中，您可以自定义 Woodfish Theme 的行为：

```json
{
  "woodfishTheme.customStyles": [
    {
      "name": "自定义样式",
      "css": "/* 您的自定义 CSS */",
      "enabled": true
    }
  ],
  "woodfishTheme.autoApplyOnUpdate": true
}
```

### 配置选项

- `woodfishTheme.customStyles`: 自定义 CSS 样式数组
- `woodfishTheme.autoApplyOnUpdate`: VSCode 更新后是否自动重新应用主题

## 🎨 主题预览

### Woodfish Dark 主题
![Woodfish Dark Theme Preview](images/preview-dark.png)

### Woodfish Light 主题
![Woodfish Light Theme Preview](images/preview-light.png)

## 🛠️ 开发

### 环境要求

- Node.js >= 16.0.0
- VSCode >= 1.74.0

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/woodfish/Woodfish-Theme.git
cd Woodfish-Theme

# 安装依赖
npm install

# 编译扩展
npm run compile

# 打包扩展
npm run package-extension
```

### 调试

1. 在 VSCode 中打开项目
2. 按 `F5` 启动调试会话
3. 在新的 VSCode 窗口中测试扩展

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### [1.0.0] - 2024-01-01

#### 新增
- 初始版本发布
- Woodfish Dark 主题
- Woodfish Light 主题
- 渐变样式支持
- 自定义配置支持
- 自动更新功能

## 🐛 问题反馈

如果您遇到任何问题或有改进建议，请：

1. 查看 [常见问题](https://github.com/woodfish/Woodfish-Theme/wiki/FAQ)
2. 搜索现有的 [Issues](https://github.com/woodfish/Woodfish-Theme/issues)
3. 如果问题未被报告，请 [创建新的 Issue](https://github.com/woodfish/Woodfish-Theme/issues/new)

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详细信息。

## 🙏 致谢

- 感谢 VSCode 团队提供优秀的编辑器平台
- 感谢所有贡献者和用户的支持
- 灵感来源于现代设计趋势和用户体验最佳实践

## 📞 联系方式

- 作者：Woodfish
- 邮箱：woodfish@example.com
- GitHub：[@woodfish](https://github.com/woodfish)

---

⭐ 如果这个主题对您有帮助，请给我们一个星标！

![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)