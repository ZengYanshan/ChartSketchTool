var currentUsername = "user";

function path(dir, name) {
    if (dir == "download") {
        dir = "Download/";
    } else if (dir == "files-external") {
        dir = cordova.file.externalDataDirectory.replace(cordova.file.externalRootDirectory, '');
    }
    return dir + name;
}

function minifySvg(svgString) {
    // 使用正则表达式去除空格、制表符、换行符和回车符，但保留标签之间的空格
    return svgString
        .replace(/>\s+</g, '><') // 去除标签之间的空白符
        .replace(/[\t\n\r]/g, '') // 去除制表符、换行符和回车符
        .replace(/\s{2,}/g, ' ') // 将多个空格替换为单个空格
        ;
}

function removeDesc(svg) {
    // 删除 <desc> 标签（<desc>Created with Fabric.js 1.6.3</desc>）
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const descElement = doc.querySelector('desc');
    if (descElement) {
        descElement.remove();
    }
    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);
    return modifiedHtmlString;
}

function convertTspansToText(svg) {
    // 创建DOMParser实例
    const parser = new DOMParser();

    // 解析HTML字符串
    const doc = parser.parseFromString(svg, 'image/svg+xml');

    // 查找所有的<text>元素
    const textElements = doc.querySelectorAll('text');

    textElements.forEach(textElement => {
        // 查找<text>元素内的所有<tspan>元素
        const tspanElements = textElement.querySelectorAll('tspan');

        tspanElements.forEach(tspanElement => {
            // 获取<tspan>的文本内容
            const textContent = tspanElement.textContent;

            // 复制<tspan>的x和y属性到<text>
            if (tspanElement.hasAttribute('x')) {
                if (textElement.hasAttribute('x')) {
                    textElement.setAttribute('x', `${parseFloat(textElement.getAttribute('x'))
                        + parseFloat(tspanElement.getAttribute('x'))}`
                    );
                } else {
                    textElement.setAttribute('x', tspanElement.getAttribute('x'));
                }
            }
            if (tspanElement.hasAttribute('y')) {
                if (textElement.hasAttribute('y')) {
                    textElement.setAttribute('y', `${parseFloat(textElement.getAttribute('y'))
                        + parseFloat(tspanElement.getAttribute('y'))}`
                    );
                }
                else {
                    textElement.setAttribute('y', tspanElement.getAttribute('y'));
                }
            }

            // 将<tspan>的文本内容设置到<text>元素中
            textElement.textContent = textContent;

            // 移除<tspan>元素
            tspanElement.remove();

            // 注意：<text>元素内的所有其他子元素（如果有的话）都被删除，该函数仅适用于本项目情况
        });
    });

    // 序列化修改后的DOM
    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);
    return modifiedHtmlString;
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

function svg2Blob(svg) {
    var blob = new Blob([svg], { type: 'image/svg+xml' });
    return blob;
}

// 保存sketched.svg
function writeSketchedImage(fileName, data) {
    // 准备数据
    // var dataObj = dataURL2Blob(data);
    var newSvg = minifySvg(convertTspansToText(removeDesc(data))); // DEBUG：修复fabric.js文本偏移问题
    // alert("newSvg: " + newSvg);
    var dataObj = svg2Blob(newSvg);

    // 准备路径
    var privateDir = path("files-external", currentUsername);
    var publicRootDir = "Download/ChartSketchTool";
    // var publicPath = `${publicRootDir}/${currentUsername}/${fileName}`;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        // 保存到沙箱
        fs.root.getDirectory(privateDir, { create: true },
            function (dirEntry) {
                dirEntry.getFile(fileName, { create: true, exclusive: false },
                    function (fileEntry) {
                        writeFile(fileEntry, dataObj,
                            function () {
                                // toast("文件写入成功");
                            }, onErrorWriteFile
                        );
                    }, onErrorCreateFile
                );
            }, onErrorGetDir
        );

        // 保存到外部
        fs.root.getDirectory(publicRootDir, { create: true },
            function (rootDirEntry) {
                rootDirEntry.getDirectory(currentUsername, { create: true },
                    function (dirEntry) {
                        dirEntry.getFile(fileName, { create: true, exclusive: false },
                            function (fileEntry) {
                                writeFile(fileEntry, dataObj,
                                    function () {
                                        toast("save to " + fileEntry.fullPath.toString());
                                    }, onErrorWriteFile
                                );
                            }, onErrorCreateFile
                        );
                    })
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
function readCanvasImage(fileName, successCallback, errorCallback) {
    // 路径准备
    var filePath = path("files-external", `${currentUsername}/${fileName}`);

    // 数据读取
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        fs.root.getFile(filePath, { create: false }, function (fileEntry) {
            // 读取文件
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    toast("读取文件完成：" + this.result);
                    successCallback(this.result, "svg");
                };
                // file.type == 'image/svg+xml')
                reader.readAsText(file);
            }, errorCallback());

            // alert("读取结果：", fileEntry.toURL());
            // successCallback(fileEntry.toURL(), "png");

        }, errorCallback("file not found"));

    }, errorCallback("文件系统加载失败"));
}

// 读取目录名列表
function listDir(successCallback) {
    // alert("正在读取文件列表……");

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        // DEBUG：不能直接使用 fs.root，而要根据其路径重新获取一个 DirectoryEntry
        var rootDirPath = path("files-external", "");
        fs.root.getDirectory(rootDirPath, { create: false }, function (dirEntry) {
            var rootDirReader = dirEntry.createReader();
            rootDirReader.readEntries(
                function (entries) {
                    // alert(`成功取得长度为${entries.length}的Entry[]`);

                    var dirList = [];
                    entries.forEach(function (entry) {
                        if (entry.isDirectory) {
                            dirList.push(entry.name.toString());
                        }
                    });
                    successCallback(dirList);
                },
                onErrorReadDir
            );
        }, onErrorGetDir);

    }, onErrorLoadFs);
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

function onErrorReadDir(error) {
    toast("failed to read directory", error.toString());
}