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