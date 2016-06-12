# automating-your-workflow-with-gulp

Gulp是一个非常棒的自动化构建工具, 这是一份内部分享的材料, 包括一个slide, 一个demo, 我用过的 Gulp 插件介绍以及一些 recipes.

如果你有更好的展示形式或者更好的资料, 欢迎star, 发pr哦.

# Slide

[关于Gulp的一个Slide](http://slides.com/xy2/gulp-1/fullscreen)

# demo

请看demo目录下, (node4以上, gulp4.0)
注意: 确保版本正确, 在slide中有相关介绍.


# Recipes

注意: 每一个recipe都会有一个 gulpfile, 一个 readme. 前者是代码, 基本可以直接用, 后者是说明. 新开了一个 [issue](https://github.com/xiaoyu2er/automating-your-workflow-with-gulp/issues/2)

如果你有什么想要了解的 gulp 任务, 可以给我留言.

+ [recipes/plumber 不中断Gulp任务且弹出系统通知](./recipes/plumber)
+ [recipes/yargs 使用命令行参数(yargs) 来控制任务逻辑 (gulp-if) (选择性压缩文件和生成sourcemap)](./recipes/yargs)

# 插件

## 编译

### CSS
* [gulp-sass](https://github.com/dlmanning/gulp-sass) - 将 Sass 编译成 CSS
* [gulp-less](https://github.com/plus3network/gulp-less) - [Less](https://github.com/less/less.js) 编译成 CSS.
* [gulp-stylus](https://github.com/stevelacy/gulp-stylus) - [Stylus](https://github.com/stylus/stylus) 编译成 CSS.
* [gulp-autopreﬁxer](https://github.com/sindresorhus/gulp-autoprefixer) - 添加厂商前缀

### JS
* [gulp-typescript](https://github.com/ivogabe/gulp-typescript) - [TypeScript](https://github.com/Microsoft/TypeScript) 编译成JavaScript.
* [gulp-babel](https://github.com/babel/gulp-babel) - ES6编译成ES5 

## 合并
* [gulp-concat](https://github.com/contra/gulp-concat) - 合并文件.

## 压缩
* [gulp-clean-css](https://github.com/scniro/gulp-clean-css) - 压缩 CSS 
* [gulp-uglify](https://github.com/terinjokes/gulp-uglify) - 压缩 JavaScript 
* [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) - 生成 source maps
* [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) - 压缩 HTML 通过 
* [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - 压缩 PNG, JPEG, GIF and SVG 图片 
* [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin) - 压缩 SVG 文件


## 资源注入
* [gulp-inject](https://github.com/klei/gulp-inject) - 将指定的css或js文件以标签的形式插入到HTML中的指定标志内。

## 流程控制

* [run-sequence](https://github.com/OverZealous/run-sequence) - 按照顺序执行task (注意: 在 Gulp4.0 中, 已经提供了 gulp.series 方法)
* [gulp-if](https://github.com/robrich/gulp-if) - If-Else-流程控制
* [gulp-ignore](https://github.com/robrich/gulp-ignore) - 选择性过滤文件
* [gulp-filter](https://github.com/sindresorhus/gulp-filter) - 过滤文件, 和 gulp-ignore感觉类似
* [merge-stream](https://github.com/grncdr/merge-stream) - Merge multiple streams into one interleaved stream.
* [event-stream](https://github.com/dominictarr/event-stream) - 方便操作stream
* [gulp-plumber](https://github.com/floatdrop/gulp-plumber) - Prevent pipe breaking caused by errors.
* [gulp-notify](https://github.com/mikaelbr/gulp-notify) - 系统通知
* [gulp-changed](https://github.com/sindresorhus/gulp-changed) - 只通过修改过的文件
* [gulp-changed-in-place](https://github.com/alexgorbatchev/gulp-changed-in-place) - 只通过修改过的文件
	- 区别? gulp-changed 比较的是生成的文件, gulp-changed-in-place比较的是源文件, 复杂情况用后者. (比如需要babel的时候)
* [gulp-order](https://github.com/sirlantis/gulp-order) - 重新对文件进行排序 (引入顺序重要的话, 这个插件结合 event-stream 是神器)


## 代码校验
* [gulp-csslint](https://www.npmjs.com/package/gulp-csslint) - 通过[CSSLint](https://github.com/CSSLint/csslint)自动校验CSS.
* [gulp-eslint](https://github.com/adametry/gulp-eslint) - ECMAScript/JavaScript代码校验.

## Angular相关
* [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache) - 在$templateCache中联系并注册AngularJS模板
* [gulp-ng-html2js](https://github.com/marklagendijk/gulp-ng-html2js) - 将html转化为js文件, 感觉和 gulp-angular-templatecache 差不多
* [gulp-ng-annotate](https://github.com/Kagami/gulp-ng-annotate) - 自动添加依赖注入

## 其他
* [gulp-iife](https://github.com/mariusschulz/gulp-iife) - 将js文件包裹在一个立即执行函数中.
* [gulp-size](https://github.com/sindresorhus/gulp-size) - 输出文件打下
* [gulp-util](https://github.com/gulpjs/gulp-util) - 一些工具方法
* [gulp-replace](https://github.com/lazd/gulp-replace) - 字符串替换 (参考 如何替换掉babel生成的全局'use strict')
* [gulp-rename](https://github.com/hparra/gulp-rename) - 重命名文件
* [gulp-rev](https://github.com/sindresorhus/gulp-rev) -给静态文件打版本号 unicorn.css → unicorn-d41d8cd98f.css.
* [del](https://github.com/sindresorhus/del) - Delete files/folders using globs.
* [yargs](https://github.com/yargs/yargs) - 处理 process.argv
* [require-dir](https://github.com/aseemk/requireDir) 分离gulp任务到多个文件
* [browser-sync](https://github.com/BrowserSync/browser-sync) -同步多浏览器

## 文档
* [jsdoc](https://github.com/jsdoc3/jsdoc) - 生成js的API文档
* [docdash](https://github.com/clenemt/docdash) - 一款主题 


# 参考资料

+ [视频 JavaScript Build Automation With Gulp](pan.baidu.com/s/1i56ObbB)
+ [Gulp Github](https://github.com/gulpjs/gulp)
+ [Gulp 简体中文文档](https://github.com/lisposter/gulp-docs-zh-cn)
+ [Gulp 4 入门指南](https://github.com/baixing/FE-Blog/issues/7)
+ [Gulp 4.0](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md)
+ [awesome-gulp](https://github.com/alferov/awesome-gulp)
+ [awesome-gulp-cn](https://github.com/Pines-Cheng/awesome-gulp-cn)
+ [gulp-cheatsheet](https://github.com/osscafe/gulp-cheatsheet)
+ [gulp-patterns 一些Gulp任务的样例](https://github.com/johnpapa/gulp-patterns)
+ [gulp资料收集](https://github.com/Platform-CUF/use-gulp)
