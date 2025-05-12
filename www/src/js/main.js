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

var flagInitFinish = false; // 初始化完成标志
const insight_dataset = insight_ChartToText;
const maxId = insight_dataset.length;
var currentId = 1;
var currentInsightObj;
const maxBrushWidth = 36;
var defaultBrush = "#ea484d05"; // 前六位为颜色，后二位转为粗细

// -------------------------Canvas-------------------------

var canvas = null;
var canvasState = [];
var currentStateIndex = -1;
var isUpdateOperation = true; // 防止撤销和恢复被存入画布状态栈

// -------------------------global-------------------------

function datasetUrl() {
    // 4.svg
    // var url = `./src/assets/dataset/svg/${currentInsightObj.key}.svg`;

    // 4_vega_lite.json
    // var url = `./src/assets/dataset/vega_lite/${currentInsightObj.key}_vega_lite.json`;

    // {"width": 200, "height": 150, "data": {"values": [{"category": "AssocProf", "value": 2}, {"category": "AsstProf", "value": 18}, {"category": "Professor", "value": 14}]}, "mark": {"type": "arc", "innerRadius": 5, "stroke": "#fff"}, "encoding": {"theta": {"field": "value", "type": "quantitative", "stack": true}, "color": {"field": "category", "type": "nominal", "scale": {"domain": ["AssocProf", "AsstProf", "Professor"]}, "legend": {"orient": "bottom", "title": null, "symbolType": "square", "direction": "horizontal", "values": ["AsstProf", "Professor"]}}, "order": {"field": "value", "type": "quantitative", "sort": "descending"}, "radius": {"field": "value", "scale": {"type": "linear", "zero": true, "rangeMin": 20}}, "tooltip": [{"field": "category", "type": "nominal"}, {"field": "value", "type": "quantitative"}]}, "config": {"legend": {"layout": {"anchor": "middle", "padding": 10}}}}
    var url = insight_dataset[currentId - 1].vega_lite;

    // chart to text 1.png
    // var url = `./src/assets/dataset/chart-to-text/imgs/${currentInsightObj.key}.png`;

    return url;
}
function canvasFileName() {
    // 4_1_sketched.svg
    var fileName = `${currentId}_${currentInsightObj.key}_sketched.svg`;
    return fileName;
}

function correctInsightFileName() {
    // 4_1_correct_insight.txt
    var filename = `${currentId}_${currentInsightObj.key}_correct_insight.txt`;
    return filename;
}


function vegaLiteSpecToSvg(vlSpec, successCallback) {
    // 输入：
    // vlSpec：vega_lite JSON 对象
    // successCallback：成功回调函数，参数为 svg 字符串
    vegaEmbed('#view', vlSpec).then(function (result) {
        // alert("vegaEmbed");
        var view = result.view;
        view.toSVG().then(function (svg) {
            // console.log(svg);
            // toast(svg);
            svg = minifySvg(convertTspansToText(removeDesc(svg)));
            successCallback(svg);
            // return svg;

            // 下载 svg
            // const filename = 'chart.svg';
            // const url = 'data:image/svg+xml,' + encodeURIComponent(svg);
            // const link = document.createElement('a');
            // link.setAttribute('href', url);
            // link.setAttribute('target', '_blank');
            // link.setAttribute('download', filename);
            // link.dispatchEvent(new MouseEvent('click'));
        }).catch(function (error) {
            alert(error);
        });
    });
}

function updateCorrectInsight() {
    // 查找文件以判断是否已标为不良数据；换页触发更新
    readCorrectInsight(correctInsightFileName(),
        function (correctInsightJson) {
            // 解析 JSON
            let correctInsightObj = JSON.parse(correctInsightJson);

            // 更新页面提示文本
            $("#prompt-correct-insight").text("Insight text has been corrected. Click edit button to change it.");
            // insight 文本颜色变淡，显示删除线，显示修改信息
            // 修改 description
            if (correctInsightObj.description != "" && correctInsightObj.description != currentInsightObj.description) {
                $("#insight-text-description").css("opacity", "0.8");
                $("#insight-text-description").css("text-decoration-line", "line-through");
                $("#insight-text-correct-description").text(correctInsightObj.description);
            } else {
                $("#insight-text-description").css("opacity", "1");
                $("#insight-text-description").css("text-decoration-line", "none");
                $("#insight-text-correct-description").text("");
            }
            // 修改 type
            if (correctInsightObj.type != "" && correctInsightObj.type != currentInsightObj.type) {
                $("#insight-text-type").css("opacity", "0.8");
                $("#insight-text-type").css("text-decoration-line", "line-through");
                $("#insight-text-correct-type").text(correctInsightObj.type);
            } else {
                $("#insight-text-type").css("opacity", "1");
                $("#insight-text-type").css("text-decoration-line", "none");
                $("#insight-text-correct-type").text("");
            }

            // 更新纠正编辑
            // $("#prompt-report-bad-data").text("Marked as bad data. Change it?");
            $("#select-type").val(correctInsightObj.type);
            $("#correct-description").val(correctInsightObj.description);
        },
        function () {
            // 更新页面提示文本
            $("#prompt-correct-insight").text("If there is something wrong, click edit button to correct it.");
            // 修改 description
            $("#insight-text-description").css("opacity", "1");
            $("#insight-text-description").css("text-decoration-line", "none");
            $("#insight-text-correct-description").text("");
            // 修改 type
            $("#insight-text-type").css("opacity", "1");
            $("#insight-text-type").css("text-decoration-line", "none");
            $("#insight-text-correct-type").text("");

            // 更新纠正编辑
            // $("#prompt-report-bad-data").text("Mark it as bad data?");
            $("#select-type").val(currentInsightObj.type);
            $("#correct-description").val("");
        }
    );
}

