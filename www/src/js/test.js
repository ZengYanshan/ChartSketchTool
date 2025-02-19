function test() {
    toast("测试中……");
    listUserDir(printList);
    
}

function printList(list) {
    var str = "";
    list.forEach(name => {
        str += name + '\n';
    });
    alert("names: \n" + str);
}

$("#test").click(function () {
    test();
});