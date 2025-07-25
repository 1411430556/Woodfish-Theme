# Woodfish Theme

一个优雅的 VSCode 渐变主题，提供现代化的视觉体验和舒适的编程环境。

![Woodfish Theme](https://img.shields.io/badge/version-1.0.0-blue.svg)  
![License](https://img.shields.io/badge/license-MIT-green.svg)  
![VSCode](https://img.shields.io/badge/VSCode-%5E1.74.0-blue.svg)  
![Downloads](https://img.shields.io/badge/downloads-0-orange.svg)

## ✨ 特性

- 🎨 **渐变设计**: 精心设计的渐变色彩，提供视觉层次感  
- 🌙 **深色主题**: 护眼的深色配色方案，适合长时间编程  
- ☀️ **浅色主题**: 清新的浅色配色方案，适合白天使用  
- 🎯 **语法高亮**: 优化的代码语法高亮，提高代码可读性  
- 🔧 **自定义配置**: 支持用户自定义样式配置  
- 🚀 **性能优化**: 轻量级设计，不影响编辑器性能  
- 🔄 **自动更新**: VSCode 更新后自动重新应用主题  
- 🌈 **彩虹光标**: 动态变化的彩虹光标效果，提升编码乐趣  
- ✨ **发光效果**: 代码关键字和行号发光效果，增强视觉体验  
- 🧩 **透明菜单**: 美观的半透明菜单设计，现代感十足

## 🖼️ 展示

![示例1](images/img1.png)  
![示例2](images/img2.png)

## 📦 安装

### 方法一：从 VSCode 扩展市场安装

1. 打开 VSCode  
2. 按 `Ctrl+Shift+X` 打开扩展面板  
3. 搜索 "Woodfish Theme"  
4. 点击安装

### 方法二：手动安装

1. 下载最新的 `.vsix` 文件（从 [Releases](https://github.com/woodfishhhh/Woodfish-Theme/releases) 页面）  
2. 在 VSCode 中按 `Ctrl+Shift+P` 打开命令面板  
3. 输入 `Extensions: Install from VSIX...`  
4. 选择下载的 `.vsix` 文件

### 兼容性说明

Woodfish Theme 已在以下环境中测试通过：  
- Windows 10/11  
- macOS 10.15+  
- Linux (Ubuntu 20.04+)  
- VSCode 1.74.0 及以上版本  
- Cursor IDE

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

### 重新加载主题

如果主题效果出现异常，您可以尝试重新加载主题：

1. 按 `Ctrl+Shift+P` 打开命令面板  
2. 输入 `Woodfish Theme: 重新加载 Woodfish Theme`  
3. 选择并执行命令  
4. 重启 VSCode 以应用更改

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

### 自定义样式示例

```json
{
  "woodfishTheme.customStyles": [
    {
      "name": "增强光标效果",
      "css": "div.cursor { box-shadow: 0 0 20px rgba(255, 255, 255, 0.9) !important; }",
      "enabled": true
    },
    {
      "name": "调整字体粗细",
      "css": "span.mtk1 { font-weight: 500 !important; }",
      "enabled": true
    },
    {
      "name": "自定义背景色",
      "css": ".monaco-editor { background-color: #1a1a2e !important; }",
      "enabled": false
    }
  ]
}
```

## 🛠️ 开发

### 环境要求

- Node.js >= 16.0.0  
- VSCode >= 1.74.0  
- Git

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/woodfishhhh/Woodfish-Theme.git
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
- 彩虹光标效果  
- 代码发光效果  
- 透明菜单设计  
- 活动标签栏动画效果

## 🐛 问题反馈

如果您遇到任何问题或有改进建议，请：

1. 查看 [常见问题](https://github.com/woodfishhhh/Woodfish-Theme/wiki/FAQ)  
2. 搜索现有的 [Issues](https://github.com/woodfishhhh/Woodfish-Theme/issues)  
3. 如果问题未被报告，请 [创建新的 Issue](https://github.com/woodfishhhh/Woodfish-Theme/issues/new)  
4. 在反馈中尽可能提供详细信息，包括：  
   - VSCode 版本  
   - 操作系统信息  
   - 问题的截图或录屏  
   - 复现步骤

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详细信息。

## 🙏 致谢

- 感谢 VSCode 团队提供优秀的编辑器平台  
- 感谢所有贡献者和用户的支持  
- 灵感来源于现代设计趋势和用户体验最佳实践  
- 特别感谢 shaobeichen 为本项目提供灵感  
- 感谢 Bearded Theme 提供开源主题代码参考

## 📞 联系方式

- 作者：Woodfish  
- 邮箱：3053932588@qq.com  
- GitHub：[@woodfishhhh](https://github.com/woodfishhhh)  
- 问题反馈：[Issues](https://github.com/woodfishhhh/Woodfish-Theme/issues)  
- 讨论区：[Discussions](https://github.com/woodfishhhh/Woodfish-Theme/discussions)

---

## 🔮 未来计划

我们计划在未来版本中添加以下功能：

- 更多主题变体（霓虹风格、赛博朋克风格等）  
- 自定义颜色选择器  
- 主题预设管理  
- 更多语言特定的语法高亮优化  
- 更多自定义选项

⭐ 如果这个主题对您有帮助，请给我们一个星标！  

![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)

# Woodfish Theme

An elegant VSCode gradient theme providing a modern visual experience and a comfortable coding environment.

![Woodfish Theme](https://img.shields.io/badge/version-1.0.0-blue.svg)  
![License](https://img.shields.io/badge/license-MIT-green.svg)  
![VSCode](https://img.shields.io/badge/VSCode-%5E1.74.0-blue.svg)  
![Downloads](https://img.shields.io/badge/downloads-0-orange.svg)

## ✨ Features

- 🎨 **Gradient Design**: Carefully designed gradients for enhanced visual depth  
- 🌙 **Dark Theme**: Eye-friendly dark palette, suitable for long coding sessions  
- ☀️ **Light Theme**: Refreshing light palette, ideal for daytime use  
- 🎯 **Syntax Highlighting**: Optimized code highlighting for better readability  
- 🔧 **Custom Configuration**: Support for user-defined style settings  
- 🚀 **Performance Optimized**: Lightweight design that doesn't affect editor performance  
- 🔄 **Auto-update**: Automatically reapplies the theme after VSCode updates  
- 🌈 **Rainbow Cursor**: Dynamic rainbow cursor effect for coding fun  
- ✨ **Glow Effect**: Keyword and line number glow for enhanced visuals  
- 🧩 **Transparent Menus**: Sleek semi-transparent menu design with modern feel

## 🖼️ Showcase

![Example 1](images/img1.png)  
![Example 2](images/img2.png)

## 📦 Installation

### Method 1: Install from VSCode Marketplace

1. Open VSCode  
2. Press `Ctrl+Shift+X` to open Extensions panel  
3. Search for "Woodfish Theme"  
4. Click Install

### Method 2: Manual Installation

1. Download the latest `.vsix` file from the [Releases](https://github.com/woodfishhhh/Woodfish-Theme/releases) page  
2. In VSCode, press `Ctrl+Shift+P` to open the command palette  
3. Type `Extensions: Install from VSIX...`  
4. Select the downloaded `.vsix` file

### Compatibility

Woodfish Theme has been tested on:  
- Windows 10/11  
- macOS 10.15+  
- Linux (Ubuntu 20.04+)  
- VSCode 1.74.0 and above  
- Cursor IDE

## 🚀 Usage

### Enable Theme

1. After installing, press `Ctrl+Shift+P` to open the command palette  
2. Type `Woodfish Theme: Enable Woodfish Theme`  
3. Select and run the command  
4. Restart VSCode to apply changes

### Disable Theme

1. Press `Ctrl+Shift+P` to open the command palette  
2. Type `Woodfish Theme: Disable Woodfish Theme`  
3. Select and run the command  
4. Restart VSCode to apply changes

### Select Color Theme

1. Press `Ctrl+K Ctrl+T` to open the theme selector  
2. Choose "Woodfish Dark" or "Woodfish Light"

### Reload Theme

If you encounter issues with the theme, try reloading:

1. Press `Ctrl+Shift+P` to open the command palette  
2. Type `Woodfish Theme: Reload Woodfish Theme`  
3. Select and run the command  
4. Restart VSCode to apply changes

## ⚙️ Configuration

In VSCode settings you can customize Woodfish Theme:

```json
{
  "woodfishTheme.customStyles": [
    {
      "name": "Custom Style",
      "css": "/* Your custom CSS here */",
      "enabled": true
    }
  ],
  "woodfishTheme.autoApplyOnUpdate": true
}
```

### Configuration Options

- `woodfishTheme.customStyles`: Array of custom CSS style objects  
- `woodfishTheme.autoApplyOnUpdate`: Whether to auto-reapply the theme after updates

### Custom Style Examples

```json
{
  "woodfishTheme.customStyles": [
    {
      "name": "Enhanced Cursor Glow",
      "css": "div.cursor { box-shadow: 0 0 20px rgba(255, 255, 255, 0.9) !important; }",
      "enabled": true
    },
    {
      "name": "Adjust Font Weight",
      "css": "span.mtk1 { font-weight: 500 !important; }",
      "enabled": true
    },
    {
      "name": "Custom Background",
      "css": ".monaco-editor { background-color: #1a1a2e !important; }",
      "enabled": false
    }
  ]
}
```

## 🛠️ Development

### Requirements

- Node.js >= 16.0.0  
- VSCode >= 1.74.0  
- Git

### Local Development

```bash
# Clone repository
git clone https://github.com/woodfishhhh/Woodfish-Theme.git
cd Woodfish-Theme

# Install dependencies
npm install

# Compile extension
npm run compile

# Package extension
npm run package-extension
```

### Debugging

1. Open the project in VSCode  
2. Press `F5` to start a debug session  
3. Test the extension in the new VSCode window

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](CONTRIBUTING.md) for details.

### Contribution Workflow

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request

## 📝 Changelog

### [1.0.0] - 2024-01-01

#### Added
- Initial release  
- Woodfish Dark theme  
- Woodfish Light theme  
- Gradient style support  
- Custom configuration support  
- Auto-update feature  
- Rainbow cursor effect  
- Glow effect for code  
- Transparent menu design  
- Animated active tab bar

## 🐛 Feedback

If you encounter any issues or have suggestions, please:

1. Check the [FAQ](https://github.com/woodfishhhh/Woodfish-Theme/wiki/FAQ)  
2. Search existing [Issues](https://github.com/woodfishhhh/Woodfish-Theme/issues)  
3. If not reported, [open a new Issue](https://github.com/woodfishhhh/Woodfish-Theme/issues/new)  
4. Provide details:  
   - VSCode version  
   - OS information  
   - Screenshots or recordings  
   - Steps to reproduce

## 📄 License

This project is licensed under MIT License – see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgements

- Thanks to the VSCode team for an excellent editor platform  
- Thanks to all contributors and users for support  
- Inspired by modern design trends and UX best practices  
- Special thanks to shaobeichen for project inspiration  
- Thanks to Bearded Theme for open-source reference

## 📞 Contact

- Author: Woodfish  
- Email: 3053932588@qq.com  
- GitHub: [@woodfishhhh](https://github.com/woodfishhhh)  
- Issues: [Issues](https://github.com/woodfishhhh/Woodfish-Theme/issues)  
- Discussions: [Discussions](https://github.com/woodfishhhh/Woodfish-Theme/discussions)

---

## 🔮 Future Plans

Planned features for upcoming releases:

- More theme variants (Neon, Cyberpunk, etc.)  
- Custom color picker  
- Theme preset management  
- Language-specific syntax highlight optimizations  
- More customization options

⭐ If you find this theme helpful, please give it a star!

![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)