// -------------------------Canvas-------------------------

function updateCanvasState() {
    if (isUpdateOperation) {
        // let canvasStateSerialization = JSON.stringify(canvas.toJSON());
        canvasStateSerialization = minifySvg(convertTspansToText(removeDesc(canvas.toSVG())));
        canvasState.splice(currentStateIndex + 1);
        canvasState.push(canvasStateSerialization);
        currentStateIndex = canvasState.length - 1;
        console.log(canvasState, currentStateIndex, "update");
    } else {
        // isUpdateOperation = true;
    }
}
function loadCanvasState(stateIndex) {
    // console.log("call loadCanvasState(", stateIndex, ")");
    isUpdateOperation = false;
    // canvas.loadFromJSON(JSON.parse(canvasState[stateIndex]), () => {
    //     canvas.renderAll();

    //     // DEBUG
    //     // try {
    //     //     readCanvasImage(
    //     //         canvasFileName(),
    //     //         setCanvasBackgroundImage,
    //     //         function (error) {
    //     //             setCanvasBackgroundImage(datasetUrl());
    //     //         }
    //     //     )
    //     // } catch (e) {
    //     //     console.log(e);
    //     //     setCanvasBackgroundImage(datasetUrl());
    //     // }

    //     currentStateIndex = stateIndex;
    //     isUpdateOperation = true;
    // });
    fabric.loadSVGFromString(canvasState[stateIndex], function (objects, options) {
        // 打包成一个对象
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.clear();
        canvas.add(obj).renderAll();

        currentStateIndex = stateIndex;
        isUpdateOperation = true;

        console.log(canvasState, currentStateIndex, "load");
    });
    
}
function clearCanvasState() {
    isUpdateOperation = false;
    canvasState = [];
    currentStateIndex = -1;
    isUpdateOperation = true;
    console.log(canvasState, currentStateIndex, "clear");
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

        setCanvasBackgroundImage(datasetUrl());
        updateCanvasState();
        // saveCanvas();

    }
}
function saveCanvas() {
    // writeSketchedImage(canvasFileName(), canvas.toDataURL());
    writeSketchedImage(canvasFileName(), canvas.toSVG());
}
function setCanvasBackgroundPng(img) {
    // 根据图片 URL 或 dataURL 设置画布背景图片

    fabric.Image.fromURL(img, function (oImg) {
        // 缩小图片至正好能放入画布
        var scale = Math.min(canvas.width / oImg.width, canvas.height / oImg.height);
        oImg.scale(scale);

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
function setCanvasBackgroundSvgFromUrl(url) {
    // 根据 svg URL 设置画布背景图片
    // 不触发object:added
    // url：svg url

    fabric.loadSVGFromURL(url, function (objects, options) {
        // 打包成一个对象
        var obj = fabric.util.groupSVGElements(objects, options);

        // 调整图片大小至正好能放入画布
        var scale = Math.min(canvas.width / obj.width, canvas.height / obj.height);
        obj.scale(scale);

        // 放置背景图片
        canvas.backgroundImage = false;
        canvas.setBackgroundImage(obj, canvas.renderAll.bind(canvas), {
            // 居中
            originX: 'center',
            originY: 'center',
            left: canvas.width / 2,
            top: canvas.height / 2,
            backgroundImageStretch: false
        });
    });
}
function setCanvasBackgroundSvgFromString(svgString) {
    // 根据 svg 文件内容字符串设置画布背景图片

    fabric.loadSVGFromString(svgString, function (objects, options) {
        // 打包成一个对象
        var obj = fabric.util.groupSVGElements(objects, options);

        // 调整图片大小至正好能放入画布
        var scale = Math.min(canvas.width / obj.width, canvas.height / obj.height);
        obj.scale(scale);

        // 放置背景图片
        canvas.backgroundImage = false;
        canvas.setBackgroundImage(obj, canvas.renderAll.bind(canvas), {
            // 居中
            originX: 'center',
            originY: 'center',
            left: canvas.width / 2,
            top: canvas.height / 2,
            backgroundImageStretch: false
        });
    });
}
function setCanvasBackgroundImage(img) {
    // 设置画布背景图片
    // 不触发object:added
    // img：img.src(png/svg) | dataURL

    if (typeof img === "object") {
        // vega_lite Object
        vegaLiteSpecToSvg(img, setCanvasBackgroundSvgFromString);
    } else if (img.endsWith(".svg")) {
        // svg 文件
        setCanvasBackgroundSvgFromUrl(img);
    } else if (img.endsWith(".json")) {
        // Vega-Lite JSON 文件
        $.getJSON(img, function (vlSpec) {
            vegaLiteSpecToSvg(vlSpec, setCanvasBackgroundSvgFromString);
        });

    } else if (img.endsWith("png")) {
        setCanvasBackgroundPng(img);
    } else {
        // svg 字符串
        setCanvasBackgroundSvgFromString(img);
    }
}
function loadCanvasImage() {
    isUpdateOperation = false;
    canvas.backgroundImage = false;
    canvas.clear();

    setCanvasBackgroundImage(datasetUrl()); // 先设置图，防止读取失败没有图
    try {
        readCanvasImage(
            canvasFileName(),
            setCanvasBackgroundImage,
            function (error) {
                // alert(error);
                // throw new Error(error);
            }
        )
    } catch (e) {
        console.log(e);
        setCanvasBackgroundImage(datasetUrl());
        // clearCanvasState();
        // updateCanvasState();
    }
    clearCanvasState();
    updateCanvasState();
    isUpdateOperation = true;
}
function setCanvasBrushColor(color) {
    canvas.freeDrawingBrush.color = color;
}
function setCanvasBrushWidth(width) {
    canvas.freeDrawingBrush.width = width;
}

// -------------------------Insight-------------------------

function updateScene(id) {
    // 若已经初始化并且开启了自动保存模式，保存上一图和纠正insight
    if (flagInitFinish && flagAutoSaveCanvas) {
        saveCorrectInsight();
        saveCanvas();
    }

    // 更新currentId, currentInsightObj
    currentId = id;
    currentInsightObj = insight_dataset[currentId - 1]; // 数组下标从 0 开始

    // 清空并读入下一图
    loadCanvasImage();

    // 更新页面文本
    $("#current-id").val(currentId);
    $("#insight-text-id").text(currentInsightObj.key);
    // 若 currentInsightObj 没有type，则赋空值
    if (!currentInsightObj.type) {
        currentInsightObj.type = "";
    }
    $("#insight-text-type").text(currentInsightObj.type);
    $("#insight-text-description").text(currentInsightObj.description);

    // 更新纠正
    // $("#select-type").val(currentInsightObj.type);
    // $("#correct-description").val("");
    updateCorrectInsight();

    

    // 初始化完成
    flagInitFinish = true;
}
function previousInsight() {
    // console.log(typeof currentId, currentId); // string
    currentId = parseInt(currentId);
    if (currentId > 1) {
        // 更新上一图
        updateScene(currentId - 1);
    }
}
function nextInsight() {
    // console.log(typeof currentId, currentId); // string
    currentId = parseInt(currentId);
    if (currentId < maxId) {
        // 更新下一图
        updateScene(currentId + 1);
    }
}


$(function () {
    // loader
    $(".loader").fadeOut(500, function () {
        $(".page_wrapper").show();
    });

    $("#max-id").text(maxId);


    // -------------------------Canvas-------------------------

    // create a canvas 创建画布
    insertCanvasHtml();
    canvas = new fabric.Canvas('c', {
        isDrawingMode: true
    });
    canvas.on("object:modified", updateCanvasState);
    canvas.on("object:added", updateCanvasState);
    // button-undo-canvas 按钮
    $("#button-undo-canvas").click(undoCanvas);
    // button-redo-canvas 按钮
    $("#button-redo-canvas").click(redoCanvas);
    // button-clear-canvas 按钮
    $("#button-clear-canvas").click(clearCanvas);
    // button-save-canvas 按钮
    $("#button-save-canvas").click(function () {
        saveCanvas();

        // $("#button-save-canvas").attr("href", canvas.toDataURL());
        // console.log(canvas.toDataURL());
        // $("#button-save-canvas").attr("download", "canvas");
    });

    
    $("#previous").click(previousInsight);
    $("#next").click(nextInsight);
    // 初始化
    updateScene(1);

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
        // $("#button-pick-brush").css("border-color", brushColor); // 改变#button-pick-brush border 颜色
        // 改变全局粗细
        const base = 0.03;
        var brushWidth = (base + color.alpha * (1.00 - base)) * maxBrushWidth;
        setCanvasBrushWidth(brushWidth);
        $("#brush").attr("r", brushWidth / 2);
    });
    // 点击按钮显示/隐藏选择器
    $("#button-pick-brush").click(function () {
        $("#color-picker").toggle();
    });

    // 输入编号并回车，跳转到对应编号
    $('#current-id').bind('change keyup input', function (e) {
        var key = e.which;
        if (key == 13) {
            var inputCurrentId = $("#current-id").val();
            if (inputCurrentId > 0 && inputCurrentId <= maxId) {
                updateScene(inputCurrentId);
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