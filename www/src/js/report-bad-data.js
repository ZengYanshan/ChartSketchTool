const reportBadDataContainer = document.getElementById("container-report-bad-data");
const correctDescriptionTextarea = document.getElementById("correct-description");
const changeBadDataMarkButton = document.getElementById("change-bad-data-mark");
const cancelButton = document.getElementById("cancel");

$(function () {
    cancelButton.addEventListener("click", function () {
        hideReportBadDataContainer();
    });

    changeBadDataMarkButton.addEventListener("click", function () {
        changeBadDataMark();
    });
});

function showReportBadDataContainer() {
    // 显示报错面板
    reportBadDataContainer.style.display = "block";
    // 获取已有报错信息在 main.js updateBadData() 中完成
}

function hideReportBadDataContainer() {
    // 隐藏报错面板
    reportBadDataContainer.style.display = "none";
}

function changeBadDataMark() {
    console.log("change bad data mark");
    // 获取当前输入
    let correctDescription = correctDescriptionTextarea.value;


    if (correctDescription === "") {
        // 若 correctDescription 为空，删除本地文件
        deleteCorrectDescription(correctDescriptionFileName(), function () {
            // 更新页面内容
            updateBadData();

            // 关闭报错面板
            hideReportBadDataContainer();
        });
    } else {
        // 保存correct description到本地
        writeCorrectDescription(correctDescriptionFileName(), correctDescription, function () {
            // 更新页面内容
            updateBadData();

            // 关闭报错面板
            hideReportBadDataContainer();
        });
    }


}