### Run

```shell
cordova run browser

cordova platform remove android
cordova platform add android@13.0.0

adb uninstall com.zys.chartsketchtool
adb uninstall com.zys.chartsketchtool; cordova run android # PS
cordova build android
cordova run android

cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-x-toast
```

### Package and Release


```shell
# 打包发布：1. 打包；2. 对齐；3. 签名；4. 安装
# 1. 打包 默认会生成 aab 而不是 apk，需要命令指定
cordova build android --release -- --packageType=apk
cordova build android --release "--" --packageType=apk
# 打开 ChartSketchTool\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
# 2. 对齐
D:\Android\SDK\build-tools\34.0.0\zipalign.exe -p -f -v 4 app-release-unsigned.apk app-release-unsigned-aligned.apk
# 3. 签名 apksigner 在 align 之后签名，jarsigner 在 align 之前签名
# 生成 keystore (Java)，只需一次，可反复使用
keytool -genkey -v -alias zys.keystore -keyalg RSA -validity 4000 -keystore zys.keystore
# keytool -genkeypair -alias zys.keystore -keyalg RSA -validity 4000 -keystore zys.keystore
# 签名 (Java)
# jarsigner -verbose -keystore zys.keystore -signedjar app-signed.apk app-release-unsigned.apk zys.keystore
# jarsigner -verbose -keystore zys.keystore -signedjar app-signed-aligned.apk app-release-unsigned-aligned.apk zys.keystore
D:\Android\SDK\build-tools\34.0.0\apksigner.bat sign --ks zys.keystore --ks-key-alias zys.keystore --ks-pass pass:123456 --out app-release-signed-aligned.apk app-release-unsigned-aligned.apk
# 4. 安装
adb install app-release-signed-aligned.apk
```

### Develop Environment

- Cordova 12.0.0 (cordova-lib@12.0.2)
  - cordova-android 13.0.0
- Gradle 7.6.3
- JDK 17.0.11


### DEBUG

- [x] 序号撑不满整行：css不可在花括号内嵌套花括号
- [x] 插件不适用当前版本
- [x] 无法创建文件/申请不到存储权限
- [x] 前后切换时：文件系统加载失败/加载了错误的图表和正确的笔迹/加载完全错误
- [x] debug + signed, release, release + signed 无法安装
- [x] 加载65.png失败
- [x] 移动端打开输入法会改变页面大小触发重载
- [ ] 已存在的文件不可覆写，必须在设置授权
- [x] 保存键无用
- [x] 保存的svg读取有问题
- [ ] 撤销时会把svg背景一并撤销
- [x] 页面加载完成后无法调用获取文件的函数，调用alert会卡死
- [x] 向下拉选择框中添加缺少的选项时，无法添加在Create New User之前
- [ ] user.js中无法调用main.js的函数，可能是因为函数在load事件中
- [ ] 刚启动时以及切换用户后不能立即刷新画布