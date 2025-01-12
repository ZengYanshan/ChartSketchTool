








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

function dataURLtoBlob(dataURL){
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
        createAndWriteFile(fileName, dataObj);
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

    insertCanvasHtml();

    // create a canvas 创建画布
    var canvas = new fabric.Canvas('c', {
        isDrawingMode: false
    });

    // drag&drop area settings 区域
    $('[name="image"]').ezdz({
        text: '<p>Drop or select a picture<p>',
        validators: {
            maxSize: 4000000
        },
        reject: function (file, errors) {
            if (errors.mimeType) {
                alert(file.name + ' must be jpg or png.');
            }
            if (errors.maxSize) {
                alert(file.name + ' must be size:4mb max.');
            }
        }
    });

    // canvas background color 背景色区域
    $('.canvas-background-color').minicolors({
        defaultValue: '#fff',
    });
    var canvasbcolor = $(".canvas-background-color").val();
    canvas.backgroundColor = canvasbcolor;
    canvas.renderAll();
    // 按钮
    $(".canvas-background-color").on("change", function () {
        var canvasbcolor = $(".canvas-background-color").val();
        canvas.backgroundColor = canvasbcolor;
        canvas.renderAll();
    });

    // make an image canvas background 按钮
    $("#image-background").click(function () {
        var x = $('.ezdz-dropzone img').attr('src');
        canvas.setBackgroundImage(x,
            canvas.renderAll.bind(canvas), {
            width: 500,
            height: 400,
            backgroundImageStretch: false
        });

        $("#c").css("border", "none");
        return false;
    });

    // add an image to canvas 按钮
    $("#image-on").click(function () {
        var x2 = $('.ezdz-dropzone img').attr('src');

        fabric.Image.fromURL(x2, function (oImg) {
            canvas.add(oImg);

        }, {
            "scaleX": 0.40,
            "scaleY": 0.40
        });

        $("#c").css("border", "none");
        return false;
    });

    // default text color
    $('.text-color').minicolors({
        defaultValue: '#333',
    });


    $("header p").click(function () {
        text.set({
            fill: '#000'
        })
    })
    // hit enter and add text
    $('#text').bind('change keyup input', function (e) {
        var key = e.which;
        if (key == 13) {

            var myText = $("#text").val();
            $("#text").val('');

            var mycolor = $(".text-color").val();
            var myfont = $("#text-font option:selected").val();

            var text = new fabric.Text(myText, {
                fontFamily: myfont,
                fontSize: 40,
                fill: mycolor,
                left: 40,
                top: 50
            });
            text.hasRotatingPoint = true;
            canvas.add(text);

            $("#selection").trigger("click");
        }
        return false;
    });

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
    $("#undo").click(function () {
        alert("undo");
    });

    // clear 按钮
    $("#clear").click(function () {
        if (confirm('Are you sure to clear canvas?')) {
            canvas.backgroundImage = false;
            canvas.clear();
        }
        return false;
    });

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