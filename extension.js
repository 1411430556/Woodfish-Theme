const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

/**
 * Woodfish Theme - 原创 VSCode 主题扩展
 * 作者：Woodfish
 * 许可证：MIT
 * 版本：2.0.0
 * 
 * 特别感谢：
 * - 感谢 shaobeichen 为本项目提供灵感
 * - 感谢 Bearded Theme 提供开源主题代码
 */

// ==================== 配置常量 ====================

const EXTENSION_CONFIG = {
  name: 'woodfish-theme',
  displayName: 'Woodfish Theme',
  tagAttribute: 'data-woodfish-theme',
  versionKey: 'woodfish-theme-vscode-version',
  configSection: 'woodfishTheme',
  themeFileName: 'woodfish-theme.css'
}

// ==================== 全局变量 ====================

let extensionContext = null

// ==================== 工具函数 ====================

/**
 * 获取 VSCode 工作台 HTML 文件路径
 * 支持多种 VSCode 版本和 Cursor IDE
 * @returns {string|null} HTML 文件路径或 null
 */
function getWorkbenchHtmlPath() {
  try {
    const appDirectory = require.main 
      ? path.dirname(require.main.filename) 
      : globalThis._VSCODE_FILE_ROOT
    
    if (!appDirectory) {
      return null
    }
    
    const baseDirectory = path.join(appDirectory, 'vs', 'code')
    
    // 按优先级排序的可能路径
    const possiblePaths = [
      path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench.html'),
      path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench-apc-extension.html'),
      path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench.esm.html'),
      path.join(baseDirectory, 'electron-browser', 'workbench', 'workbench.esm.html'),
      path.join(baseDirectory, 'electron-browser', 'workbench', 'workbench.html')
    ]
    
    // 查找第一个存在的文件
    for (const htmlPath of possiblePaths) {
      if (fs.existsSync(htmlPath)) {
        return htmlPath
      }
    }
    
    return null
  } catch (error) {
    console.error('获取工作台 HTML 路径时出错:', error)
    return null
  }
}

/**
 * 显示信息消息
 * @param {string} message 消息内容
 */
function showInfoMessage(message) {
  vscode.window.showInformationMessage(`[Woodfish Theme] ${message}`)
}

/**
 * 显示错误消息
 * @param {string} message 错误消息
 */
function showErrorMessage(message) {
  vscode.window.showErrorMessage(`[Woodfish Theme] ${message}`)
}

/**
 * 显示重启提示消息
 * @param {string} message 提示消息
 */
function showReloadPrompt(message) {
  const reloadAction = '重新加载窗口'
  const dismissAction = '稍后'
  
  vscode.window
    .showInformationMessage(`[Woodfish Theme] ${message}`, reloadAction, dismissAction)
    .then(selection => {
      if (selection === reloadAction) {
        vscode.commands.executeCommand('workbench.action.reloadWindow')
      }
    })
}

// ==================== HTML 处理函数 ====================

/**
 * 清理 HTML 文件中的主题样式
 * @param {string} htmlContent HTML 内容
 * @returns {string} 清理后的 HTML 内容
 */
function cleanThemeStyles(htmlContent) {
  const styleRegex = new RegExp(
    `<style[^>]*${EXTENSION_CONFIG.tagAttribute}[^>]*>.*?</style>|<script[^>]*${EXTENSION_CONFIG.tagAttribute}[^>]*>.*?</script>`,
    'gs'
  )
  return htmlContent.replace(styleRegex, '')
}

/**
 * 读取并清理 HTML 文件
 * @returns {string|null} 清理后的 HTML 内容或 null
 */
function getCleanHtmlContent() {
  const htmlPath = getWorkbenchHtmlPath()
  
  if (!htmlPath) {
    showErrorMessage('无法找到 VSCode 工作台 HTML 文件，可能不支持当前版本')
    return null
  }
  
  if (!fs.existsSync(htmlPath)) {
    showErrorMessage('VSCode 工作台 HTML 文件不存在')
    return null
  }
  
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    return cleanThemeStyles(htmlContent)
  } catch (error) {
    showErrorMessage(`读取 HTML 文件失败: ${error.message}`)
    return null
  }
}

/**
 * 生成自定义样式 HTML
 * @returns {string} 自定义样式 HTML
 */
function generateCustomStylesHtml() {
  try {
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const customStyles = themeConfiguration.get('customStyles', [])
    
    return customStyles
      .filter(style => style && style.enabled && style.css)
      .map(style => `
        <style ${EXTENSION_CONFIG.tagAttribute}>
          /* 用户自定义样式 */
          ${style.css}
        </style>
      `)
      .join('')
  } catch (error) {
    console.warn('生成自定义样式时出错:', error)
    return ''
  }
}

/**
 * 生成主题样式 HTML
 * @returns {string} 主题样式 HTML
 */
function generateThemeStylesHtml() {
  try {
    const themeStylePath = path.join(__dirname, 'themes', EXTENSION_CONFIG.themeFileName)
    
    if (!fs.existsSync(themeStylePath)) {
      console.warn('主题样式文件不存在:', themeStylePath)
      return ''
    }
    
    const cssContent = fs.readFileSync(themeStylePath, 'utf-8')
    return `
      <style ${EXTENSION_CONFIG.tagAttribute}>
        /* Woodfish Theme 主题样式 */
        ${cssContent}
      </style>
    `
  } catch (error) {
    console.error('读取主题样式文件时出错:', error)
    return ''
  }
}

