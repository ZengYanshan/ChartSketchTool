function path(dir, name) {
    if (dir == "download") {
        dir = "Download/";
    } else if (dir == "files-external") {
        dir = cordova.file.externalDataDirectory.replace(cordova.file.externalRootDirectory, '');
    }
    return dir + name;
}

function dataURL2Blob(dataURL) {
    var arr = dataURL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime })
}

// 保存sketched.png
function writeSketchedImage(fileName, dataUrl) {
    var dataObj = dataURL2Blob(dataUrl);

    var privatePath = path("files-external", fileName);

    // var publicPath = path("download", fileName);
    var publicDir = "Download/" + "ChartSketchTool";
    var publicPath = publicDir + "/" + fileName;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        // 保存到沙箱
        fs.root.getFile(privatePath, { create: true, exclusive: false },
            function (fileEntry) {
                writeFile(fileEntry, dataObj, 
                    function () {
                        // toast("文件写入成功");
                    },
                    onErrorWriteFile
                );
            }, onErrorCreateFile
        );

        // 保存到外部
        fs.root.getDirectory(publicDir, { create: true }, function (dirEntry) {
            dirEntry.getFile(fileName, { create: true, exclusive: false },
                function (fileEntry) {
                    writeFile(fileEntry, dataObj, 
                        function () {
                            toast("save to " + publicPath);
                        },
                        onErrorWriteFile
                    );
                }, onErrorCreateFile
            );
        }, onErrorGetDir);
        
    }, onErrorLoadFs);
}

// 创建文件夹
function createDir(dirPath) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getDirectory(dirPath, { create: true }, function (dirEntry) {
            // toast("创建文件夹成功：" + dirEntry.fullPath);
        }, onErrorGetDir);
    }, onErrorLoadFs);
}

// 创建并写入文件
function createAndWriteFile(filePath, dataObj) {
    // 持久化数据保存
    // toast("保存位置：" + filePath);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        // toast('打开的文件系统: ' + fs.name);

        // var absPath = cordova.file.externalRootDirectory;
        // var fileDir = cordova.file.externalDataDirectory.replace(cordova.file.externalRootDirectory, '');
        // var filePath = fileDir + fileName;

        fs.root.getFile(filePath, { create: true, exclusive: false },
            function (fileEntry) {

                // toast("是否是文件？" + fileEntry.isFile.toString());
                // fileEntry.name == 'hello.txt'
                // fileEntry.fullPath == '/hello.txt'
                //文件内容
                // var dataObj = new Blob(['Hello, World!'], { type: 'text/plain' });
                //写入文件
                writeFile(fileEntry, dataObj, 
                    function () {
                        // toast("文件写入成功");
                    },
                    onErrorWriteFile
                );

            }, onErrorCreateFile
        );

    }, onErrorLoadFs);
}

// 读取保存的Canvas图片
function readCanvasImage(filePath, successCallback, errorCallback) {
    // toast("位置：" + filePath);

    // 数据读取
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        // toast('打开的文件系统: ' + fs.name);

        fs.root.getFile(filePath, { create: false }, function (fileEntry) {
            // 读取文件
            // fileEntry.file(function (file) {
            //     var reader = new FileReader();
            //     reader.onloadend = function () {
            //         toast("读取文件完成：" + this.result);
            //         successCallback(this.result);
            //     };
            //     reader.readAsDataURL(file);
            // }, errorCallback());

            successCallback(fileEntry.toURL());

        }, errorCallback("file not found"));

    }, errorCallback("文件系统加载失败"));
}

// 写文件
function writeFile(fileEntry, dataObj, successCallback, errorCallback) {
    // 创建一个写入对象
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwrite = function () {
            successCallback();
        };

        fileWriter.onerror = function (e) {
            errorCallback(e);
        };

        fileWriter.write(dataObj);
    });
}

// 读文件 DataUrl
function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {
            toast("读取文件完成：" + this.result);
        };

        reader.readAsDataURL(file);

    }, onErrorReadFile);
}

// 文件夹创建失败回调
function onErrorGetDir(error) {
    toast("failed to get/create directory", error.toString());
}

// 文件创建失败回调
function onErrorCreateFile(error) {
    toast("failed to create file", error.toString());
}

// FileSystem加载失败回调
function onErrorLoadFs(error) {
    toast("failed to load file system", error.toString());
}

// 文件读取失败回调
function onErrorReadFile(error) {
    toast("failed to read file", error.toString());
}

// 文件写入失败回调
function onErrorWriteFile(error) {
    toast("failed to write file", error.toString());
}