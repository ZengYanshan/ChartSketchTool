### Run

```shell
# 在浏览器运行
cordova run browser

# 在 Android 移动端运行
# 初次运行项目需安装插件
cordova platform add android@13.0.0
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-x-toast
cordova build android
# 运行
cordova run android
# 卸载重装
adb uninstall com.zys.chartsketchtool; cordova run android # PS
```

### Package and Release


```shell
# 打包发布：1. 打包；2. 对齐；3. 签名；4. 安装

# 1. 打包 默认会生成 aab 而不是 apk，需要命令指定
cordova build android --release -- --packageType=apk
cordova build android --release "--" --packageType=apk # PS

# 2. 对齐
cd ./platforms/android/app/build/outputs/apk/release
path/to/zipalign -p -f -v 4 app-release-unsigned.apk app-release-unsigned-aligned.apk # D:\Android\SDK\build-tools\34.0.0\zipalign.exe

# 3. 签名 apksigner 在 align 之后签名，jarsigner 在 align 之前签名
# 生成 keystore (Java)，只需一次，可反复使用
keytool -genkey -v -alias keyname.keystore -keyalg RSA -validity 4000 -keystore keyname.keystore
# 签名 (Java)
# jarsigner -verbose -keystore keyname.keystore -signedjar app-signed.apk app-release-unsigned.apk keyname.keystore
# jarsigner -verbose -keystore keyname.keystore -signedjar app-signed-aligned.apk app-release-unsigned-aligned.apk keyname.keystore
path/to/apksigner sign --ks keyname.keystore --ks-key-alias keyname.keystore --ks-pass pass:yourpassword --out app-release-signed-aligned.apk app-release-unsigned-aligned.apk # D:\Android\SDK\build-tools\34.0.0\apksigner.bat

# 4. 安装
adb uninstall com.zys.chartsketchtool # 卸载已安装的 APP
adb install app-release-signed-aligned.apk
```

### Develop Environment

- Cordova 12.0.0 (cordova-lib@12.0.2)
  - cordova-android 13.0.0
- Gradle 7.6.3
- JDK 17.0.11

