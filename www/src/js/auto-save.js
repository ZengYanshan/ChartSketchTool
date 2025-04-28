var flagAutoSaveCanvas = false;
const SAVE_CANVAS_ICON_SRC = "src/assets/img/confirm.svg";
const AUTO_SAVE_CANVAS_ICON_SRC = "src/assets/img/confirm-auto.svg";
const AUTO_SAVE_CANVAS_ANIMATE_ICON_SRC = "src/assets/img/confirm-auto-animate.svg";
const SLIDER = $("#slider");
const SLIDER_TEXT = $("#slider-text");
const SLIDER_ANIMATE_CLASS = "slider-right";

$("#button-auto-save-canvas").click(changeAutoSaveCanvasMode);

// 切换自动保存模式
function changeAutoSaveCanvasMode() {
    flagAutoSaveCanvas = !flagAutoSaveCanvas;
    changeButtonAppearance();
}

function changeButtonAppearance() {
    if (flagAutoSaveCanvas) {
        // 若自动保存模式开启，则按钮图标为自动保存图标
        SLIDER.addClass(SLIDER_ANIMATE_CLASS);
        SLIDER_TEXT.addClass(SLIDER_ANIMATE_CLASS);
        $("#button-save-canvas .svg-icon").attr("src", AUTO_SAVE_CANVAS_ICON_SRC);
    } else {
        SLIDER.removeClass(SLIDER_ANIMATE_CLASS);
        SLIDER_TEXT.removeClass(SLIDER_ANIMATE_CLASS);
        $("#button-save-canvas .svg-icon").attr("src", SAVE_CANVAS_ICON_SRC);
    }
}