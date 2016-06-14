# 删除文件 del

## 简要介绍

这也是一个非常简单但是很常用的功能, 一般在构建一个项目的时候需要把构建目录先删除掉

## 有关插件

+ [del](https://github.com/sindresorhus/del)

## 使用说明

运行 `gulp copy` 查看 `build/`

运行 `gulp del` 查看 `build/`

这里需要注意一点, 当 `config.buildDir` 不在 `gulpfile` 所在的目录的话, 需要添加 `{force: true}` 参数来强制删除