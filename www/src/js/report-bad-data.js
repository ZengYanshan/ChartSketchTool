var currentIsBadData = false; // 是否是不良数据
const reportBadDataLink = document.getElementById("report-bad-data-link");
const reportBadDataContainer = document.getElementById("container-report-bad-data");
const cancelButton = document.getElementById("cancel");

$(function () {
    cancelButton.addEventListener("click", function () {
        hideReportBadDataContainer();
    });
});

function showReportBadDataContainer() {
    // 显示报错面板
    reportBadDataContainer.style.display = "block";

    // TODO 获取已有报错信息
    // listUserDir(updateUserSelect);
}

function hideReportBadDataContainer() {
    // 隐藏报错面板
    reportBadDataContainer.style.display = "none";
}

function changeBadDataMark() {
    // TODO
    // 保存correct description到本地

    // 更新页面内容
    // 更改红色链接文本

    // 更改insight文本

    // 关闭报错面板
    hideReportBadDataContainer();
}