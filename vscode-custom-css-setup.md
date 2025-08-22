# 使用 vscode-custom-css 扩展加载彩色光标

## 安装步骤

1. **安装 Custom CSS and JS Loader 扩展**
   - 在 VS Code 扩展市场搜索 `Custom CSS and JS Loader`
   - 或直接安装：`be5invis.vscode-custom-css`

2. **配置自定义 CSS 文件路径**
   
   在 VS Code 设置中添加以下配置：

   ```json
   {
     "vscode_custom_css.imports": [
       "file:///c:/Users/woodfish/Desktop/woodfish theme/custom-css/rainbow-cursor.css"
     ]
   }
   ```

   **注意：** 
   - 路径必须使用 `file://` 协议
   - Windows 路径需要使用正斜杠 `/`
   - 路径中的空格需要保持原样或使用 `%20` 编码

3. **启用自定义 CSS**
   - 按 `Ctrl+Shift+P` 打开命令面板
   - 执行命令：`Enable Custom CSS and JS`
   - 重启 VS Code

4. **验证效果**
   - 重启后，在编辑器中应该能看到彩色流动光标
   - 如果看到"不受支持"的警告，选择"不再显示"即可

## 替代路径配置方案

如果上述绝对路径不工作，可以尝试以下方案：

### 方案 A：使用相对路径（推荐）
```json
{
  "vscode_custom_css.imports": [
    "file:///c:/Users/woodfish/Desktop/woodfish%20theme/custom-css/rainbow-cursor.css"
  ]
}
```

### 方案 B：使用 HTTP 服务器
1. 在项目目录运行简单 HTTP 服务器：
   ```bash
   # Python 3
   python -m http.server 8080
   
   # Node.js (需要安装 http-server)
   npx http-server -p 8080
   ```

2. 配置使用 HTTP 路径：
   ```json
   {
     "vscode_custom_css.imports": [
       "http://localhost:8080/custom-css/rainbow-cursor.css"
     ]
   }
   ```

## 故障排除

1. **路径问题**
   - 确保文件路径正确且文件存在
   - Windows 用户注意使用正斜杠
   - 路径中的空格可能需要 URL 编码

2. **权限问题**
   - 确保 VS Code 有读取文件的权限
   - 某些企业环境可能阻止自定义 CSS

3. **缓存问题**
   - 完全重启 VS Code
   - 清除 VS Code 缓存：删除 `%APPDATA%/Code/User/workspaceStorage` 中相关文件

4. **扩展冲突**
   - 暂时禁用其他主题相关扩展测试
   - 确保没有其他扩展修改光标样式

## 优势

- ✅ 不需要修改 VS Code 安装文件
- ✅ 兼容性更好，支持各种 VS Code 版本
- ✅ 更新 VS Code 时不会丢失设置
- ✅ 可以轻松启用/禁用
- ✅ 支持热重载，修改 CSS 后刷新即可看到效果