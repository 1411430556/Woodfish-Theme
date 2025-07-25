const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

/**
 * Woodfish Theme - 原创 VSCode 主题扩展
 * 作者：Woodfish
 * 许可证：MIT
 */

// 扩展配置
const EXTENSION_CONFIG = {
  name: 'woodfish-theme',
  displayName: 'Woodfish Theme',
  tagAttribute: 'data-woodfish-theme',
  versionKey: 'woodfish-theme-vscode-version',
  configSection: 'woodfishTheme'
}

// 全局上下文
let extensionContext = null

/**
 * 获取 VSCode 工作台 HTML 文件路径
 * 支持多种 VSCode 版本和 Cursor IDE
 */
function getWorkbenchHtmlPath() {
  const appDirectory = require.main ? path.dirname(require.main.filename) : globalThis._VSCODE_FILE_ROOT
  const baseDirectory = path.join(appDirectory, 'vs', 'code')
  
  const possiblePaths = [
    path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench.html'),
    path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench-apc-extension.html'),
    path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench.esm.html'),
    path.join(baseDirectory, 'electron-browser', 'workbench', 'workbench.esm.html'),
    path.join(baseDirectory, 'electron-browser', 'workbench', 'workbench.html')
  ]
  
  for (const htmlPath of possiblePaths) {
    if (fs.existsSync(htmlPath)) {
      return htmlPath
    }
  }
  
  return null
}

/**
 * 显示信息消息
 */
function showInfoMessage(message) {
  vscode.window.showInformationMessage(message)
}

/**
 * 显示重启提示消息
 */
function showReloadPrompt(message) {
  const reloadAction = '重新加载窗口'
  vscode.window
    .showInformationMessage(message, reloadAction)
    .then(selection => {
      if (selection === reloadAction) {
        vscode.commands.executeCommand('workbench.action.reloadWindow')
      }
    })
}

/**
 * 清理 HTML 文件中的主题样式
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
 */
function getCleanHtmlContent() {
  const htmlPath = getWorkbenchHtmlPath()
  
  if (!htmlPath || !fs.existsSync(htmlPath)) {
    showInfoMessage('Woodfish Theme 不支持当前平台或 VSCode 版本')
    return null
  }
  
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    return cleanThemeStyles(htmlContent)
  } catch (error) {
    showInfoMessage(`读取 HTML 文件失败: ${error.message}`)
    return null
  }
}

/**
 * 应用主题样式
 */
