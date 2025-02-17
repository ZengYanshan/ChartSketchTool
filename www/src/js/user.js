var currentUsername = "";
const userContainer = document.getElementById("container-user");
const userSelect = document.getElementById("select-user");
const newUsernameInput = document.getElementById("new-username");
const chooseUserButton = document.getElementById("choose-user");

document.addEventListener("DOMContentLoaded", function () {
    // 监听选择框的变化
    userSelect.addEventListener("change", function () {
        if (userSelect.value === "option-create-new-user") {
            newUsernameInput.style.display = "inline";
        } else {
            newUsernameInput.style.display = "none";
        }
    });

    // 监听创建用户按钮的点击事件
    chooseUserButton.addEventListener("click", function () {
        if (userSelect.value === "option-create-new-user") {
            const newUsername = newUsernameInput.value.trim();
            if (newUsername && !usernames.includes(newUsername)) {
                // 下拉选择框添加新用户
                usernames.push(newUsername);
                const option = document.createElement("option");
                option.value = newUsername;
                option.textContent = newUsername;
                userSelect.insertBefore(option, userSelect.lastChild);

                // 清空并隐藏输入框
                newUsernameInput.value = "";
                newUsernameInput.style.display = "none";

                updateCurrentUser(newUsername);
                hideUserContainer();
            } else {
                alert("Username is either empty or already exists.");
            }
        } else {
            updateCurrentUser(userSelect.value);
            hideUserContainer();
        }
    });

    newUsernameInput.style.display = "none";

    // 更新用户名选择列表
    // const usernames = ["user1", "user2", "user3"];
    const usernames = [];
    if (usernames.length > 0) {
        updateCurrentUser(usernames[0]);
    }
    updateUserSelect(usernames);

    // 显示/隐藏输入框
    if (userSelect.value === "option-create-new-user") {
        newUsernameInput.style.display = "inline";
    } else {
        newUsernameInput.style.display = "none";
    }
});


function showUserContainer() {
    userContainer.style.display = "block";

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
}

function updateUserSelect(usernames) {
    console.log("updateUserSelect", usernames);

    // 清空现有选项
    userSelect.innerHTML = '<option value=\"option-create-new-user\">Create New User</option>';

    // 向下拉选择框中添加选项
    usernames.forEach(username => {
        // 检查是否已有该选项
        if (![...userSelect.options].some(option => option.value === username)) {
            const option = document.createElement("option");
            option.value = username;
            option.textContent = username;
            userSelect.insertBefore(option, userSelect.lastChild);
        }
    });

    // 设置默认选中的选项
    if (usernames.includes(currentUsername)) {
        userSelect.value = currentUsername
    } else {
        userSelect.value = "option-create-new-user";
    }
}
