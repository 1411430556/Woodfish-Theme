# 删除VSCode扩展中重复的重新加载窗口命令

## Core Features

- 移除重复命令

- 保持主题功能完整

- 代码优化

## Tech Stack

{
  "Web": {
    "arch": "html",
    "component": null
  }
}

## Design

代码重构和优化，移除功能重叠的命令

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 定位extension.js文件中第94行附近的重新加载窗口命令代码

[X] 分析该命令的具体实现和注册方式

[X] 确认woodfish主题命令的实现，避免误删相关功能

[X] 删除重复的重新加载窗口命令代码

[X] 检查命令注册数组，移除对应的命令注册项

[X] 验证修改后的代码语法正确性
