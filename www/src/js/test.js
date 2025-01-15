function convertTspansToText(svg) {
    // 使用正则表达式匹配所有 <tspan> 元素
    var tspans = svg.match(/<\s*tspan[^>]*>(.*?)<\s*\/\s*tspan>/g);

    if (tspans === null) {
        return svg;
    }

    tspans.forEach(function (tspanString) {
        // 提取 <tspan> 的文本内容
        var textContent = tspanString.replace(/<\s*tspan[^>]*>/g, '').replace(/<\s*\/tspan[^>]*>/g, '');

        // 查找 <tspan> 的父 <text> 元素
        var textTagMatch = svg.match(new RegExp(`<text[^>]*>${tspanString}`));

        if (textTagMatch) {
            var textTagString = textTagMatch[0];

            // 去除 <tspan> 元素
            var newTextTagString = textTagString.replace(tspanString, textContent);

            // 提取 <tspan> 的 x 和 y 坐标
            var coordMatch = tspanString.match(/x="(-?\d*\.?\d+)" y="(-?\d*\.?\d+)"/);
            if (coordMatch && coordMatch.length > 2) {
                var x = parseFloat(coordMatch[1]);
                var y = parseFloat(coordMatch[2]);

                // 添加 x 和 y 属性到 <text> 元素
                newTextTagString = newTextTagString.replace('<text', `<text x="${x}" y="${y}"`);
        }
            // 替换原始 <text> 元素
            svg = svg.replace(textTagString, newTextTagString);
        }

    });

    // 移除所有剩余的 <tspan> 元素
    svg = svg.replace(/<\s*tspan[^>]*>(.*?)<\s*\/\s*tspan>/g, '');

    return svg;
}

var svg = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="720" height="835" viewBox="0 0 720 835" xml:space="preserve">
<desc>Created with Fabric.js 5.4.1</desc>
<defs>
</defs>
<g transform="matrix(2.23 0 0 2.23 252.29 417.5)"  >
<g style=""   >
		<g transform="matrix(1 0 0 1 0 0)"  >
<rect style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"  x="-113" y="-187" rx="0" ry="0" width="226" height="374" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -26.5)"  >
<path style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(-90.5, -150.5)" d="M 0.5 0.5 L 180.5 0.5 L 180.5 300.5 L 0.5 300.5 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -71.5 -176.5)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 0 L 0 0 L 0 0 L 0 0 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 18.5 123.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 93.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 63.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 33.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 3.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -26.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -56.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -86.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -116.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -146.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 -176.5)"  >
<line style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -71.5 -176.5)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;"  transform=" translate(0, 0)" d="" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -71.5 123.5)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 0 L 0 0 L 0 0 L 0 0 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -61.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 -41.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 -21.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 -1.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 18.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 38.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 58.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 78.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(1 0 0 1 98.5 126)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="-2.5" x2="0" y2="2.5" />
</g>
		<g transform="matrix(0 -1 1 0 -62.13 143.58)" style=""  >
		<text x="-13.08" y="3.14" xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan>Smith</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 -42.13 149.08)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-18.58" y="3.14" >Schmidt</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 -22.13 144.25)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-13.75" y="3.14" >Prater</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 -2.13 146.26)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-15.76" y="3.14" >Nelson</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 17.87 138.69)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-8.19" y="3.14" >Lee</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 37.87 139.36)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-8.86" y="3.14" >Kim</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 57.87 143.71)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-13.21" y="3.14" >Jones</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 77.87 145.32)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-14.82" y="3.14" >Cheng</tspan></text>
</g>
		<g transform="matrix(0 -1 1 0 97.87 142.56)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-12.06" y="3.14" >Apap</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 18.5 123.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="-90" y1="0" x2="90" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 18.5 176.18)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="11" font-style="normal" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-18.33" y="3.46" >LName</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -71.5 123.5)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;"  transform=" translate(0, 0)" d="" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -71.5 -176.5)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 0 L 0 0 L 0 0 L 0 0 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -74 123.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 93.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 63.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 33.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 3.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 -26.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 -56.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 -86.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 -116.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 -146.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -74 -176.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="2.5" y1="0" x2="-2.5" y2="0" />
