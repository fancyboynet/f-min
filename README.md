# f-min
***静态资源压缩工具***

适合对目录结构要求不高的场景，例如某个活动页面或者某个demo，开发完成后打包压缩整个静态资源后上传到服器上

# 支持的资源类型
1. .js 基于*gulp-uglify*
2. .(png|jpg|jpeg|gif) 基于*gulp-imagemin*
3. .css 基于*gulp-minify-css*

# 安装
```bash
$ npm install -g f-min
```
# 长时间安装不上尝试
```bash
$ npm install -g f-min --registry=https://registry.npm.taobao.org
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
