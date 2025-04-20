// 使 DIV 元素可拖动：
dragElement(document.getElementById("report-bad-data-box"));

function dragElement(elem) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elem.onmousedown = dragMouseDown;
    elem.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e = e || window.event;

        if (e.target.tagName.toLowerCase() === "textarea" || e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() === "button" || e.target.classList.contains("svg-icon")) {
            return;
        }

        e.preventDefault();
        // 获取启动时鼠标光标的位置：
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // 每当光标移动时调用函数： 
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e = e || window.event;
        if (e.target.tagName.toLowerCase() === "textarea" || e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() === "button" || e.target.classList.contains("svg-icon")) {
            return;
        }
        e.preventDefault();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDragTouch;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        setElementPosition();
    }

    function elementDragTouch(e) {
        e = e || window.event;
        e.preventDefault();
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        setElementPosition();
    }

    function setElementPosition() {
        // 设置元素的新位置：
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
        // console.log(elem.clientHeight, elem.clientWidth);
        // 限制元素在窗口内移动
        if (elem.offsetTop < 0) {
            elem.style.top = "0px";
        }
        if (elem.offsetLeft < 0) {
            elem.style.left = "0px";
        }
        if (elem.offsetTop + elem.offsetHeight > window.innerHeight) {
            elem.style.top = (window.innerHeight - elem.offsetHeight) + "px";
        }
        if (elem.offsetLeft + elem.offsetWidth > window.innerWidth) {
            elem.style.left = (window.innerWidth - elem.offsetWidth) + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}