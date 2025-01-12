function path(dir, name) {
    if (dir == "download") {
        dir = "Download/";
    } else if (dir == "files-external") {
        dir = cordova.file.externalDataDirectory.replace(cordova.file.externalRootDirectory, '');
    }
    return dir + name;
}

// 创建并写入文件
function createAndWriteFile(filePath, dataObj) {
    // 持久化数据保存
    alert("保存位置：" + filePath);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        alert('打开的文件系统: ' + fs.name);

        // var absPath = cordova.file.externalRootDirectory;
        // var fileDir = cordova.file.externalDataDirectory.replace(cordova.file.externalRootDirectory, '');
        // var filePath = fileDir + fileName;

        fs.root.getFile(filePath, { create: true, exclusive: false },
            function (fileEntry) {

                alert("是否是文件？" + fileEntry.isFile.toString());
                // fileEntry.name == 'hello.txt'
                // fileEntry.fullPath == '/hello.txt'
                //文件内容
                // var dataObj = new Blob(['Hello, World!'], { type: 'text/plain' });
                //写入文件
                writeFile(fileEntry, dataObj);

            }, onErrorCreateFile);

    }, onErrorLoadFs);
}

// 写文件
function writeFile(fileEntry, dataObj) {
    // 创建一个写入对象
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwrite = function () {
            alert("Successful file write...");
            // readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            alert("Failed file write: " + e.toString());
        };

        // TEST 若无数据，编造一些数据
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
        alert("写入文件完成：" + fileEntry.fullPath);
    });
}

// 读文件
function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {
            alert("读取文件完成：" + this.result);
            displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}

// 显示文件数据
function displayFileData(data) {
    // alert(data);
}

// 文件创建失败回调
function onErrorCreateFile(error) {
    alert("文件创建失败", error.toString());
}

// FileSystem加载失败回调
function onErrorLoadFs(error) {
    alert("文件系统加载失败", error.toString());
}

// 文件读取失败回调
function onErrorReadFile(error) {
    alert("文件读取失败", error.toString());
}