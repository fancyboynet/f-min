# f-min
***静态资源压缩工具***

# 支持的资源类型
1. .js 基于*gulp-uglify*
2. .(png|jpg|jpeg|gif) 基于*gulp-imagemin*
3. .css 基于*gulp-minify-css*

# 安装
```bash
$ npm install -g f-min
```
# 使用
```bash
$ cd ... //定位到某个目录下
$ fmin [-s] [-d] //执行压缩
```
#举例
```bash
$ fmin -s src -d build
```