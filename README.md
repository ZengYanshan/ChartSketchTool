```shell
cordova run browser

cordova platform remove android
cordova platform add android@12.0.1
adb uninstall com.zys.chartsketchtool
cordova build android
cordova run android
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-x-toast
cordova plugin add cordova-plugin-android-permissions
cordova plugin add cordova.plugins.diagnostic
```

### Develop Environment

- Cordova 12.0.0 (cordova-lib@12.0.2)
  - cordova-android 13.0.0
- Gradle 7.6.3
- JDK 17.0.11

TODO:
- [ ] 序号撑不满整行
- [x] 插件不适用当前版本
- [x] 无法创建文件/申请不到存储权限
- [ ] 前后切换时：文件系统加载失败/加载了错误的图表和正确的笔迹/加载完全错误