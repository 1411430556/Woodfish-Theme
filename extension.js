const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

/**
 * Woodfish Theme - 原创 VSCode 主题扩展
 * 作者：Woodfish
 * 许可证：MIT
 * 版本：3.0.0
 * 
 * 更新内容：修复更新了彩色光标
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
  themeFileName: 'woodfish-theme.css',
  customCssConfigKey: 'vscode_custom_css.imports'
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
 * 验证发光效果状态是否与配置一致
 * @returns {boolean} 状态是否一致
 */
function validateGlowEffectsState() {
  try {
    const htmlPath = getWorkbenchHtmlPath()
    if (!htmlPath || !fs.existsSync(htmlPath)) {
      console.warn('无法验证发光效果状态：HTML文件不存在')
      return false
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const configGlowState = themeConfiguration.get('enableGlowEffects', true)
    
    // 检查HTML中是否包含发光效果样式
    const hasGlowEffectsInHtml = htmlContent.includes('/* Woodfish Theme 发光效果样式 */')
    
    console.log(`发光效果状态验证: 配置=${configGlowState}, HTML中存在=${hasGlowEffectsInHtml}`)
    
    return configGlowState === hasGlowEffectsInHtml
  } catch (error) {
    console.error('验证发光效果状态时出错:', error)
    return false
  }
}

/**
 * 生成发光效果样式 HTML
 * @returns {string} 发光效果样式 HTML
 */
function generateGlowEffectsHtml() {
  try {
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const enableGlowEffects = themeConfiguration.get('enableGlowEffects', true)
    
    console.log(`生成发光效果HTML: enableGlowEffects=${enableGlowEffects}`)
    
    if (!enableGlowEffects) {
      console.log('发光效果已禁用，返回空字符串')
      return ''
    }
    
    const glowEffectsPath = path.join(__dirname, 'themes', 'modules', 'glow-effects.css')
    
    if (!fs.existsSync(glowEffectsPath)) {
      console.warn('发光效果样式文件不存在:', glowEffectsPath)
      return ''
    }
    
    const cssContent = fs.readFileSync(glowEffectsPath, 'utf-8')
    console.log('成功读取发光效果CSS文件')
    
    return `
      <style ${EXTENSION_CONFIG.tagAttribute}>
        /* Woodfish Theme 发光效果样式 */
        ${cssContent}
      </style>
    `
  } catch (error) {
    console.error('读取发光效果样式文件时出错:', error)
    return ''
  }
}

/**
 * 生成毛玻璃效果样式 HTML
 * @returns {string} 毛玻璃效果样式 HTML
 */
function generateGlassEffectsHtml() {
  try {
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const enableGlassEffect = themeConfiguration.get('enableGlassEffect', true)
    
    console.log(`生成毛玻璃效果HTML: enableGlassEffect=${enableGlassEffect}`)
    
    if (!enableGlassEffect) {
      console.log('毛玻璃效果已禁用，返回空字符串')
      return ''
    }
    
    const glassEffectsPath = path.join(__dirname, 'themes', 'modules', 'transparent-ui.css')
    
    if (!fs.existsSync(glassEffectsPath)) {
      console.warn('毛玻璃效果样式文件不存在:', glassEffectsPath)
      return ''
    }
    
    const cssContent = fs.readFileSync(glassEffectsPath, 'utf-8')
    console.log('成功读取毛玻璃效果CSS文件')
    
    return `
      <style ${EXTENSION_CONFIG.tagAttribute}>
        /* Woodfish Theme 毛玻璃效果样式 */
        ${cssContent}
      </style>
    `
  } catch (error) {
    console.error('读取毛玻璃效果样式文件时出错:', error)
    return ''
  }
}

/**
 * 生成主题样式 HTML（不包含发光效果）
 * @returns {string} 主题样式 HTML
 */
function generateThemeStylesHtml() {
  try {
    const themeStylePath = path.join(__dirname, 'themes', EXTENSION_CONFIG.themeFileName)
    
    if (!fs.existsSync(themeStylePath)) {
      console.warn('主题样式文件不存在:', themeStylePath)
      return ''
    }
    
    let cssContent = fs.readFileSync(themeStylePath, 'utf-8')
    
    // 移除发光效果相关的CSS代码，因为现在由单独的模块控制
    cssContent = removeGlowEffectsFromCss(cssContent)
    
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

/**
 * 从CSS内容中移除发光效果相关代码
 * @param {string} cssContent CSS内容
 * @returns {string} 移除发光效果后的CSS内容
 */
function removeGlowEffectsFromCss(cssContent) {
  // 移除发光效果相关的CSS规则
  // 匹配从发光效果注释开始到活动行号样式结束的所有内容
  const glowEffectsRegex = /\/\*以下为透明菜单，彩虹鼠标，发光行号\*\/[\s\S]*?text-shadow:\s*0\s+0\s+20px\s+currentColor\s*!important;\s*}/g
  
  // 也移除单独的发光效果规则
  const individualGlowRegex = /span\.[^{]*\{\s*text-shadow:\s*0\s+0\s+\d+px\s+currentColor\s*!important;\s*\}/g
  
  let cleanedContent = cssContent.replace(glowEffectsRegex, '')
  cleanedContent = cleanedContent.replace(individualGlowRegex, '')
  
  return cleanedContent
}

// ==================== 自定义 CSS 集成函数 ====================

/**
 * 检查是否安装了 Custom CSS and JS Loader 扩展
 * @returns {boolean} 是否已安装
 */
function isCustomCssExtensionInstalled() {
  try {
    const extension = vscode.extensions.getExtension('be5invis.vscode-custom-css')
    return Boolean(extension)
  } catch (error) {
    console.error('检查 Custom CSS 扩展时出错:', error)
    return false
  }
}

/**
 * 自动配置彩色光标
 * 检查 Custom CSS and JS Loader 扩展，如果未安装则提示用户安装
 */
function autoConfigureRainbowCursor() {
  try {
    console.log('开始自动配置彩色光标')
    
    // 检查是否安装了 Custom CSS and JS Loader 扩展
    if (!isCustomCssExtensionInstalled()) {
      console.log('Custom CSS and JS Loader 扩展未安装，显示安装提示')
      installCustomCssExtension()
      return
    }
    
    console.log('Custom CSS and JS Loader 扩展已安装')
    
    // 继续配置彩色光标
    configureRainbowCursor()
    
  } catch (error) {
    console.error('自动配置彩色光标时出错:', error)
    showErrorMessage(`配置彩色光标失败: ${error.message}`)
  }
}

/**
 * 配置彩色光标的 CSS 设置
 */
function configureRainbowCursor() {
  try {
    console.log('开始配置彩色光标 CSS')
    
    // 检查是否已经配置了彩色光标
    const config = vscode.workspace.getConfiguration()
    const customCssImports = config.get('vscode_custom_css.imports', [])
    
    // 构建彩色光标 CSS 文件的路径
    const rainbowCursorPath = path.join(__dirname, 'custom-css', 'rainbow-cursor.css')
    const fileUri = `file:///${rainbowCursorPath.replace(/\\/g, '/')}`
    
    // 检查是否已经配置了彩色光标
    const isAlreadyConfigured = customCssImports.some(importPath => 
      importPath.includes('rainbow-cursor.css')
    )
    
    if (isAlreadyConfigured) {
      console.log('彩色光标已经配置，显示启用提示')
      showCustomCssEnablePrompt()
      return
    }
    
    // 自动添加彩色光标配置
    const newImports = [...customCssImports, fileUri]
    
    config.update('vscode_custom_css.imports', newImports, vscode.ConfigurationTarget.Global)
      .then(() => {
        console.log('彩色光标配置已添加')
        showCustomCssEnablePrompt()
      })
      .catch(error => {
        console.error('配置彩色光标失败:', error)
        showErrorMessage(`配置彩色光标失败: ${error.message}`)
      })
    
  } catch (error) {
    console.error('配置彩色光标 CSS 时出错:', error)
    showErrorMessage(`配置彩色光标失败: ${error.message}`)
  }
}

/**
 * 显示 Custom CSS and JS Loader 扩展安装提示
 */
function showCustomCssInstallPrompt() {
  const installAction = '安装扩展'
  const laterAction = '稍后'
  const learnMoreAction = '了解更多'
  
  const message = '要启用彩色光标效果，需要安装 Custom CSS and JS Loader 扩展。这个扩展可以让您自定义 VSCode 的样式。'
  
  vscode.window
    .showInformationMessage(
      `[Woodfish Theme] ${message}`,
      installAction,
      learnMoreAction,
      laterAction
    )
    .then(selection => {
      switch (selection) {
        case installAction:
          installCustomCssExtension()
          break
        case learnMoreAction:
          showCustomCssSetupGuide()
          break
        case laterAction:
        default:
          showInfoMessage('您可以稍后通过命令面板执行"启动彩色光标自动配置"来重新配置')
          break
      }
    })
}

/**
 * 安装 Custom CSS and JS Loader 扩展
 */
function installCustomCssExtension() {
  try {
    // 确保使用正确的扩展ID
    const extensionId = 'be5invis.vscode-custom-css'
    
    // 提示用户选择安装方式
    const scriptAction = '使用脚本安装 (推荐)'
    const manualAction = '手动安装'
    const cancelAction = '取消'
    
    vscode.window.showInformationMessage(
      '[Woodfish Theme] 要启用彩色光标，需要安装 Custom CSS and JS Loader 扩展。请选择安装方式：',
      scriptAction,
      manualAction,
      cancelAction
    ).then(selection => {
      if (selection === scriptAction) {
        // 使用脚本安装
        installUsingScript()
      } else if (selection === manualAction) {
        // 手动安装
        installManually()
      }
    })
  } catch (error) {
    console.error('安装 Custom CSS 扩展时出错:', error)
    showErrorMessage(`安装扩展失败: ${error.message}，请手动在扩展市场搜索"Custom CSS and JS Loader"安装`)
  }
}

/**
 * 使用脚本安装 Custom CSS and JS Loader 扩展
 */
function installUsingScript() {
  try {
    // 获取脚本路径
    const scriptPath = path.join(__dirname, 'scripts', 'install-custom-css.sh')
    
    // 确保脚本存在
    if (!fs.existsSync(scriptPath)) {
      showErrorMessage('安装脚本不存在，请使用手动安装方式')
      installManually()
      return
    }
    
    // 确保脚本可执行
    fs.chmodSync(scriptPath, '755')
    
    // 创建终端并执行脚本
    const terminal = vscode.window.createTerminal('Woodfish Theme - 安装 Custom CSS')
    
    // 根据操作系统执行不同的命令
    if (process.platform === 'win32') {
      // Windows
      terminal.sendText(`powershell -ExecutionPolicy Bypass -Command "code --install-extension be5invis.vscode-custom-css"`)
    } else {
      // macOS 或 Linux
      terminal.sendText(`bash "${scriptPath}"`)
    }
    
    terminal.show()
    
    // 提示用户安装完成后的操作
    setTimeout(() => {
      vscode.window.showInformationMessage(
        '[Woodfish Theme] 安装完成后，请重启 VSCode 并执行以下步骤：\n1. 按 Ctrl+Shift+P 打开命令面板\n2. 执行"Enable Custom CSS and JS"命令\n3. 重启 VSCode',
        '我已完成'
      ).then(selection => {
        if (selection === '我已完成') {
          configureRainbowCursor()
        }
      })
    }, 5000)
    
  } catch (error) {
    console.error('使用脚本安装时出错:', error)
    showErrorMessage(`脚本安装失败: ${error.message}，请尝试手动安装`)
    installManually()
  }
}

/**
 * 手动安装 Custom CSS and JS Loader 扩展
 */
function installManually() {
  try {
    const extensionId = 'be5invis.vscode-custom-css'
    
    // 打开扩展搜索
    vscode.commands.executeCommand('workbench.extensions.search', extensionId)
      .then(() => {
        showInfoMessage('已打开扩展搜索，请在扩展市场中找到并安装 Custom CSS and JS Loader')
        
        // 提示用户安装完成后的操作
        setTimeout(() => {
          vscode.window.showInformationMessage(
            '[Woodfish Theme] 安装完成后，请重启 VSCode 并执行以下步骤：\n1. 按 Ctrl+Shift+P 打开命令面板\n2. 执行"Enable Custom CSS and JS"命令\n3. 重启 VSCode',
            '我已完成'
          ).then(selection => {
            if (selection === '我已完成') {
              configureRainbowCursor()
            }
          })
        }, 3000)
      })
      .catch(error => {
        console.error('打开扩展搜索失败:', error)
        
        // 备用方案：打开扩展页面
        const extensionUri = vscode.Uri.parse(`vscode:extension/${extensionId}`)
        vscode.commands.executeCommand('vscode.open', extensionUri)
          .then(() => {
            showInfoMessage('已打开 Custom CSS and JS Loader 扩展页面，请点击安装按钮完成安装')
          })
          .catch(openError => {
            console.error('打开扩展页面失败:', openError)
            showErrorMessage(`无法打开扩展页面，请手动在扩展市场搜索"Custom CSS and JS Loader"安装`)
          })
      })
  } catch (error) {
    console.error('手动安装时出错:', error)
    showErrorMessage(`无法启动手动安装: ${error.message}，请在扩展市场中搜索"Custom CSS and JS Loader"安装`)
  }
}

/**
 * 显示 Custom CSS 启用提示
 */
function showCustomCssEnablePrompt() {
  const enableAction = '启用 Custom CSS'
  const laterAction = '稍后'
  const guideAction = '查看指南'
  
  const message = '彩色光标配置已添加！现在需要启用 Custom CSS and JS Loader 扩展才能看到效果。'
  
  vscode.window
    .showInformationMessage(
      `[Woodfish Theme] ${message}`,
      enableAction,
      guideAction,
      laterAction
    )
    .then(selection => {
      switch (selection) {
        case enableAction:
          enableCustomCss()
          break
        case guideAction:
          showCustomCssSetupGuide()
          break
        case laterAction:
        default:
          showInfoMessage('您可以稍后通过命令面板执行"Enable Custom CSS and JS"来启用效果')
          break
      }
    })
}

/**
 * 显示 Custom CSS 安装提示
 * 此函数已被 installCustomCssExtension 替代，保留此函数以兼容旧代码
 */
function showCustomCssInstallPrompt() {
  installCustomCssExtension();
}

/**
 * 启用 Custom CSS
 */
function enableCustomCss() {
  try {
    vscode.commands.executeCommand('extension.updateCustomCSS')
      .then(() => {
        showReloadPrompt('Custom CSS 已启用！VSCode 需要重新加载以应用彩色光标效果。')
      })
      .catch(error => {
        console.error('启用 Custom CSS 失败:', error)
        
        // 备用方案：提示用户手动启用
        vscode.window.showInformationMessage(
          '[Woodfish Theme] 请手动执行以下步骤启用彩色光标：\n1. 按 Ctrl+Shift+P 打开命令面板\n2. 执行"Enable Custom CSS and JS"命令\n3. 重启 VSCode',
          '打开命令面板'
        ).then(selection => {
          if (selection === '打开命令面板') {
            vscode.commands.executeCommand('workbench.action.showCommands')
          }
        })
      })
  } catch (error) {
    console.error('启用 Custom CSS 时出错:', error)
    showErrorMessage(`启用 Custom CSS 失败: ${error.message}`)
  }
}

/**
 * 显示 Custom CSS 设置指南
 */
function showCustomCssSetupGuide() {
  try {
    const guidePath = path.join(__dirname, 'vscode-custom-css-setup.md')
    
    if (fs.existsSync(guidePath)) {
      vscode.workspace.openTextDocument(guidePath)
        .then(doc => {
          vscode.window.showTextDocument(doc)
          showInfoMessage('已打开彩色光标设置指南，请按照说明进行配置')
        })
        .catch(error => {
          console.error('打开设置指南失败:', error)
          showErrorMessage(`无法打开设置指南: ${error.message}`)
        })
    } else {
      showErrorMessage('设置指南文件不存在')
    }
  } catch (error) {
    console.error('显示设置指南时出错:', error)
    showErrorMessage(`显示设置指南失败: ${error.message}`)
  }
}

/**
 * 显示 Custom CSS 设置指南
 */
function showCustomCssSetupGuide() {
  try {
    const guidePath = path.join(__dirname, 'vscode-custom-css-setup.md')
    
    if (fs.existsSync(guidePath)) {
      vscode.workspace.openTextDocument(guidePath)
        .then(doc => {
          vscode.window.showTextDocument(doc)
          showInfoMessage('已打开彩色光标设置指南，请按照说明进行配置')
        })
        .catch(error => {
          console.error('打开设置指南失败:', error)
          showErrorMessage(`无法打开设置指南: ${error.message}`)
        })
    } else {
      showErrorMessage('设置指南文件不存在')
    }
  } catch (error) {
    console.error('显示设置指南时出错:', error)
    showErrorMessage(`显示设置指南失败: ${error.message}`)
  }
}


/**
 * 应用主题样式
 */
function applyTheme() {
  const htmlPath = getWorkbenchHtmlPath()
  const cleanHtml = getCleanHtmlContent()
  
  if (!htmlPath || !cleanHtml) {
    return
  }
  
  console.log('解析到工作台 HTML 路径:', htmlPath)
  
  try {
    console.log('开始应用主题样式')
    
    // 确保启用主题时默认开启发光效果
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const currentGlowState = themeConfiguration.get('enableGlowEffects')
    
    // 如果配置中没有设置发光效果状态，或者为undefined，则默认设置为true
    if (currentGlowState === undefined || currentGlowState === null) {
      console.log('发光效果配置未初始化，设置为默认开启')
      themeConfiguration.update('enableGlowEffects', true, vscode.ConfigurationTarget.Global)
    }
    
    // 生成样式内容
    const customStylesHtml = generateCustomStylesHtml()
    const themeStylesHtml = generateThemeStylesHtml()
    const glowEffectsHtml = generateGlowEffectsHtml()
    const glassEffectsHtml = generateGlassEffectsHtml()
    
    if (!themeStylesHtml) {
      showErrorMessage('无法加载主题样式文件')
      return
    }
    
    // 组合最终的 HTML 内容
    const stylesHtml = customStylesHtml + themeStylesHtml + glowEffectsHtml + glassEffectsHtml
    const finalHtml = cleanHtml.replace('</html>', stylesHtml + '</html>')
    
    // 写入文件
    fs.writeFileSync(htmlPath, finalHtml, 'utf-8')
    console.log('主题样式文件写入成功')
    
    // 更新版本状态
    updateVscodeVersion()
    
    // 验证状态是否正确应用
    setTimeout(() => {
      const isStateValid = validateGlowEffectsState()
      if (!isStateValid) {
        console.warn('警告：发光效果状态验证失败，配置与实际效果可能不一致')
      } else {
        console.log('发光效果状态验证通过')
      }
    }, 500) // 给文件写入一些时间
    
    // 重新获取配置状态（可能已经更新）
    const finalGlowState = themeConfiguration.get('enableGlowEffects', true)
    const glowStatus = finalGlowState ? '（包含发光效果）' : '（不包含发光效果）'
    
    console.log(`主题应用完成，发光效果状态: ${finalGlowState}`)
    
    showReloadPrompt(
      `Woodfish Theme 已成功启用！${glowStatus}VSCode 需要重新加载以应用更改。` +
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

// ==================== 依赖插件管理函数 ====================

/**
 * 依赖插件配置
 */
const DEPENDENCY_EXTENSION = {
  id: 'BrandonKirbyson.vscode-animations',
  name: 'VSCode Animations',
  description: '为VSCode提供动画效果的插件'
}

/**
 * 检查依赖插件是否已安装
 * @returns {boolean} 是否已安装
 */
function isDependencyExtensionInstalled() {
  try {
    const extension = vscode.extensions.getExtension(DEPENDENCY_EXTENSION.id)
    return Boolean(extension)
  } catch (error) {
    console.error('检查依赖插件时出错:', error)
    return false
  }
}

/**
 * 检查用户是否已经选择过不安装依赖插件
 * @returns {boolean} 是否已选择不安装
 */
function hasUserDeclinedInstallation() {
  if (!extensionContext) return false
  
  try {
    return extensionContext.globalState.get(`declined-${DEPENDENCY_EXTENSION.id}`, false)
  } catch (error) {
    console.error('检查用户选择状态时出错:', error)
    return false
  }
}

/**
 * 记录用户选择不安装依赖插件
 */
function recordUserDeclinedInstallation() {
  if (!extensionContext) return
  
  try {
    extensionContext.globalState.update(`declined-${DEPENDENCY_EXTENSION.id}`, true)
    console.log('已记录用户选择不安装依赖插件')
  } catch (error) {
    console.error('记录用户选择时出错:', error)
  }
}

/**
 * 显示依赖插件安装提示
 */
function showInstallPrompt() {
  const installAction = '安装插件'
  const laterAction = '稍后'
  const neverAction = '不再提示'
  
  const message = `为了获得更好的视觉体验，建议安装 ${DEPENDENCY_EXTENSION.name} 插件。该插件提供丰富的动画效果，与 Woodfish Theme 完美配合。`
  
  vscode.window
    .showInformationMessage(
      `[Woodfish Theme] ${message}`,
      installAction,
      laterAction,
      neverAction
    )
    .then(selection => {
      switch (selection) {
        case installAction:
          installDependencyExtension()
          break
        case neverAction:
          recordUserDeclinedInstallation()
          showInfoMessage('已记录您的选择，不会再次提示安装此插件')
          break
        case laterAction:
        default:
          // 用户选择稍后或关闭对话框，不做任何操作
          break
      }
    })
}

/**
 * 安装依赖插件
 */
function installDependencyExtension() {
  try {
    // 使用VSCode命令打开插件市场页面
    const extensionUri = vscode.Uri.parse(`vscode:extension/${DEPENDENCY_EXTENSION.id}`)
    
    vscode.commands.executeCommand('vscode.open', extensionUri)
      .then(() => {
        showInfoMessage(`已打开 ${DEPENDENCY_EXTENSION.name} 插件页面，请点击安装按钮完成安装`)
      })
      .catch(error => {
        console.error('打开插件页面失败:', error)
        
        // 备用方案：使用浏览器打开插件市场页面
        const marketplaceUrl = `https://marketplace.visualstudio.com/items?itemName=${DEPENDENCY_EXTENSION.id}`
        vscode.env.openExternal(vscode.Uri.parse(marketplaceUrl))
          .then(() => {
            showInfoMessage('已在浏览器中打开插件市场页面，请下载并安装插件')
          })
          .catch(browserError => {
            console.error('打开浏览器失败:', browserError)
            showErrorMessage(`无法自动打开插件页面，请手动搜索安装：${DEPENDENCY_EXTENSION.id}`)
          })
      })
  } catch (error) {
    console.error('安装依赖插件时出错:', error)
    showErrorMessage(`安装插件失败: ${error.message}`)
  }
}

/**
 * 检查并提示安装依赖插件
 */
function checkDependencyExtension() {
  try {
    // 检查插件是否已安装
    if (isDependencyExtensionInstalled()) {
      console.log('依赖插件已安装，无需提示')
      return
    }
    
    // 检查用户是否已选择不安装
    if (hasUserDeclinedInstallation()) {
      console.log('用户已选择不安装依赖插件，跳过提示')
      return
    }
    
    // 延迟显示提示，避免与其他启动消息冲突
    setTimeout(() => {
      showInstallPrompt()
    }, 2000)
    
  } catch (error) {
    console.error('检查依赖插件时出错:', error)
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
 * 切换发光效果
 */
function toggleGlowEffects() {
  try {
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const currentGlowState = themeConfiguration.get('enableGlowEffects', true)
    const newGlowState = !currentGlowState
    
    console.log(`切换发光效果: ${currentGlowState} -> ${newGlowState}`)
    
    // 更新配置
    themeConfiguration.update('enableGlowEffects', newGlowState, vscode.ConfigurationTarget.Global)
      .then(() => {
        const statusMessage = newGlowState ? '发光效果已开启' : '发光效果已关闭'
        
        // 如果主题已启用，立即重新应用主题
        if (wasThemeInstalled()) {
          console.log('主题已安装，立即重新应用主题')
          // 立即重新应用主题，不等待配置监听器
          applyTheme()
          showReloadPrompt(`${statusMessage}！VSCode 需要重新加载以应用更改。`)
        } else {
          showInfoMessage(`${statusMessage}！请先启用 Woodfish 主题以查看效果。`)
        }
      })
      .catch(error => {
        showErrorMessage(`更新发光效果配置失败: ${error.message}`)
        console.error('更新配置时出错:', error)
      })
    
  } catch (error) {
    showErrorMessage(`切换发光效果失败: ${error.message}`)
    console.error('切换发光效果时出错:', error)
  }
}

/**
 * 切换毛玻璃效果
 */
function toggleGlassEffect() {
  try {
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const currentGlassState = themeConfiguration.get('enableGlassEffect', true)
    const newGlassState = !currentGlassState
    
    console.log(`切换毛玻璃效果: ${currentGlassState} -> ${newGlassState}`)
    
    // 更新配置
    themeConfiguration.update('enableGlassEffect', newGlassState, vscode.ConfigurationTarget.Global)
      .then(() => {
        const statusMessage = newGlassState ? '毛玻璃效果已开启' : '毛玻璃效果已关闭'
        
        // 如果主题已启用，立即重新应用主题
        if (wasThemeInstalled()) {
          console.log('主题已安装，立即重新应用主题')
          applyTheme()
          showReloadPrompt(`${statusMessage}！VSCode 需要重新加载以应用更改。`)
        } else {
          showInfoMessage(`${statusMessage}！请先启用 Woodfish 主题以查看效果。`)
        }
      })
      .catch(error => {
        showErrorMessage(`更新毛玻璃效果配置失败: ${error.message}`)
        console.error('更新配置时出错:', error)
      })
    
  } catch (error) {
    showErrorMessage(`切换毛玻璃效果失败: ${error.message}`)
    console.error('切换毛玻璃效果时出错:', error)
  }
}

/**
 * 切换彩色光标效果
 */
function toggleRainbowCursor() {
  try {
    const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
    const currentCursorState = themeConfiguration.get('enableRainbowCursor', false)
    const newCursorState = !currentCursorState
    
    console.log(`切换彩色光标效果: ${currentCursorState} -> ${newCursorState}`)
    
    // 更新配置
    themeConfiguration.update('enableRainbowCursor', newCursorState, vscode.ConfigurationTarget.Global)
      .then(() => {
        const statusMessage = newCursorState ? '彩色光标效果已开启' : '彩色光标效果已关闭'
        
        if (newCursorState) {
          // 开启彩色光标时，自动配置
          autoConfigureRainbowCursor()
        } else {
          // 关闭彩色光标时，移除配置
          removeRainbowCursorConfig()
        }
        
        showInfoMessage(statusMessage)
      })
      .catch(error => {
        showErrorMessage(`更新彩色光标配置失败: ${error.message}`)
        console.error('更新配置时出错:', error)
      })
    
  } catch (error) {
    showErrorMessage(`切换彩色光标效果失败: ${error.message}`)
    console.error('切换彩色光标效果时出错:', error)
  }
}

/**
 * 移除彩色光标配置
 */
function removeRainbowCursorConfig() {
  try {
    const config = vscode.workspace.getConfiguration()
    const customCssImports = config.get('vscode_custom_css.imports', [])
    
    // 过滤掉彩色光标相关的配置
    const filteredImports = customCssImports.filter(importPath => 
      !importPath.includes('rainbow-cursor.css')
    )
    
    if (filteredImports.length !== customCssImports.length) {
      config.update('vscode_custom_css.imports', filteredImports, vscode.ConfigurationTarget.Global)
        .then(() => {
          console.log('彩色光标配置已移除')
          showReloadPrompt('彩色光标配置已移除！VSCode 需要重新加载以应用更改。')
        })
        .catch(error => {
          console.error('移除彩色光标配置失败:', error)
          showErrorMessage(`移除彩色光标配置失败: ${error.message}`)
        })
    } else {
      showInfoMessage('彩色光标配置未找到或已移除')
    }
  } catch (error) {
    console.error('移除彩色光标配置时出错:', error)
    showErrorMessage(`移除彩色光标配置失败: ${error.message}`)
  }
}

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
        
        // 确保发光效果配置为开启状态
        const themeConfiguration = vscode.workspace.getConfiguration(EXTENSION_CONFIG.configSection)
        const currentGlowState = themeConfiguration.get('enableGlowEffects', false)
        
        console.log(`当前发光效果状态: ${currentGlowState}`)
        
        // 强制设置发光效果为开启
        themeConfiguration.update('enableGlowEffects', true, vscode.ConfigurationTarget.Global)
          .then(async () => {
            console.log('发光效果已强制开启')
            // 应用主题（此时发光效果已确保开启）
            applyTheme()
            
          })
          .catch(error => {
            console.error('设置发光效果失败:', error)
            // 即使设置失败，也尝试应用主题
            applyTheme()
            
            // 仍然尝试配置彩色光标
            setTimeout(() => {
              autoConfigureRainbowCursor()
            }, 1000)
          })
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
    
    // 切换发光效果命令
    const toggleGlowCommand = vscode.commands.registerCommand(
      'woodfish-theme.toggleGlow',
      () => {
        console.log('执行切换发光效果命令')
        toggleGlowEffects()
      }
    )
    
    // 彩色光标自动配置命令
    const autoConfigureRainbowCursorCommand = vscode.commands.registerCommand(
      'woodfish-theme.autoConfigureRainbowCursor',
      () => {
        console.log('执行彩色光标自动配置命令')
        autoConfigureRainbowCursor()
      }
    )
    
    // 切换毛玻璃效果命令
    const toggleGlassEffectCommand = vscode.commands.registerCommand(
      'woodfish-theme.toggleGlassEffect',
      () => {
        console.log('执行切换毛玻璃效果命令')
        toggleGlassEffect()
      }
    )
    
    // 切换彩色光标命令
    const toggleRainbowCursorCommand = vscode.commands.registerCommand(
      'woodfish-theme.toggleRainbowCursor',
      () => {
        console.log('执行切换彩色光标命令')
        toggleRainbowCursor()
      }
    )
    
    // 注册到扩展上下文
    extensionContext.subscriptions.push(
      enableCommand, 
      disableCommand, 
      toggleGlowCommand,
      autoConfigureRainbowCursorCommand,
      toggleGlassEffectCommand,
      toggleRainbowCursorCommand
    )
    
    console.log('主题命令注册成功')
  } catch (error) {
    console.error('注册命令时出错:', error)
  }
}

// ==================== 配置监听函数 ====================

/**
 * 注册配置变化监听器
 */
function registerConfigurationListener() {
  if (!extensionContext) return
  
  try {
    // 监听配置变化
    const configListener = vscode.workspace.onDidChangeConfiguration(event => {
      // 检查是否是发光效果配置的变化
      if (event.affectsConfiguration(`${EXTENSION_CONFIG.configSection}.enableGlowEffects`)) {
        console.log('配置监听器检测到发光效果配置变化')
        
        // 检查主题是否已经启用
        if (wasThemeInstalled()) {
          console.log('主题已安装，配置监听器跳过重新应用（由toggleGlowEffects直接处理）')
          // 注意：现在由 toggleGlowEffects() 函数直接处理主题重新应用
          // 这里不再重复应用，避免双重处理
        } else {
          console.log('主题未安装，配置监听器无需处理')
        }
      }
      
      // 检查是否是毛玻璃效果配置的变化
      if (event.affectsConfiguration(`${EXTENSION_CONFIG.configSection}.enableGlassEffect`)) {
        console.log('配置监听器检测到毛玻璃效果配置变化')
        
        if (wasThemeInstalled()) {
          console.log('主题已安装，配置监听器跳过重新应用（由toggleGlassEffect直接处理）')
        } else {
          console.log('主题未安装，配置监听器无需处理')
        }
      }
      
      // 检查是否是彩色光标配置的变化
      if (event.affectsConfiguration(`${EXTENSION_CONFIG.configSection}.enableRainbowCursor`)) {
        console.log('配置监听器检测到彩色光标配置变化')
        // 彩色光标的处理由 toggleRainbowCursor() 函数直接处理
      }
      
      // 监听其他可能的配置变化（如自定义样式）
      if (event.affectsConfiguration(`${EXTENSION_CONFIG.configSection}.customStyles`)) {
        console.log('检测到自定义样式配置变化，重新应用主题')
        
        if (wasThemeInstalled()) {
          // 立即重新应用主题以反映自定义样式变化
          applyTheme()
        }
      }
    })
    
    // 注册到扩展上下文
    extensionContext.subscriptions.push(configListener)
    
    console.log('配置变化监听器注册成功')
  } catch (error) {
    console.error('注册配置监听器时出错:', error)
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
    
    // 注册配置变化监听器
    registerConfigurationListener()
    
    // 初始化版本检查
    initializeVersionCheck()
    
    // 检查依赖插件
    checkDependencyExtension()
    
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
