const reportBadDataContainer = document.getElementById("container-report-bad-data");
const typeSelect = document.getElementById("select-type");
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

    initTypeSelect();
});

function showReportBadDataContainer() {
    // 显示报错面板
    reportBadDataContainer.style.display = "block";
    // 获取已有报错信息在 main.js updateCorrectInsight() 中完成
}

function hideReportBadDataContainer() {
    // 隐藏报错面板
    reportBadDataContainer.style.display = "none";
}

function changeBadDataMark() {
    console.log("change bad data mark");
    // 获取当前输入
    let correctType = typeSelect.value;
    let correctDescription = correctDescriptionTextarea.value;


    if ((correctType == "" || correctType == currentInsightObj.type)
         && (correctDescription === "" || correctDescription === currentInsightObj.description)) {
        // 若 type 与原本相同且 correctDescription 为空，删除本地文件
        deleteCorrectDescription(correctInsightFileName(), function () {
            // 更新页面内容
            updateCorrectInsight();

            // 关闭报错面板
            hideReportBadDataContainer();
        });
    } else {
        // 保存 type 和 correct description 到本地

        // 整理数据
        let correctInsightObj = {
            type: correctType,
            description: correctDescription
        };
        // 转为JSON
        let correctJson = JSON.stringify(correctInsightObj);

        // 写入文件
        writeCorrectDescription(correctInsightFileName(), correctJson, function () {
            // 更新页面内容
            updateCorrectInsight();

            // 关闭报错面板
            hideReportBadDataContainer();
        });
    }
}

function initTypeSelect() {
    // 初始化类型选择框，插入所有类型
    insightTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}