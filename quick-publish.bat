@echo off
chcp 65001 >nul
echo 🚀 Woodfish Theme 快速发布脚本
echo ================================

echo 📋 运行发布前检查...
node scripts/pre-publish-check.js
if %errorlevel% neq 0 (
    echo ❌ 发布前检查失败，请修复问题后重试
    pause
    exit /b 1
)

echo.
echo ✅ 发布前检查通过！
echo.
echo 请选择发布选项:
echo 1. 仅打包 (.vsix)
echo 2. 打包并发布到VSCode市场
echo 3. 完整发布流程 (市场 + GitHub)
echo.

set /p choice=请输入选择 (1-3): 

if "%choice%"=="1" (
    echo 📦 开始打包...
    call npm run package
    if %errorlevel% equ 0 (
        echo ✅ 打包完成！
    ) else (
        echo ❌ 打包失败
    )
) else if "%choice%"=="2" (
    echo 📦 打包并发布到VSCode市场...
    call npm run package
    if %errorlevel% equ 0 (
        echo 📤 发布到VSCode市场...
        call vsce publish
        if %errorlevel% equ 0 (
            echo ✅ 发布成功！
        ) else (
            echo ❌ 发布失败，请检查发布令牌
        )
    )
) else if "%choice%"=="3" (
    echo 📦 完整发布流程...
    call npm run package
    if %errorlevel% equ 0 (
        echo 📤 发布到VSCode市场...
        call vsce publish
        if %errorlevel% equ 0 (
            echo ✅ 市场发布成功！
            echo.
            echo 📋 GitHub发布步骤:
            echo 1. git add .
            echo 2. git commit -m "Release v2.2.0"
            echo 3. git tag v2.2.0
            echo 4. git push origin main --tags
            echo 5. 在GitHub上创建Release并上传.vsix文件
            echo.
            set /p github=是否自动执行Git操作? (y/N): 
            if /i "!github!"=="y" (
                git add .
                git commit -m "Release v2.2.0"
                git tag v2.2.0
                git push origin main --tags
                echo ✅ Git操作完成，请手动在GitHub创建Release
            )
        )
    )
) else (
    echo ❌ 无效选择
)

echo.
echo 🎉 发布流程完成！
pause