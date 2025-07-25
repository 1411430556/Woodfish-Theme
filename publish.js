#!/usr/bin/env node

/**
 * Woodfish Theme 发布脚本
 * 用于自动化发布 VSCode 扩展到 Marketplace
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出函数
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

function log(message, color = 'cyan') {
  console.log(colors[color](`[Woodfish Theme] ${message}`));
}

function error(message) {
  console.error(colors.red(`[错误] ${message}`));
}

function success(message) {
  console.log(colors.green(`[成功] ${message}`));
}

function warning(message) {
  console.log(colors.yellow(`[警告] ${message}`));
}

// 检查必要文件
function checkRequiredFiles() {
  log('检查必要文件...');
  
  const requiredFiles = [
    'package.json',
    'extension.js',
    'README.md'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    error(`缺少必要文件: ${missingFiles.join(', ')}`);
    return false;
  }
  
  success('所有必要文件都存在');
  return true;
}

// 检查 package.json 配置
function checkPackageJson() {
  log('检查 package.json 配置...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredFields = ['name', 'version', 'publisher', 'engines', 'main'];
    const missingFields = requiredFields.filter(field => !packageJson[field]);
    
    if (missingFields.length > 0) {
      error(`package.json 缺少必要字段: ${missingFields.join(', ')}`);
      return false;
    }
    
    if (!packageJson.publisher || packageJson.publisher === 'your-publisher-name') {
      error('请在 package.json 中设置正确的 publisher 名称');
      return false;
    }
    
    success('package.json 配置检查通过');
    return true;
  } catch (err) {
    error(`读取 package.json 失败: ${err.message}`);
    return false;
  }
}

// 检查是否安装了 vsce
function checkVsce() {
  log('检查 vsce 工具...');
  
  try {
    execSync('vsce --version', { stdio: 'pipe' });
    success('vsce 工具已安装');
    return true;
  } catch (err) {
    error('vsce 工具未安装，请运行: npm install -g vsce');
    return false;
  }
}

// 运行测试
function runTests() {
  log('运行测试...');
  
  try {
    if (fs.existsSync('test') || fs.existsSync('src/test')) {
      execSync('npm test', { stdio: 'inherit' });
      success('测试通过');
    } else {
      warning('未找到测试文件，跳过测试');
    }
    return true;
  } catch (err) {
    error('测试失败');
    return false;
  }
}

// 打包扩展
function packageExtension() {
  log('打包扩展...');
  
  try {
    execSync('vsce package', { stdio: 'inherit' });
    success('扩展打包成功');
    return true;
  } catch (err) {
    error('扩展打包失败');
    return false;
  }
}

// 发布扩展
function publishExtension() {
  log('发布扩展到 VS Code Marketplace...');
  
  try {
    execSync('vsce publish', { stdio: 'inherit' });
    success('扩展发布成功！');
    return true;
  } catch (err) {
    error('扩展发布失败');
    console.log('\n可能的解决方案:');
    console.log('1. 确保已登录: vsce login <publisher-name>');
    console.log('2. 检查 Personal Access Token 是否有效');
    console.log('3. 确保 publisher 名称正确');
    return false;
  }
}

// 主函数
function main() {
  console.log(colors.blue('🚀 Woodfish Theme 扩展发布工具\n'));
  
  const checks = [
    checkRequiredFiles,
    checkPackageJson,
    checkVsce
  ];
  
  // 运行所有检查
  for (const check of checks) {
    if (!check()) {
      error('发布前检查失败，请修复问题后重试');
      process.exit(1);
    }
  }
  
  console.log('');
  
  // 询问用户是否继续
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question(colors.yellow('所有检查通过！是否继续发布？(y/N): '), (answer) => {
    rl.close();
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      log('发布已取消');
      return;
    }
    
    console.log('');
    
    // 执行发布流程
    const steps = [
      runTests,
      packageExtension,
      publishExtension
    ];
    
    for (const step of steps) {
      if (!step()) {
        error('发布流程失败');
        process.exit(1);
      }
    }
    
    console.log('');
    success('🎉 扩展发布完成！');
    console.log('\n接下来你可以:');
    console.log('• 访问 VS Code Marketplace 查看你的扩展');
    console.log('• 分享给朋友和社区');
    console.log('• 收集用户反馈并持续改进');
  });
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  checkRequiredFiles,
  checkPackageJson,
  checkVsce,
  packageExtension,
  publishExtension
};