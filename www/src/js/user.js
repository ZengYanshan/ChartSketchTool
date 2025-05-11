var currentUsername = "";
const userContainer = document.getElementById("container-user");
const userSelect = document.getElementById("select-user");
const newUsernameInput = document.getElementById("new-username");
const chooseUserButton = document.getElementById("choose-user");

$(function () {
    // 监听选择框的变化
    userSelect.addEventListener("change", function () {
        if (userSelect.value === "option-create-new-user") {
            newUsernameInput.style.display = "inline";
        } else {
            newUsernameInput.style.display = "none";
        }
    });

    // DEBUG 刚打开页面时无法调用读取文件的函数，在此时再读取以弥补。这导致展开下拉列表时闪烁以及二次点击展开后当前选项回到当前用户
    userSelect.addEventListener("click", function () {
        listUserDir(updateUserSelect);
    });

    // 监听切换用户按钮的点击事件
    chooseUserButton.addEventListener("click", function () {
        if (userSelect.value === "option-create-new-user") {
            // 创建用户
            const newUsername = newUsernameInput.value.trim();
            const usernames = getSelectValues(userSelect);
            if (newUsername && !usernames.includes(newUsername)) {
                createUser(newUsername);
                // 创建成功，切换用户
                updateCurrentUser(userSelect.value);
                hideUserContainer();
            } else {
                alert("Username is either empty or already exists.");
            }
        } else {
            // 用户已存在，切换用户
            updateCurrentUser(userSelect.value);
            hideUserContainer();
        }

    });

    // $("#reload-user").click(function () {
    //     listUserDir(updateUserSelect);
    // });

    // 更新用户名选择列表
    // const usernames = ["user1", "user2", "user3"];
    // const usernames = [];
    // if (usernames.length > 0) {
    //     updateCurrentUser(usernames[0]);
    // }
    // updateUserSelect(usernames);

    showUserContainer();
});


function createUser(newUsername) {
    // 创建新用户目录
    createUserDir(newUsername);

    // 下拉选择框添加新用户
    const option = document.createElement("option");
    option.value = newUsername;
    option.textContent = newUsername;
    userSelect.appendChild(option);
    // 选中新用户
    userSelect.value = newUsername;

    // 清空并隐藏输入框
    newUsernameInput.value = "";
    newUsernameInput.style.display = "none";
}


function showUserContainer() {
    // 显示用户面板
    userContainer.style.display = "block";

    // 获取用户名列表填入下拉选择框
    listUserDir(updateUserSelect);
}

function hideUserContainer() {
    userContainer.style.display = "none";
}

function updateCurrentUser(username) {
    console.log("updateCurrentUser", username);
    currentUsername = username;
    // 更新选中项
    userSelect.value = currentUsername;
    // 更新显示的用户名
    document.getElementById("username").textContent = currentUsername;

    // 更新画布和Insight
    updateInsight(1);
}

function updateUserSelect(usernames) {
    console.log("updateUserSelect", usernames);

    // 清空现有选项
    // userSelect.innerHTML = '<option value=\"option-create-new-user\">Create New User</option>';

    // 向下拉选择框中添加缺少的选项
    usernames.forEach(username => {
        // 检查是否已有该选项
        if (![...userSelect.options].some(option => option.value === username)) {
            const option = document.createElement("option");
            option.value = username;
            option.textContent = username;
            userSelect.appendChild(option);
        }
    });

    // 设置默认选中的选项
    // if (usernames.includes(currentUsername)) {
    //     userSelect.value = currentUsername;
    //     newUsernameInput.style.display = "none";
    // } else {
    //     userSelect.value = "option-create-new-user";
    //     newUsernameInput.style.display = "inline";
    // }
}

function getSelectValues(select) {
    const options = select && select.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
        values.push(options[i].value);
    }
    return values;
}