function applyTheme() {
  const htmlPath = getWorkbenchHtmlPath()
  const cleanHtml = getCleanHtmlContent()
  
  if (!cleanHtml) {
    return
  }
  
  try {
    // 获取用户配置
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const customStyles = themeConfiguration.get('customStyles', [])
    
    // 生成自定义样式 HTML
    const customStylesHtml = customStyles
      .filter(style => style.enabled)
      .map(style => `
        <style ${EXTENSION_CONFIG.tagAttribute}>
          ${style.css}
        </style>
      `)
      .join('')
    
    // 读取主题样式文件
    const themeStylePath = path.join(__dirname, 'themes', 'woodfish-theme.css')
    let themeStylesHtml = ''
    
    if (fs.existsSync(themeStylePath)) {
      const cssContent = fs.readFileSync(themeStylePath, 'utf-8')
      themeStylesHtml = `<style ${EXTENSION_CONFIG.tagAttribute}>${cssContent}</style>`
    }
const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

/**
 * Woodfish Theme - 原创 VSCode 主题扩展
 * 作者：Woodfish
 * 许可证：MIT
 */

// 扩展配置
const EXTENSION_CONFIG = {
  name: 'woodfish-theme',
  displayName: 'Woodfish Theme',
  tagAttribute: 'data-woodfish-theme',
  versionKey: 'woodfish-theme-vscode-version',
  configSection: 'woodfishTheme'
}

// 全局上下文
let extensionContext = null

/**
 * 获取 VSCode 工作台 HTML 文件路径
 * 支持多种 VSCode 版本和 Cursor IDE
 */
function getWorkbenchHtmlPath() {
  const appDirectory = require.main ? path.dirname(require.main.filename) : globalThis._VSCODE_FILE_ROOT
  const baseDirectory = path.join(appDirectory, 'vs', 'code')
  
  const possiblePaths = [
    path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench.html'),
    path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench-apc-extension.html'),
    path.join(baseDirectory, 'electron-sandbox', 'workbench', 'workbench.esm.html'),
    path.join(baseDirectory, 'electron-browser', 'workbench', 'workbench.esm.html'),
    path.join(baseDirectory, 'electron-browser', 'workbench', 'workbench.html')
  ]
  
  for (const htmlPath of possiblePaths) {
    if (fs.existsSync(htmlPath)) {
      return htmlPath
    }
  }
  
  return null
}

/**
 * 显示信息消息
 */
function showInfoMessage(message) {
  vscode.window.showInformationMessage(message)
}

/**
 * 显示重启提示消息
 */
function showReloadPrompt(message) {
  const reloadAction = '重新加载窗口'
  vscode.window
    .showInformationMessage(message, reloadAction)
    .then(selection => {
      if (selection === reloadAction) {
        vscode.commands.executeCommand('workbench.action.reloadWindow')
      }
    })
}

/**
 * 清理 HTML 文件中的主题样式
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
 */
function getCleanHtmlContent() {
  const htmlPath = getWorkbenchHtmlPath()
  
  if (!htmlPath || !fs.existsSync(htmlPath)) {
    showInfoMessage('Woodfish Theme 不支持当前平台或 VSCode 版本')
    return null
  }
  
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    return cleanThemeStyles(htmlContent)
  } catch (error) {
    showInfoMessage(`读取 HTML 文件失败: ${error.message}`)
    return null
  }
}

/**
 * 应用主题样式
 */
function applyTheme() {
  const htmlPath = getWorkbenchHtmlPath()
  const cleanHtml = getCleanHtmlContent()
  
  if (!cleanHtml) {
    return
  }
  
  try {
    // 获取用户配置
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const customStyles = themeConfiguration.get('customStyles', [])
    
    // 生成自定义样式 HTML
    const customStylesHtml = customStyles
      .filter(style => style.enabled)
      .map(style => `
        <style ${EXTENSION_CONFIG.tagAttribute}>
          ${style.css}
        </style>
      `)
      .join('')
    
    
    // 组合最终的 HTML 内容
    const finalHtml = cleanHtml.replace(
      '</html>', 
      customStylesHtml + themeStylesHtml + '</html>'
    )
    
    // 写入文件
    fs.writeFileSync(htmlPath, finalHtml, 'utf-8')
    
    // 更新版本状态
    updateVscodeVersion()
    
    showReloadPrompt('Woodfish Theme 已启用。VSCode 需要重新加载以应用更改。代码可能会显示损坏警告，这是正常的，您可以选择"不再显示"来忽略此通知。')
    
  } catch (error) {
    showInfoMessage(`应用主题失败: ${error.message}`)
  }
}

/**
 * 移除主题样式
 */
function removeTheme() {
  const htmlPath = getWorkbenchHtmlPath()
  const cleanHtml = getCleanHtmlContent()
  
  if (!cleanHtml) {
    return
  }
  
  try {
    fs.writeFileSync(htmlPath, cleanHtml, 'utf-8')
    showReloadPrompt('Woodfish Theme 已禁用。VSCode 需要重新加载以应用更改。')
  } catch (error) {
    showInfoMessage(`移除主题失败: ${error.message}`)
  }
}

/**
 * 注册扩展命令
 */
function registerCommands() {
  const enableCommand = vscode.commands.registerCommand('woodfish-theme.enable', applyTheme)
  const disableCommand = vscode.commands.registerCommand('woodfish-theme.disable', removeTheme)
  
  extensionContext.subscriptions.push(enableCommand, disableCommand)
}

/**
 * 获取存储的 VSCode 版本
 */
function getStoredVscodeVersion() {
  return extensionContext.globalState.get(EXTENSION_CONFIG.versionKey)
}

/**
 * 更新存储的 VSCode 版本
 */
function updateVscodeVersion() {
  const currentVersion = vscode.version.split('-')[0]
  extensionContext.globalState.update(EXTENSION_CONFIG.versionKey, currentVersion)
}

/**
 * 检查是否曾经安装过主题
 */
function wasThemeInstalled() {
  return Boolean(getStoredVscodeVersion())
}

/**
 * 初始化版本检查
 * 当 VSCode 更新时自动重新应用主题
 */
function initializeVersionCheck() {
  const currentVersion = vscode.version.split('-')[0]
  const storedVersion = getStoredVscodeVersion()
  
  // 如果版本不匹配且之前安装过主题，则自动重新应用
  if (currentVersion !== storedVersion && wasThemeInstalled()) {
    applyTheme()
  }
}

/**
 * 扩展激活函数
 */
function activate(context) {
  extensionContext = context
  
  // 注册命令
  registerCommands()
  
  // 初始化版本检查
  initializeVersionCheck()
  
  console.log('Woodfish Theme 扩展已激活')
}

/**
 * 扩展停用函数
 */
function deactivate() {
  console.log('Woodfish Theme 扩展已停用')
}

module.exports = {
  activate,
  deactivate
}