// ==================== 主题操作函数 ====================

/**
 * 应用主题样式
 */
function applyTheme() {
  const htmlPath = getWorkbenchHtmlPath()
  const cleanHtml = getCleanHtmlContent()
  
  if (!htmlPath || !cleanHtml) {
    return
  }
  
  try {
    // 生成样式内容
    const customStylesHtml = generateCustomStylesHtml()
    const themeStylesHtml = generateThemeStylesHtml()
    
    if (!themeStylesHtml) {
      showErrorMessage('无法加载主题样式文件')
      return
    }
    
    // 组合最终的 HTML 内容
    const stylesHtml = customStylesHtml + themeStylesHtml
    const finalHtml = cleanHtml.replace('</html>', stylesHtml + '</html>')
    
    // 写入文件
    fs.writeFileSync(htmlPath, finalHtml, 'utf-8')
    
    // 更新版本状态
    updateVscodeVersion()
    
    showReloadPrompt(
      'Woodfish Theme 已成功启用！VSCode 需要重新加载以应用更改。' +
      '如果出现"损坏"警告，这是正常现象，可以选择"不再显示"来忽略。'
    )
    
  } catch (error) {
    showErrorMessage(`应用主题失败: ${error.message}`)
    console.error('应用主题时出错:', error)
  }
}

/**
 * 移除主题样式
 */
function removeTheme() {
  const htmlPath = getWorkbenchHtmlPath()
  const cleanHtml = getCleanHtmlContent()
  
  if (!htmlPath || !cleanHtml) {
    return
  }
  
  try {
    fs.writeFileSync(htmlPath, cleanHtml, 'utf-8')
    showReloadPrompt('Woodfish Theme 已成功禁用！VSCode 需要重新加载以应用更改。')
  } catch (error) {
    showErrorMessage(`移除主题失败: ${error.message}`)
    console.error('移除主题时出错:', error)
  }
}

// ==================== 版本管理函数 ====================

/**
 * 获取存储的 VSCode 版本
 * @returns {string|undefined} 存储的版本号
 */
function getStoredVscodeVersion() {
  return extensionContext?.globalState.get(EXTENSION_CONFIG.versionKey)
}

/**
 * 更新存储的 VSCode 版本
 */
function updateVscodeVersion() {
  if (!extensionContext) return
  
  try {
    const currentVersion = vscode.version.split('-')[0]
    extensionContext.globalState.update(EXTENSION_CONFIG.versionKey, currentVersion)
  } catch (error) {
    console.error('更新版本信息时出错:', error)
  }
}

/**
 * 检查是否曾经安装过主题
 * @returns {boolean} 是否安装过
 */
function wasThemeInstalled() {
  return Boolean(getStoredVscodeVersion())
}

/**
 * 初始化版本检查
 * 当 VSCode 更新时自动重新应用主题
 */
function initializeVersionCheck() {
  try {
    const currentVersion = vscode.version.split('-')[0]
    const storedVersion = getStoredVscodeVersion()
    
    // 如果版本不匹配且之前安装过主题，则自动重新应用
    if (currentVersion !== storedVersion && wasThemeInstalled()) {
      console.log('检测到 VSCode 版本更新，自动重新应用主题')
      applyTheme()
    }
  } catch (error) {
    console.error('版本检查时出错:', error)
  }
}

// ==================== 命令注册函数 ====================

/**
 * 注册扩展命令
 */
function registerCommands() {
  if (!extensionContext) return
  
  try {
    // 启用主题命令
    const enableCommand = vscode.commands.registerCommand(
      'woodfish-theme.enable', 
      () => {
        console.log('执行启用主题命令')
        applyTheme()
      }
    )
    
    // 禁用主题命令
    const disableCommand = vscode.commands.registerCommand(
      'woodfish-theme.disable', 
      () => {
        console.log('执行禁用主题命令')
        removeTheme()
      }
    )
    
    // 重新加载主题命令
    const reloadCommand = vscode.commands.registerCommand(
      'woodfish-theme.reload',
      () => {
        console.log('执行重新加载主题命令')
        removeTheme()
        setTimeout(() => applyTheme(), 100)
      }
    )
    
    // 注册到扩展上下文
    extensionContext.subscriptions.push(enableCommand, disableCommand, reloadCommand)
    
    console.log('主题命令注册成功')
  } catch (error) {
    console.error('注册命令时出错:', error)
  }
}

// ==================== 扩展生命周期函数 ====================

/**
 * 扩展激活函数
 * @param {vscode.ExtensionContext} context 扩展上下文
 */
function activate(context) {
  try {
    // 设置全局上下文
    extensionContext = context
    
    // 注册命令
    registerCommands()
    
    // 初始化版本检查
    initializeVersionCheck()
    
    console.log('Woodfish Theme 扩展已成功激活')
    
    // 显示激活消息（仅在开发模式下）
    if (context.extensionMode === vscode.ExtensionMode.Development) {
      showInfoMessage('扩展已在开发模式下激活')
    }
    
  } catch (error) {
    console.error('激活扩展时出错:', error)
    showErrorMessage(`扩展激活失败: ${error.message}`)
  }
}

/**
 * 扩展停用函数
 */
function deactivate() {
  try {
    console.log('Woodfish Theme 扩展已停用')
    
    // 清理全局变量
    extensionContext = null
    
  } catch (error) {
    console.error('停用扩展时出错:', error)
  }
}

// ==================== 模块导出 ====================

module.exports = {
  activate,
  deactivate
}