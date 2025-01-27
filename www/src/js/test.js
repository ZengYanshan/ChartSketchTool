function convertTspansToText(svg) {
    // 创建DOMParser实例
    const parser = new DOMParser();

    // 解析HTML字符串
    const doc = parser.parseFromString(svg, 'image/svg+xml');

    // 查找所有的<text>元素
    const textElements = doc.querySelectorAll('text');

    textElements.forEach(textElement => {
        // 查找<text>元素内的所有<tspan>元素
        const tspanElements = textElement.querySelectorAll('tspan');

        tspanElements.forEach(tspanElement => {
            // 获取<tspan>的文本内容
            const textContent = tspanElement.textContent;

            // 复制<tspan>的x和y属性到<text>
            if (tspanElement.hasAttribute('x')) {
                if (textElement.hasAttribute('x')) {
                    textElement.setAttribute('x', `${parseFloat(textElement.getAttribute('x')) 
                        + parseFloat(tspanElement.getAttribute('x'))}`
                    );
                } else {
                    textElement.setAttribute('x', tspanElement.getAttribute('x'));
                }
            }
            if (tspanElement.hasAttribute('y')) {
                if (textElement.hasAttribute('y')) {
                    textElement.setAttribute('y', `${parseFloat(textElement.getAttribute('y')) 
                        + parseFloat(tspanElement.getAttribute('y'))}`
                    );
                }
                else {
                    textElement.setAttribute('y', tspanElement.getAttribute('y'));
                }
            }

            // 将<tspan>的文本内容设置到<text>元素中
            textElement.textContent = textContent;

            // 移除<tspan>元素
            tspanElement.remove();

            // 注意：<text>元素内的所有其他子元素（如果有的话）都被删除
        });
    });

    // 序列化修改后的DOM
    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);
    return modifiedHtmlString;
}

function removeDesc(svg) {
    // 删除 <desc> 标签（<desc>Created with Fabric.js 1.6.3</desc>）
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const descElement = doc.querySelector('desc');
    if (descElement) {
        descElement.remove();
    }
    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);
    return modifiedHtmlString;
}

