```shell
cordova run browser

cordova platform remove android
cordova platform add android@13.0.0

adb uninstall com.zys.chartsketchtool
cordova build android
cordova run android

cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-x-toast
# 打包发布，默认会生成 aab 而不是 apk
cordova build android --release -- --packageType=apk
# 打开 ChartSketchTool\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
# 生成 keystore (Java)
keytool -genkeypair -alias zys.keystore -keyalg RSA -validity 4000 -keystore zys.keystore
# 签名 (Java)
jarsigner -verbose -keystore zys.keystore -signedjar app-signed.apk app-release-unsigned.apk zys.keystore
```

### Develop Environment

- Cordova 12.0.0 (cordova-lib@12.0.2)
  - cordova-android 13.0.0
- Gradle 7.6.3
- JDK 17.0.11

TODO:
- [x] 序号撑不满整行：css不可在花括号内嵌套花括号
- [x] 插件不适用当前版本
- [x] 无法创建文件/申请不到存储权限
- [x] 前后切换时：文件系统加载失败/加载了错误的图表和正确的笔迹/加载完全错误
- [ ] debug + signed, release, release + signed 无法安装
- [ ] 加载65.png失败
- [x] 移动端打开输入法会改变页面大小触发重载
- [ ] 已存在的文件不可覆写
- [ ] 保存键无用
- [ ] 保存的svg读取有问题