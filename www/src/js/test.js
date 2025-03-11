function testlistUserDir() {
    listUserDir(printList);
}

function printList(list) {
    var str = "";
    list.forEach(name => {
        str += name + '\n';
    });
    alert("names: \n" + str);
}

function test() {
    $.getJSON(`./src/assets/dataset/vega_lite/3_vega_lite.json`, function (vlSpec) {
        console.log(vlSpec);
        vegaLiteSpecToSvg(vlSpec, (svg) => {});
    });
}

$("#test").click(function () {
    test();
});