# 使用命令行参数(yargs) 来控制任务逻辑 (gulp-if) (选择性压缩文件和生成sourcemap)

## 简要介绍

使用命令行参数来控制 gulp 任务的逻辑, 可以大大减少任务的个数.

## 推荐程度 5颗星

## 有关插件

+ [yargs](https://github.com/yargs/yargs) - With yargs, the options be just a hash!
+ [gulp-if](https://github.com/robrich/gulp-if) - Conditionally run a task
+ [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) - Source map support for Gulp.js
+ [gulp-clean-css](https://github.com/scniro/gulp-clean-css) - Minify css with clean-css.

## 使用说明

分别使用如下命令查看 `build/` 下生成的文件

```
gulp
gulp --minify
gulp --soucemaps --minify
```

可以发现最后一个命令生成了两个文件

```
recipes/yargs/build
├── test.css
└── test.css.map
```

回答源码

```
var config = {
    sourcemaps: argv.s || argv.sourcemaps,
    minify: argv.minify
}

```

这里 `argv.s`, `argv.sourcemaps` 表示如果命令行中出现 `-s` 或者 `--sourcemaps` 那么 `config.sourcemaps`
将会置为 `true` 如果命令行参数不出现的话, 置为 `undefined`.

当然命令行参数也可以跟具体值 比如 `--max=10` 那么 `argv.max` 即为 `'10'`.

不过我们这里只是希望获得一些命令.

紧接着


`gulpIf` 这个插件

`gulpif(condition, stream [, elseStream, [, minimatchOptions]])`

可以根据第一个参数 condition:

> Type: boolean or [stat](https://nodejs.org/api/fs.html#fs_class_fs_stats) object
> or function that takes in a vinyl file and returns a boolean
> or RegularExpression that works on the file.path

来决定是否执行 stream, 或者 elseStream.

在这个例子当中

```
    .pipe(gulpIf(config.sourcemaps, sourcemaps.init()))
    .pipe(gulpIf(config.sourcemaps, sourcemaps.write('.')))
```

我们在 `sass` 插件进行处理之前根据命令行参数 `argv.s` 或者 `argv.sourcemaps` 来决定是否生成 sourcemap.

注意 `gulp-sourcemaps` 需要在源文件进行任何插件处理前先初始化, 然后最后将 sourcemap 输出.

还有一处

```
    .pipe(gulpIf(config.minify, cleanCSS()))
```

根据 `argv.minify` 来决定是否进行压缩.