function test() {
    var svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="864" height="563" viewBox="0 0 864 563" xml:space="preserve">
<desc>Created with Fabric.js 1.6.3</desc>
<defs/>
<g style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(188.9323353293413 -0.3371257485030128) scale(0.67 0.67)">
	<rect x="0" y="0" rx="0" ry="0" width="390" height="310" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 -0.9230769230769624 130.4230769230769) "/>
	<path d="M 0 0 h 300 v 300 h -300 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 8.326923076923038 139.6730769230769) " stroke-linecap="round"/>
	<path d="M 54.186 -139.871 A 150 150 0 0 0 0 -150 L 0 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 285.82692307692304 417.1730769230769) " stroke-linecap="round"/>
	<path d="M -78.965 127.533 A 150 150 0 1 0 54.186 -139.871 L 0 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 285.82692307692304 417.1730769230769) " stroke-linecap="round"/>
	<path d="M 0 -150 A 150 150 0 0 0 -78.965 127.533 L 0 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(228,87,86); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 285.82692307692304 417.1730769230769) " stroke-linecap="round"/>
	<path d="M 0 0 h 62 v 53 h -62 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 596.626923076923 139.6730769230769) " stroke-linecap="round"/>
	<path d="M 0 0 h 0 v 0 h 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 596.626923076923 169.2730769230769) " stroke-linecap="round"/>
	<path d="M 0 0 h 61.5712890625 v 11 h -61.5712890625 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 596.626923076923 169.2730769230769) " stroke-linecap="round"/>
	<path d="M 5 0 A 5 5 0 1 1 -5 0 A 5 5 0 1 1 5 0" style="stroke: none; stroke-width: 1.5; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 607.726923076923 180.3730769230769) " stroke-linecap="round"/>
		<g transform=" matrix(1.85 0 0 1.85 626.226923076923 185.9230769230769) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" x="0" y="-0.56">AssocProf</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.85 0 0 1.85 596.626923076923 169.2730769230769) " stroke-linecap="round"/>
	<path d="M 0 0 h 61.5712890625 v 11 h -61.5712890625 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 596.626923076923 193.3230769230769) " stroke-linecap="round"/>
	<path d="M 5 0 A 5 5 0 1 1 -5 0 A 5 5 0 1 1 5 0" style="stroke: none; stroke-width: 1.5; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 607.726923076923 204.4230769230769) " stroke-linecap="round"/>
		<g transform=" matrix(1.85 0 0 1.85 626.226923076923 209.97307692307692) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" x="0" y="-0.56">AsstProf</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.85 0 0 1.85 596.626923076923 193.3230769230769) " stroke-linecap="round"/>
	<path d="M 0 0 h 61.5712890625 v 11 h -61.5712890625 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 596.626923076923 217.3730769230769) " stroke-linecap="round"/>
	<path d="M 5 0 A 5 5 0 1 1 -5 0 A 5 5 0 1 1 5 0" style="stroke: none; stroke-width: 1.5; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(228,87,86); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.85 0 0 1.85 607.726923076923 228.47307692307692) " stroke-linecap="round"/>
		<g transform=" matrix(1.85 0 0 1.85 626.226923076923 234.02307692307693) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" x="0" y="-0.56">Professor</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.85 0 0 1.85 596.626923076923 217.3730769230769) " stroke-linecap="round"/>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.85 0 0 1.85 596.626923076923 169.2730769230769) " stroke-linecap="round"/>
		<g transform=" matrix(1.85 0 0 1.85 596.626923076923 156.3230769230769) ">
		<text font-family="sans-serif" font-size="11" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" x="0" y="-0.5">Rank</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.85 0 0 1.85 596.626923076923 139.6730769230769) " stroke-linecap="round"/>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.85 0 0 1.85 8.326923076923038 139.6730769230769) " stroke-linecap="round"/>
	<path d="M 598.0625 232.9375 Q 598.0625 232.9375 598.5625 232.9375 Q 599.0625 232.9375 603.4710083007812 233.10011291503906 Q 607.8795166015625 233.26272583007812 610.880126953125 233.44386291503906 Q 613.8807373046875 233.625 617.0547485351562 233.91197204589844 Q 620.228759765625 234.19894409179688 624.7037353515625 234.60995483398438 Q 629.1787109375 235.02096557617188 633.374755859375 235.40017700195312 Q 637.57080078125 235.77938842773438 641.1754760742188 236.2463836669922 Q 644.7801513671875 236.71337890625 647.849365234375 237.2439422607422 Q 650.9185791015625 237.77450561523438 653.6050415039062 238.2421417236328 Q 656.29150390625 238.70977783203125 658.7237548828125 239.1461639404297 Q 661.156005859375 239.58255004882812 663.4539794921875 239.82252502441406 Q 665.751953125 240.0625 668.4093017578125 240.223876953125 Q 671.066650390625 240.38525390625 673.5975952148438 240.50953674316406 Q 676.1285400390625 240.63381958007812 678.6472778320312 240.66236877441406 Q 681.166015625 240.69091796875 683.7297973632812 240.87806701660156 Q 686.2935791015625 241.06521606445312 688.877685546875 241.3461151123047 Q 691.4617919921875 241.62701416015625 693.768310546875 242.0021209716797 Q 696.0748291015625 242.37722778320312 697.8201904296875 242.65780639648438 Q 699.5655517578125 242.93838500976562 701.2503662109375 243.1566925048828 Q 702.9351806640625 243.375 704.30615234375 243.5 Q 705.6771240234375 243.625 707.3612670898438 243.65625 Q 709.04541015625 243.6875 710.0770263671875 243.6875 Q 711.108642578125 243.6875 711.5206298828125 243.6875 Q 711.9326171875 243.6875 711.5441284179688 243.41502380371094 Q 711.1556396484375 243.14254760742188 710.4003295898438 242.4875030517578 Q 709.64501953125 241.83245849609375 709.478759765625 241.66622924804688 L 709.3125 241.5" style="stroke: rgb(234,72,77); stroke-width: 1.7647058823529411; stroke-dasharray: NaN NaN; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0.002438821120904322 -0.0024999999999977263) " stroke-linecap="round"/>
	<path d="M 598.375 228.5625 Q 598.375 228.5625 598.875 228.5625 Q 599.375 228.5625 596.2191162109375 222.7574920654297 Q 593.063232421875 216.95248413085938 592.0341796875 213.71713256835938 Q 591.005126953125 210.48178100585938 590.5421142578125 207.53768920898438 Q 590.0791015625 204.59359741210938 589.91455078125 201.81640625 Q 589.75 199.03921508789062 589.75 195.77169799804688 Q 589.75 192.50418090820312 589.75 189.17062377929688 Q 589.75 185.83706665039062 589.75 182.63480377197266 Q 589.75 179.4325408935547 589.75 176.09397888183594 Q 589.75 172.7554168701172 589.75 169.36688232421875 Q 589.75 165.9783477783203 589.8125 162.9815216064453 Q 589.875 159.9846954345703 590.275634765625 156.94086456298828 Q 590.67626953125 153.89703369140625 591.2144775390625 150.81810760498047 Q 591.752685546875 147.7391815185547 592.2197875976562 144.48814392089844 Q 592.6868896484375 141.2371063232422 593.1319580078125 138.39202117919922 Q 593.5770263671875 135.54693603515625 594.1461181640625 133.0896453857422 Q 594.7152099609375 130.63235473632812 595.2454833984375 128.5017547607422 Q 595.7757568359375 126.37115478515625 596.2811279296875 124.75574493408203 Q 596.7864990234375 123.14033508300781 597.1547241210938 121.97892761230469 Q 597.52294921875 120.81752014160156 597.8656616210938 120.11705017089844 Q 598.2083740234375 119.41658020019531 598.546630859375 118.75096893310547 Q 598.8848876953125 118.08535766601562 599.3799438476562 117.79267883300781 L 599.875 117.5" style="stroke: rgb(234,72,77); stroke-width: 1.7647058823529411; stroke-dasharray: NaN NaN; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 -0.0025000000000545697 -0.0012499999999988631) " stroke-linecap="round"/>
</g>
</svg>`;
    svg = convertTspansToText(removeDesc(svg));
    console.log(svg);
}

$("#test").click(function () {
    test();
});