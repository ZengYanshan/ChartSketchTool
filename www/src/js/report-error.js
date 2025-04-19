const reportErrorContainer = document.getElementById("container-report-error");
const cancelButton = document.getElementById("cancel");

$(function () {
    cancelButton.addEventListener("click", function () {
        hideReportErrorContainer();
    });
});

function showReportErrorContainer() {
    // 显示报错面板
    reportErrorContainer.style.display = "block";

    // TODO 获取已有报错信息
    // listUserDir(updateUserSelect);
}

function hideReportErrorContainer() {
    // 隐藏报错面板
    reportErrorContainer.style.display = "none";
}