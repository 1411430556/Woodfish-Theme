/**
 * 项目清理脚本
 * 用于删除项目中的临时文件和开发文件
 */

const fs = require('fs');
const path = require('path');

// 要删除的文件列表
const filesToDelete = [
  'quick-publish.bat',
  '.env.example',
  'RELEASE_CHECKLIST.md',
  'VSCode主题扩展发布准备.md',
  'woodfish theme.json'
];

// 删除文件函数
function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`已删除: ${filePath}`);
    } else {
      console.log(`文件不存在: ${filePath}`);
    }
  } catch (error) {
    console.error(`删除文件失败 ${filePath}:`, error);
  }
}

// 主函数
function cleanProject() {
  console.log('开始清理项目...');
  
  filesToDelete.forEach(file => {
    const filePath = path.join(__dirname, file);
    deleteFile(filePath);
  });
  
  console.log('项目清理完成！');
}

// 执行清理
cleanProject();