</g>
		<g transform="matrix(1 0 0 1 -85.35 123.37)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >0.0</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 93.37)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >0.2</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 63.37)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >0.4</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 33.37)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >0.6</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 3.37)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >0.8</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 -26.63)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >1.0</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 -56.63)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >1.2</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 -86.63)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >1.4</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 -116.63)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >1.6</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 -146.63)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >1.8</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -85.35 -176.63)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="10" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-6.85" y="3.14" >2.0</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -71.5 -26.5)"  >
<line style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  x1="0" y1="150" x2="0" y2="-150" />
</g>
		<g transform="matrix(0 -1 1 0 -101.85 -26.5)" style=""  >
		<text xml:space="preserve" font-family="sans-serif" font-size="11" font-style="normal" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-42.17" y="3.46" >COUNT(LName)</tspan></text>
</g>
		<g transform="matrix(1 0 0 1 -71.5 -176.5)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;"  transform=" translate(0, 0)" d="" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 98 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-170, -225)" d="M 161 150 L 179 150 L 179 300 L 161 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 78 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-150, -225)" d="M 141 150 L 159 150 L 159 300 L 141 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 58 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-130, -225)" d="M 121 150 L 139 150 L 139 300 L 121 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 38 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-110, -225)" d="M 101 150 L 119 150 L 119 300 L 101 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 18 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-90, -225)" d="M 81 150 L 99 150 L 99 300 L 81 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -2 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-70, -225)" d="M 61 150 L 79 150 L 79 300 L 61 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -22 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-50, -225)" d="M 41 150 L 59 150 L 59 300 L 41 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -42 48)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-30, -225)" d="M 21 150 L 39 150 L 39 300 L 21 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -62 -27)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;"  transform=" translate(-10, -150)" d="M 1 0 L 19 0 L 19 300 L 1 300 Z" stroke-linecap="round" />
</g>
		<g transform="matrix(1 0 0 1 -72 -177)"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;"  transform=" translate(0, 0)" d="" stroke-linecap="round" />
</g>
</g>
</g>
<g transform="matrix(1 0 0 1 225.84 365.19)"  >
<path style="stroke: rgb(234,72,77); stroke-width: 1.7647058823529411; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(-225.84, -365.19)" d="M 226.9375 299.49823529411765 Q 226.9375 299.5 226.9375 300.4500732421875 Q 226.9375 301.400146484375 226.9375 310.8198547363281 Q 226.9375 320.23956298828125 226.9375 331.2091522216797 Q 226.9375 342.1787414550781 226.71609497070312 350.12342834472656 Q 226.49468994140625 358.068115234375 226.30984497070312 367.1337127685547 Q 226.125 376.1993103027344 225.87667846679688 384.78395080566406 Q 225.62835693359375 393.36859130859375 225.29379272460938 400.99790954589844 Q 224.959228515625 408.6272277832031 224.8546142578125 413.5410614013672 Q 224.75 418.45489501953125 224.75 421.6263427734375 Q 224.75 424.79779052734375 225.21875 427.8363952636719 L 225.68926470588235 430.87676470588235" stroke-linecap="round" />
</g>
<g transform="matrix(1 0 0 1 337.16 340.41)"  >
<path style="stroke: rgb(234,72,77); stroke-width: 1.7647058823529411; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(-337.16, -340.41)" d="M 340.50176470588235 286.93573529411765 Q 340.5 286.9375 339.2379455566406 290.0550842285156 Q 337.97589111328125 293.17266845703125 336.5468444824219 301.8172607421875 Q 335.1177978515625 310.46185302734375 334.29241943359375 317.61329650878906 Q 333.467041015625 324.7647399902344 333.0533142089844 332.17913818359375 Q 332.63958740234375 339.5935363769531 332.6322937011719 346.6306457519531 Q 332.625 353.6677551269531 332.625 359.5384826660156 Q 332.625 365.4092102050781 333.3432922363281 370.573974609375 Q 334.06158447265625 375.7387390136719 335.3636779785156 380.2606964111328 Q 336.665771484375 384.78265380859375 339.1766357421875 389.3288269042969 L 341.68926470588235 393.87676470588235" stroke-linecap="round" />
</g>
</svg>`;
svg = convertTspansToText(svg);
console.log(svg);