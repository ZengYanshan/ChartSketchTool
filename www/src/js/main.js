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
const maxId = insight_ChartToText.length;
var currentId = 1;
var currentInsightObj;
const maxBrushWidth = 36;
var defaultBrush = "#ea484d05"; // 前六位为颜色，后二位转为粗细

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


$(function () {
    // loader
    $(".loader").fadeOut(500, function () {
        $(".page_wrapper").show();
    });





    // -------------------------nvBench-------------------------

    function datasetUrl() {
        // 4.svg
        // var url = `./src/assets/dataset/svg/${currentInsightObj.key}.svg`;

        // 4_vega_lite.json
        // var url = `./src/assets/dataset/vega_lite/${currentInsightObj.key}_vega_lite.json`;

        // {"width": 200, "height": 150, "data": {"values": [{"category": "AssocProf", "value": 2}, {"category": "AsstProf", "value": 18}, {"category": "Professor", "value": 14}]}, "mark": {"type": "arc", "innerRadius": 5, "stroke": "#fff"}, "encoding": {"theta": {"field": "value", "type": "quantitative", "stack": true}, "color": {"field": "category", "type": "nominal", "scale": {"domain": ["AssocProf", "AsstProf", "Professor"]}, "legend": {"orient": "bottom", "title": null, "symbolType": "square", "direction": "horizontal", "values": ["AsstProf", "Professor"]}}, "order": {"field": "value", "type": "quantitative", "sort": "descending"}, "radius": {"field": "value", "scale": {"type": "linear", "zero": true, "rangeMin": 20}}, "tooltip": [{"field": "category", "type": "nominal"}, {"field": "value", "type": "quantitative"}]}, "config": {"legend": {"layout": {"anchor": "middle", "padding": 10}}}}
        var url = insight_ChartToText[currentId - 1].vega_lite;

        // chart to text 1.png
        // var url = `./src/assets/dataset/chart-to-text/imgs/${currentInsightObj.key}.png`;

        return url;
    }
    function canvasFileName() {
        // 4_1_sketched.svg
        var fileName = `${currentId}_${currentInsightObj.key}_sketched.svg`;
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
        } else if (img.endsWith("_vega_lite.json")) {
            // vega_lite JSON 文件
            // alert(`img.endsWith("_vega_lite.json")`);
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

    // -------------------------Insight-------------------------

    function updateInsight(id) {
        // 保存上一图
        // saveCanvas();

        // 更新currentId, currentInsightObj
        currentId = id;
        currentInsightObj = insight_ChartToText[currentId - 1]; // 数组下标从 0 开始

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
            // saveCanvas();
            // 更新上一图
            updateInsight(currentId - 1);
        }
    }
    function nextInsight() {
        // console.log(typeof currentId, currentId); // string
        currentId = parseInt(currentId);
        if (currentId < maxId) {
            // 保存当前图
            // saveCanvas();
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