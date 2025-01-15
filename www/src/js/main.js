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

// 禁止移动端浏览器处理滑动手势
$(document).on("vmousemove", "body", function (e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
});

// 窗口大小改变时自动刷新
// DEBUG 移动端打开输入法会改变页面大小触发重载
// window.addEventListener("resize", (event) => {
//     location.reload();
// });

// 横竖屏反转时自动刷新
// window.addEventListener("orientationchange", (event) => {
//     location.reload();
// })

// -------------------------global-------------------------
const maxId = insight_nvBench.length;
var currentId = 1;
var currentInsightObj;
const maxBrushWidth = 36;
var defaultBrush = "#ea484d05"; // 前六位为颜色，后二位转为粗细


$(function () {
    // loader
    $(".loader").fadeOut(500, function () {
        $(".page_wrapper").show();
    });





    // -------------------------nvBench-------------------------

    function datasetImgUrl() {
        // 4.png
        var imgUrl = `./src/assets/dataset/png/${currentInsightObj.key}.png`;
        // console.log("img url: ", imgUrl);
        return imgUrl;
    }
    function canvasFileName() {
        // 4_1_sketched.png
        var fileName = `${currentId}_${currentInsightObj.key}_sketched.png`;
        return fileName;
    }
    $("#max-id").text(maxId);



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

            setCanvasBackgroundImage(datasetImgUrl());
            updateCanvasState();
            saveCanvas();

        }
    }
    function saveCanvas() {
        writeSketchedImage(canvasFileName(), canvas.toDataURL());
    }
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
    function loadCanvasImage() {
        canvas.backgroundImage = false;
        canvas.clear();
        setCanvasBackgroundImage(datasetImgUrl()); // 先设置图，防止读取失败没有图
        try {
            readCanvasImage(
                path("files-external", canvasFileName()),
                setCanvasBackgroundImage,
                function (error) {
                    // alert(error);
                    // throw new Error(error);
                }
            )
        } catch (e) {
            console.log(e);
            setCanvasBackgroundImage(datasetImgUrl());
            updateCanvasState();
        }
        updateCanvasState();
    }
    function setCanvasBrushColor(color) {
        canvas.freeDrawingBrush.color = color;
    }
    function setCanvasBrushWidth(width) {
        canvas.freeDrawingBrush.width = width;
    }
    canvas.on("object:modified", updateCanvasState);
    canvas.on("object:added", updateCanvasState);
    // undo 按钮
    $("#undo").click(undoCanvas);
    // redo 按钮
    $("#redo").click(redoCanvas);
    // clear 按钮
    $("#clear").click(clearCanvas);
    // save 按钮
    $("#save").click(function () {
        saveCanvas();

        // $("#save").attr("href", canvas.toDataURL());
        // console.log(canvas.toDataURL());
        // $("#save").attr("download", "canvas");
    });
    // 导出按钮
    // $("#export").click(function () {
    //     readCanvasImage(
    //         path("files-external", canvasFileName()),
    //         setCanvasBackgroundImage,
    //         function (error) {
    //             toast(error);
    //         }
    //     );
    // });
    // 初始化
    // loadCanvasImage();

    // -------------------------Insight-------------------------

    function updateInsight(id) {
        // 保存上一图
        // saveCanvas();

        // 更新currentId, currentInsightObj
        currentId = id;
        currentInsightObj = insight_nvBench[currentId - 1]; // 数组下标从 0 开始

        // 更新页面文本
        $("#current-id").val(currentId);
        $("#insight-text-id").text(currentInsightObj.key);
        $("#insight-text-type").text(currentInsightObj.type);
        $("#insight-text-description").text(currentInsightObj.description);

        // 读入下一图
        loadCanvasImage();
    }
    function previousInsight() {
        // console.log(typeof currentId, currentId); // string
        currentId = parseInt(currentId);
        if (currentId > 1) {
            // 保存当前图
            saveCanvas();
            // 更新上一图
            updateInsight(currentId - 1);
        }
    }
    function nextInsight() {
        // console.log(typeof currentId, currentId); // string
        currentId = parseInt(currentId);
        if (currentId < maxId) {
            // 保存当前图
            saveCanvas();
            // 更新下一图
            updateInsight(currentId + 1);
        }
    }
    $("#previous").click(previousInsight);
    $("#next").click(nextInsight);
    // 初始化
    updateInsight(1);

    // -------------------------Color Picker-------------------------
    var colorPicker = new iro.ColorPicker('#color-picker', {
        color: defaultBrush,
        // padding: 0,
        margin: 5,
        // borderWidth: 5,
        layout: [
            {
                component: iro.ui.Box,
                options: {}
            },
            {
                component: iro.ui.Slider,
                options: {
                    // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                    sliderType: 'hue'
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: 'alpha'
                }
            },
        ]
    });
    colorPicker.on(['color:init', 'color:change'], function (color) {
        // 颜色选择器事件
        // 改变全局颜色
        var brushColor = color.hexString;
        setCanvasBrushColor(brushColor);
        $("#brush").attr("fill", brushColor);
        // $("#pick-brush").css("border-color", brushColor); // 改变#pick-brush border 颜色
        // 改变全局粗细
        const base = 0.03;
        var brushWidth = (base + color.alpha * (1.00 - base)) * maxBrushWidth;
        setCanvasBrushWidth(brushWidth);
        $("#brush").attr("r", brushWidth / 2);
    });
    // 点击按钮显示/隐藏选择器
    $("#pick-brush").click(function () {
        $("#color-picker").toggle();
    });

    // 输入编号并回车，跳转到对应编号
    $('#current-id').bind('change keyup input', function (e) {
        var key = e.which;
        if (key == 13) {
            var inputCurrentId = $("#current-id").val();
            if (inputCurrentId > 0 && inputCurrentId <= maxId) {
                updateInsight(inputCurrentId);
            }
        }
    });

    // update brush width 更改画笔粗细
    // $("#range").on("change", function () {
    //     var rangeVal = $(this).val();
    //     $("#value").val(rangeVal);
    //     canvas.freeDrawingBrush.width = rangeVal;
    //     return false;
    // });

    // $("#value").on("keyup", function () {
    //     var rangeShownVal = $(this).val();
    //     if (rangeShownVal < 51) {
    //         $("#range").val(rangeShownVal);
    //         canvas.freeDrawingBrush.width = rangeShownVal;
    //     } else {
    //         toast("Max is 50");
    //         var rangeVal2 = $("#range").val();
    //         $("#value").val(rangeVal2);
    //     }
    //     return false;
    // });
});

// 关闭网页前确认
// window.onbeforeunload = function (e) {
//     e = e || window.event;
//     if (e) {
//         e.returnValue = 'Sure?';
//     }
//     return 'Sure?';
// };