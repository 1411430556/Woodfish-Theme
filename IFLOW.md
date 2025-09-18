# Woodfish Theme - VSCode 主题扩展

## 项目概述

Woodfish Theme 是一个为 Visual Studio Code 设计的现代化主题扩展，具有彩虹光标、发光效果、渐变色彩和透明UI等特色功能。该项目采用模块化CSS架构，支持独立控制各种视觉效果，提供沉浸式的编码体验。当前版本为 v3.3.0，是一个稳定版本，专注于提供可靠的主题体验。

### 主要特色
- 🌈 **彩虹光标**: 动态变化的彩虹渐变光标动画
- ✨ **发光效果**: 代码关键字和行号发光效果
- 🎨 **渐变色彩**: 精心设计的语法高亮配色方案
- 🔍 **透明UI**: 现代化的半透明菜单和悬停效果
- 📊 **活动栏动画**: 选中标签的渐变边框动画
- 🎯 **模块化设计**: 可按需自定义的模块化CSS架构
- 🎛️ **独立控制**: 各效果可独立开关（发光、毛玻璃、彩色光标）
- 🔄 **智能配置**: 自动管理Custom CSS扩展配置

## 项目结构

```
C:\Users\woodfish\Desktop\woodfish theme\
├───.env.example                 # 环境变量示例
├───.gitignore                  # Git忽略文件
├───.vscodeignore              # VSCode扩展忽略文件
├───CHANGELOG.md               # 更新日志
├───CONTRIBUTING.md            # 贡献指南
├───extension.js               # 扩展主文件（核心逻辑）
├───index.css                  # 主样式文件
├───LICENSE                    # MIT许可证
├───MODIFICATION_SUMMARY.md    # 修改摘要（架构变更记录）
├───package-lock.json          # NPM依赖锁文件
├───package.json               # 扩展配置和依赖
├───README.en.md               # 英文文档
├───README.md                  # 中文文档（主要）
├───woodfish theme.json        # 主题配置文件
├───.codebuddy\                # CodeBuddy分析工具
│   ├───analysis-summary.json
│   └───rules\
├───.git\                      # Git仓库
├───.github\                   # GitHub配置
│   ├───pull_request_template.md
│   └───ISSUE_TEMPLATE\
│       ├───bug_report.md
│       └───feature_request.md
├───custom-css\                # 自定义CSS文件
│   ├───cursor-loader.css      # 光标加载器样式
│   └───rainbow-cursor.css     # 彩虹光标样式
├───images\                    # 图片资源
│   ├───head.jpg               # 扩展图标
│   ├───icon.svg               # 主题图标
│   ├───img1.png               # 预览图1
│   ├───img2.png               # 预览图2
│   └───preview-info.md        # 预览信息
├───node_modules\              # NPM依赖包
├───scripts\                   # 构建和发布脚本
│   ├───install-custom-css.sh  # 安装Custom CSS扩展脚本（Unix/Linux）
│   ├───pre-publish-check.js   # 发布前完整性检查脚本
│   ├───publish.js             # 发布流程脚本
│   └───release.sh             # 发布脚本（Unix/Linux）
└───themes\                    # 主题文件
    ├───woodfish-dark-color-theme.json      # 主题颜色配置
    ├───woodfish-theme-modular.css          # 模块化主题样式
    ├───woodfish-theme.css                   # 主主题样式
    └───modules\                              # 模块化CSS文件
        ├───activity-bar.css                  # 活动栏样式
        ├───cursor-animation.css              # 光标动画
        ├───glow-effects.css                  # 发光效果
        ├───syntax-highlighting.css           # 语法高亮
        ├───tab-bar.css                       # 标签栏样式
        ├───transparent-ui.css                # 透明UI
        └───variables.css                     # CSS变量定义
```

## 技术栈

- **语言**: JavaScript (Node.js)
- **平台**: Visual Studio Code 扩展
- **依赖管理**: NPM
- **CSS框架**: 自定义模块化CSS
- **扩展API**: VSCode Extension API
- **构建工具**: VSCE (Visual Studio Code Extension manager)
- **代码检查**: ESLint

## 核心功能

### 1. 主题管理
- **启用/禁用主题**: 通过 Custom CSS and JS Loader 扩展应用/移除主题样式
- **版本兼容性检查**: 自动检测VSCode版本变化并提示重新配置
- **依赖管理**: 自动检测并提示安装必要的扩展
- **智能配置**: 自动管理Custom CSS配置文件

### 2. 视觉效果控制
- **发光效果**: 可独立开关的代码发光效果
- **毛玻璃效果**: 透明UI和悬浮效果控制
- **彩色光标**: 彩虹渐变光标动画，支持自动配置

### 3. 模块化架构
- **变量系统**: 集中管理颜色和样式变量
- **模块分离**: 各功能模块独立，便于维护和定制
- **自定义样式**: 支持用户添加自定义CSS规则

## 开发指南

### 环境要求
- Node.js >= 16.0.0
- VSCode >= 1.74.0
- Git

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
# 在VSCode中按F5启动扩展开发主机
# 或手动打包测试
npm run package
```

### 构建和发布
```bash
# 发布前检查
npm run pre-publish

