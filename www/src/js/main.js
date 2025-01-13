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

    // -------------------------global-------------------------



    // -------------------------nvBench-------------------------
    var currentInsightObj = {
        "index": 0,
        "nvBench_key": "key",
        "description": "description",
        "vega_lite": null,
    };
    var imgUrl = "./src/assets/test.png"; // TEST
    function canvasFileName() {
        var fileName = `${currentInsightObj.nvBench_key}_${currentInsightObj.index}.png`;
        return fileName;
    }
    function updateText() {
        // document.getElementById("insight-text-id").innerHTML = currentInsightObj.nvBench_key;
        $("#insight-text-id").text(currentInsightObj.nvBench_key);
        $("#insight-text-description").text(currentInsightObj.description);
    }
    updateText();
    // var nvBenchDataKeys = Object.keys(nvBench_insight);
    // console.log("nvBench keys", nvBenchDataKeys);


    // -------------------------Canvas-------------------------
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

            setCanvasBackgroundImage(imgUrl);
            saveCanvas(canvas.toDataURL());
            updateCanvasState();
        }
    }
    function saveCanvas(dataURL) {
        console.log("dataURL", dataURL);
        if (confirm('Are you sure to save canvas?')) {
            var fileName = `${currentInsightObj.nvBench_key}_${currentInsightObj.index}.png`;
            var dataObj = dataURL2Blob(dataURL);
            createAndWriteFile(path("files-external", fileName), dataObj);
        }
    }
    // function addImgToCanvas(imgUrl) {
    //     // 向画布添加图片
    //     // 会触发object:added
    //     fabric.Image.fromURL(imgUrl, function (oImg) {
    //         // 若图片比画布大，缩小图片至正好能放入画布
    //         if (oImg.width > canvas.width || oImg.height > canvas.height) {
    //             var scale = Math.min(canvas.width / oImg.width, canvas.height / oImg.height);
    //             oImg.scale(scale);
    //         }
    //         canvas.add(oImg);
    //     });
    // }
    function setCanvasBackgroundImage(img) {
        // 设置画布背景图片
        // 不触发object:added
        // img：img.src | dataURL

        fabric.Image.fromURL(img, function (oImg) {
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
                backgroundImageStretch: false
            });
        }, { crossOrigin: 'anonymous' });
    }
    function setCanvasBrushColor(color) {
        canvas.freeDrawingBrush.color = color;
    }
    function setCanvasBrushWidth(width) {
        canvas.freeDrawingBrush.width = width;
    }
    canvas.on("object:modified", updateCanvasState);
    canvas.on("object:added", updateCanvasState);
    // 初始化
    readCanvasImage(
        path("files-external", canvasFileName()),
        setCanvasBackgroundImage,
        function (error) {
            // TEST
            alert(error);
            setCanvasBackgroundImage(imgUrl);
        }
    )
    updateCanvasState();
    setCanvasBrushColor("#ea484d");
    setCanvasBrushWidth(10);

    // defaut draw color
    $('.draw-color').minicolors({
        defaultValue: '#333',
    });

    // click button and start to draw
    $("#draw").click(function () {
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
    // function deleteObjects() {
    //     var activeObject = canvas.getActiveObject(),
    //         activeGroup = canvas.getActiveGroup();
    //     if (activeObject) {
    //         if (confirm('Are you sure?')) {
    //             canvas.remove(activeObject);
    //         }
    //     }
    // };
    // $("#delete").click(function () {
    //     deleteObjects();
    //     return false;
    // });

    // undo 按钮
    $("#undo").click(undoCanvas);

    // redo 按钮
    $("#redo").click(redoCanvas);

    // clear 按钮
    $("#clear").click(function () {
        clearCanvas();
    });

    // save 按钮
    $("#save").click(function () {
        saveCanvas(canvas.toDataURL());

        // $("#save").attr("href", canvas.toDataURL());
        // console.log(canvas.toDataURL());
        // $("#save").attr("download", "canvas");
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