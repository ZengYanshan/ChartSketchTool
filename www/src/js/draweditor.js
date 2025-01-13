function insertCanvasHtml() {
    var canvasContainer = document.getElementById('canvas-container');

    // 根据父元素调整canvas大小
    // var canvasWidth = canvasContainer.width;
    // var canvasHeight = canvasContainer.height;

    // 根据窗口大小调整canvas大小
    if (window.innerWidth < window.innerHeight) {
        // 移动端
        var canvasWidth = window.innerWidth * 0.9;
        var canvasHeight = window.innerHeight * 0.4;
    } else {
        var canvasWidth = window.innerWidth * 0.5;
        var canvasHeight = window.innerHeight * 0.9;
    }

    const canvasHtml = `<canvas id="c" width="${canvasWidth}" height="${canvasHeight}"></canvas>`;
    canvasContainer.innerHTML = canvasHtml;
}

function dataURLtoBlob(dataURL) {
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

// 保存图片
function saveImage(dataURL) {
    console.log("dataURL", dataURL);
    if (confirm('Are you sure to save canvas?')) {
        var fileName = "canvas.png";
        var dataObj = dataURLtoBlob(dataURL);
        createAndWriteFile(path("files-external", fileName), dataObj);
    }
}

// 禁止移动端浏览器处理滑动手势
$(document).on("vmousemove", "body", function (e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
});

// 窗口大小改变时自动刷新
window.addEventListener("resize", (event) => {
    location.reload();
});


$(function () {
    // loader
    $(".loader").fadeOut(500, function () {
        $(".page_wrapper").show();
    });

    // create a canvas 创建画布
    insertCanvasHtml();
    var canvas = new fabric.Canvas('c', {
        isDrawingMode: true
    });
    var canvasState = [];
    var currentStateIndex = -1;
    var isUpdateOperation = true; // 防止撤销和恢复被存入画布状态栈
    function updateCanvasState() {
        if (isUpdateOperation) {
            const canvasAsJson = JSON.stringify(canvas.toJSON());
            canvasState.splice(currentStateIndex + 1);
            canvasState.push(canvasAsJson);
            currentStateIndex = canvasState.length - 1;
            console.log(canvasState, currentStateIndex, "update");
        } else {
            // isUpdateOperation = true;
        }
    }
    function loadCanvasState(stateIndex) {
        isUpdateOperation = false;
        canvas.loadFromJSON(canvasState[stateIndex], () => {
            canvas.renderAll();
            currentStateIndex = stateIndex;
            isUpdateOperation = true;
        });
        console.log(canvasState, currentStateIndex, "load");
    }
    function clearCanvasState() {
        canvasState = [];
        currentStateIndex = -1;
        isUpdateOperation = true;
    }
    function undoCanvas() {
        if (currentStateIndex > 0) {
            loadCanvasState(currentStateIndex - 1);
        }
    }
    function redoCanvas() {
        if (currentStateIndex < canvasState.length - 1) {
            loadCanvasState(currentStateIndex + 1);
        }
    }
    function clearCanvas() {
        if (confirm('Are you sure to clear canvas?')) {
            canvas.backgroundImage = false;
            canvas.clear();
            clearCanvasState();
        }
    }
    function addImgToCanvas(imgUrl) {
        // 向画布添加图片
        // 会触发object:added
        fabric.Image.fromURL(imgUrl, function (oImg) {
            // 若图片比画布大，缩小图片至正好能放入画布
            if (oImg.width > canvas.width || oImg.height > canvas.height) {
                var scale = Math.min(canvas.width / oImg.width, canvas.height / oImg.height);
                oImg.scale(scale);
            }
            canvas.add(oImg);
        });
    }
    function setCanvasBackgroundImage(imgUrl) {
        // 设置画布背景图片
        // 不触发object:added
        fabric.Image.fromURL(imgUrl, function (oImg) {
            // 若图片比画布大，缩小图片至正好能放入画布
            if (oImg.width > canvas.width || oImg.height > canvas.height) {
                var scale = Math.min(canvas.width / oImg.width, canvas.height / oImg.height);
                oImg.scale(scale);
            }
            // 居中放置背景图片
            canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
                originX: 'center',
                originY: 'center',
                left: canvas.width / 2,
                top: canvas.height / 2,
            });
        });
    }
    canvas.on("object:modified", updateCanvasState);
    canvas.on("object:added", updateCanvasState);

    // TEST
    var imgUrl = "./src/assets/test.png";
    setCanvasBackgroundImage(imgUrl);

    // defaut draw color
    $('.draw-color').minicolors({
        defaultValue: '#333',
    });

    // click button and start to draw
    $("#draw").click(function () {
        canvas.isDrawingMode = true;

        $(".draw-color").on("change", function () {
            var mycolor = $(".draw-color").val();
            canvas.freeDrawingBrush.color = mycolor;
            return false;
        });

        canvas.renderAll();
        $(this).addClass('active');
        $("#selection").removeClass('active');
        return false;
    });

    // click button to activate selection mode
    $("#draw").addClass('active');
    canvas.isDrawingMode = true;
    $("#selection").click(function () {
        canvas.isDrawingMode = false;
        $(this).addClass('active');
        $("#draw").removeClass('active');
        return false;
    });

    // update brush width 更改画笔粗细
    $("#range").on("change", function () {
        var rangeVal = $(this).val();
        $("#value").val(rangeVal);
        canvas.freeDrawingBrush.width = rangeVal;
        return false;
    });

    $("#value").on("keyup", function () {
        var rangeShownVal = $(this).val();
        if (rangeShownVal < 51) {
            $("#range").val(rangeShownVal);
            canvas.freeDrawingBrush.width = rangeShownVal;
        } else {
            alert("Max is 50");
            var rangeVal2 = $("#range").val();
            $("#value").val(rangeVal2);
        }
        return false;
    });

    // delete selected object 按钮
    function deleteObjects() {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            if (confirm('Are you sure?')) {
                canvas.remove(activeObject);
            }
        }
    };
    $("#delete").click(function () {
        deleteObjects();
        return false;
    });

    // undo 按钮
    $("#undo").click(undoCanvas);

    // redo 按钮
    $("#redo").click(redoCanvas);

    // clear 按钮
    $("#clear").click(clearCanvas);

    // save 按钮
    $("#save").click(function () {
        // 申请权限
        // let permissions = cordova.plugins.permissions;
        // let permissionList = [
        //     permissions.CAMERA,
        //     permissions.WRITE_EXTERNAL_STORAGE
        // ];
        // let acceptedCount = 0;
        // permissionList.forEach(perm => {
        //     permissions.checkPermission(perm, function (status) {
        //         if (status.hasPermission) {
        //             acceptedCount++;
        //             console.log('checkAppPermission: checkPermission: Current acceptedCount: ', acceptedCount);
        //             if (acceptedCount === permissionList.length) {
        //                 console.log('checkAppPermission: checkPermission: All permissions accepted.');
        //                 saveImage(canvas.toDataURL());
        //             }
        //         } else permissions.requestPermission(perm, function () {
        //             console.log('checkAppPermission: requestPermission: All permissions accepted.');
        //             saveImage(canvas.toDataURL());
        //         }, null);
        //     }, null);
        // });

        saveImage(canvas.toDataURL());

        // $("#save").attr("href", canvas.toDataURL());
        // console.log(canvas.toDataURL());
        // $("#save").attr("download", "draweditor");
    });
});

// 关闭网页前确认
// window.onbeforeunload = function (e) {
//     e = e || window.event;
//     if (e) {
//         e.returnValue = 'Sure?';
//     }
//     return 'Sure?';
// };