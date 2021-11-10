## Electron + React Hooks + TS 实现简历平台

### 开发环境

> 由于网络问题，往往安装 Electron 会很慢，此时可以考虑换个淘宝源

```js
// 1.下载
npm run install
// 2. 运行
npm run start:render
npm run start:main
```
### 生产环境
```js
// 1.打包主进程
npm run build:main
// 2.打包渲染线程
npm run build:render
// 3.打包应用
npm run dist
```

### 分支
#### 完整项目
  [main分支](https://github.com/duanStar/ResumePlatform/tree/main)  简历平台应用完整项目地址
#### 其他分支
  [home-op](https://github.com/duanStar/ResumePlatform/tree/home-op)   简历平台首页开发及优化
  
  [components](https://github.com/duanStar/ResumePlatform/tree/components)  简历平台通用组件开发
  
  [resume](https://github.com/duanStar/ResumePlatform/tree/resume)  简历平台简历页面相关逻辑组件开发

  [templateList](https://github.com/duanStar/ResumePlatform/tree/templateList)  简历平台模板页面相关逻辑组件开发

  [toPdf](https://github.com/duanStar/ResumePlatform/tree/toPdf)  简历平台pdf导出功能开发

  [theme](https://github.com/duanStar/ResumePlatform/tree/theme)  简历平台换肤功能开发
  
  [optimize](https://github.com/duanStar/ResumePlatform/tree/optimize)  简历平台细节遗漏功能完善

  [setting](https://github.com/duanStar/ResumePlatform/tree/setting)  简历平台设置简历数据存储路径功能开发

  [customMenu](https://github.com/duanStar/ResumePlatform/tree/customMenu)  简历平台自定义功能菜单