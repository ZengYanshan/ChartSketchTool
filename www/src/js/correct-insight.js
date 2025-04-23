const CORRECT_INSIGHT_BUTTONS = ["#button-save-correct-insight", "#button-import-correct-insight", "#button-cancel-correct-insight"];
const CORRECT_INSIGHT_TEXT_INPUTS = ["#select-type", "#correct-description"];
const CORRECT_INSIGHT_INTERFACE_ELEMENTS = CORRECT_INSIGHT_BUTTONS.concat(CORRECT_INSIGHT_TEXT_INPUTS);

// 为按钮绑定方法
$("#button-edit-insight").click(showCorrectInsightInterface);
$("#button-cancel-correct-insight").click(hideCorrectInsightInterface);
$("#button-import-correct-insight").click(importCorrectInsight);
$("#button-save-correct-insight").click(saveCorrectInsight);
// 初始化
initTypeSelect();
hideCorrectInsightInterface();

function hideCorrectInsightInterface() {
    CORRECT_INSIGHT_INTERFACE_ELEMENTS.forEach((element) => {
        $(element).css("display", "none");
    });

    $("#button-edit-insight").css("display", "inline");
}

function showCorrectInsightInterface() {
    CORRECT_INSIGHT_INTERFACE_ELEMENTS.forEach((element) => {
        $(element).css("display", "inline");
    });

    $("#button-edit-insight").css("display", "none");
}

function saveCorrectInsight() {
    // 获取当前输入
    let correctType = $("#select-type").val();
    let correctDescription = $("#correct-description").val();

    if ((correctType == "" || correctType == currentInsightObj.type)
         && (correctDescription === "" || correctDescription === currentInsightObj.description)) {
        // 若 type 与原本相同且 correctDescription 为空，删除本地文件
        deleteCorrectDescription(correctInsightFileName(), function () {
            // 更新页面内容
            updateCorrectInsight();

            // 关闭纠正编辑
            hideCorrectInsightInterface();
        });
    } else {
        // 保存 type 和 correct description 到本地

        // 整理数据
        let correctInsightObj = {
            type: correctType,
            description: correctDescription
        };
        // 转为JSON
        let correctInsightJson = JSON.stringify(correctInsightObj);

        // 写入文件
        writeCorrectDescription(correctInsightFileName(), correctInsightJson, function () {
            // 更新页面内容
            updateCorrectInsight();

            // 关闭纠正编辑
            hideCorrectInsightInterface();
        });
    }
}

function importCorrectInsight() {
    $("#select-type").val(currentInsightObj.type);
    $("#correct-description").val(currentInsightObj.description);
}

function initTypeSelect() {
    // 初始化类型选择框，插入所有类型
    insightTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        $("#select-type").appendChild(option);
    });
}