# 打包扩展
npm run package

# 清理打包文件
npm run clean

# 发布到市场
npm run publish
```

### 代码规范
- 使用ESLint进行代码检查 (`npm run lint`)
- 遵循VSCode扩展开发最佳实践
- 模块化CSS架构，避免样式冲突
- 完善的错误处理和用户提示
- 使用JSDoc注释规范

## 配置选项

### 扩展配置
```json
{
  "woodfishTheme.enableGlowEffects": true,     // 启用发光效果
  "woodfishTheme.enableGlassEffect": true,     // 启用毛玻璃效果
  "woodfishTheme.enableRainbowCursor": false,  // 启用彩色光标
  "woodfishTheme.customStyles": []             // 自定义样式数组
}
```

### 自定义样式
支持用户添加自定义CSS规则，格式如下：
```json
{
  "woodfishTheme.customStyles": [
    {
      "enabled": true,
      "css": "div.cursor { animation-duration: 20s !important; }"
    }
  ]
}
```

## 命令面板

扩展提供以下命令：
- `Woodfish Theme: 开启 Woodfish 主题` - 启用主题
- `Woodfish Theme: 关闭 Woodfish 主题` - 关闭主题
- `Woodfish Theme: 开启/关闭 Woodfish 发光` - 切换发光效果
- `Woodfish Theme: 启动彩色光标自动配置` - 配置彩色光标
- `Woodfish Theme: 开启/关闭毛玻璃效果` - 切换透明UI效果
- `Woodfish Theme: 开启/关闭彩色光标` - 切换彩色光标效果

## 文件说明

### 核心文件
- **extension.js**: 扩展主逻辑，包含命令注册、配置管理、依赖检查等
- **package.json**: 扩展配置，定义命令、设置、依赖等信息
- **themes/woodfish-dark-color-theme.json**: VSCode主题颜色配置

### 样式文件
- **themes/woodfish-theme.css**: 主主题样式文件
- **themes/woodfish-theme-modular.css**: 模块化主题样式
- **custom-css/rainbow-cursor.css**: 彩虹光标样式
- **themes/modules/**: 各功能模块的独立CSS文件

### 脚本文件
- **scripts/pre-publish-check.js**: 发布前完整性检查，验证项目结构
- **scripts/publish.js**: 发布流程脚本
- **scripts/install-custom-css.sh**: 自动安装依赖扩展脚本（Unix/Linux）
- **scripts/release.sh**: 发布脚本（Unix/Linux）

### 重要文档
- **MODIFICATION_SUMMARY.md**: 架构变更记录，详细说明从HTML注入到Custom CSS的转换
- **CHANGELOG.md**: 详细的版本更新日志
- **CONTRIBUTING.md**: 贡献指南

## 架构演进

### 重要架构变更
项目已从HTML文件注入方式完全转换为使用Custom CSS and JS Loader扩展的标准方式：

**v3.3.0 重要变更:**
- 🔄 **版本回档** - 回退到3.1.0稳定版本功能集
- 🛠️ **移除HTML注入** - 完全删除HTML文件修改相关代码
- ⚙️ **Custom CSS标准** - 采用VSCode推荐的Custom CSS扩展方式
- 🔧 **智能配置管理** - 自动管理Custom CSS配置文件

**架构优势:**
- ✅ 更稳定的主题应用方式
- ✅ 避免VSCode更新导致的兼容性问题
- ✅ 更好的用户体验和错误处理
- ✅ 符合VSCode扩展开发最佳实践

## 更新日志

### v3.3.0 (当前稳定版本) - 2025-08-28
- 🔄 **版本回档** - 回退到3.1.0稳定版本，移除实验性功能
- 📦 **稳定性优化** - 确保与各种VSCode版本的最佳兼容性
- 🎛️ **独立效果控制** - 毛玻璃效果独立开关
- 🌈 **彩色光标开关** - 一键切换彩色光标效果
- ⚙️ **智能配置管理** - 自动管理Custom CSS配置
- 🛠️ **架构清理** - 移除所有HTML注入相关代码

### v3.1.0 - 2025-08-27
- 🎛️ **独立效果控制** - 新增"开启/关闭毛玻璃效果"命令
- 🌈 **彩色光标管理** - 改进彩色光标开关逻辑
- ⚡ **性能优化** - 优化主题应用和移除流程

### v3.0.0 - 早期版本
- 🌈 **彩色光标自动配置** - 新增自动配置功能
- 📦 **智能依赖管理** - 自动检测和安装必要扩展
- 🔄 **跨平台支持** - 优化的跨平台兼容性

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 开发建议
- 遵循现有代码风格和架构模式
- 确保所有命令和配置选项正常工作
- 更新相关文档和变更日志
- 测试在不同VSCode版本上的兼容性

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 作者: Woodfish
- GitHub: [@woodfishhhh](https://github.com/woodfishhhh)
- Issues: [问题反馈](https://github.com/woodfishhhh/Woodfish-Theme/issues)
- 邮箱: 通过GitHub Issues联系

---

⭐ 如果这个主题对您有帮助，请给我们一个星标！

**最近更新:** 2025年9月18日