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


function test() {
    var svg = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="864" height="563" viewBox="0 0 864 563" xml:space="preserve">
<desc>Created with Fabric.js 1.6.3</desc>
<defs></defs>
<g style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-0.5 -0.5)" >
	<rect x="0" y="0" rx="0" ry="0" width="183" height="378" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 294.973544973545 -0.744708994708958) "/>
	<path d="M 0.5 0.5 h 80 v 300 h -80 Z" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 0 0 h 0 v 0 h 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 7.450291005291042) " stroke-linecap="round" />
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 454.45029100529104) "/>
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 373.99029100529106) "/>
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 295.020291005291) "/>
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 214.56029100529105) "/>
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 135.59029100529105) "/>
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(221,221,221); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 55.13029100529104) "/>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 7.450291005291042) " stroke-linecap="round" />
	<path d="M 0 0 h 0 v 0 h 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 454.45029100529104) " stroke-linecap="round" />
	<line x1="0" y1="0" x2="0" y2="5" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 368.728544973545 454.45029100529104) "/>
	<line x1="0" y1="0" x2="0" y2="5" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 398.528544973545 454.45029100529104) "/>
	<line x1="0" y1="0" x2="0" y2="5" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 428.32854497354504 454.45029100529104) "/>
	<line x1="0" y1="0" x2="0" y2="5" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 458.128544973545 454.45029100529104) "/>
		<g transform=" matrix(-2.737085596094334e-16 -1.49 1.49 -2.737085596094334e-16 372.45354497354504 464.88029100529104) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">Professor</tspan>
		</text>
	</g>
		<g transform=" matrix(-2.737085596094334e-16 -1.49 1.49 -2.737085596094334e-16 402.253544973545 464.88029100529104) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">AsstProf</tspan>
		</text>
	</g>
		<g transform=" matrix(-2.737085596094334e-16 -1.49 1.49 -2.737085596094334e-16 432.05354497354506 464.88029100529104) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">AssocProf</tspan>
		</text>
	</g>
		<g transform=" matrix(-2.737085596094334e-16 -1.49 1.49 -2.737085596094334e-16 461.853544973545 464.88029100529104) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">Instructor</tspan>
		</text>
	</g>
	<line x1="0" y1="0" x2="80" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 454.45029100529104) "/>
		<g transform=" matrix(1.49 0 0 1.49 413.428544973545 552.151511708416) ">
		<text font-family="sans-serif" font-size="11" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.25" fill="rgb(0,0,0)">Rank</tspan>
		</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 454.45029100529104) " stroke-linecap="round" />
	<path d="M 0 0 h 0 v 0 h 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 7.450291005291042) " stroke-linecap="round" />
	<line x1="0" y1="0" x2="-5" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 454.45029100529104) "/>
	<line x1="0" y1="0" x2="-5" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 373.99029100529106) "/>
	<line x1="0" y1="0" x2="-5" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 295.020291005291) "/>
	<line x1="0" y1="0" x2="-5" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 214.56029100529105) "/>
	<line x1="0" y1="0" x2="-5" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 135.59029100529105) "/>
	<line x1="0" y1="0" x2="-5" y2="0" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 55.13029100529104) "/>
		<g transform=" matrix(1.49 0 0 1.49 343.39854497354503 458.92029100529106) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">0</tspan>
		</text>
	</g>
		<g transform=" matrix(1.49 0 0 1.49 343.39854497354503 379.09886243386245) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">5</tspan>
		</text>
	</g>
		<g transform=" matrix(1.49 0 0 1.49 343.39854497354503 299.27743386243384) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">10</tspan>
		</text>
	</g>
		<g transform=" matrix(1.49 0 0 1.49 343.39854497354503 219.4560052910053) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">15</tspan>
		</text>
	</g>
		<g transform=" matrix(1.49 0 0 1.49 343.39854497354503 139.63457671957676) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">20</tspan>
		</text>
	</g>
		<g transform=" matrix(1.49 0 0 1.49 343.39854497354503 59.813148148148166) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">25</tspan>
		</text>
	</g>
	<line x1="0" y1="0" x2="0" y2="-300" style="stroke: rgb(136,136,136); stroke-width: 1; stroke-dasharray: NaN NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 454.45029100529104) "/>
		<g transform=" matrix(9.123618653647781e-17 -1.49 1.49 9.123618653647781e-17 317.885205129795 230.95029100529104) ">
		<text font-family="sans-serif" font-size="11" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.25" fill="rgb(0,0,0)">count(*)</tspan>
		</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 353.82854497354504 7.450291005291042) " stroke-linecap="round" />
	<path d="M 41 214.28571428571428 h 18 v 10.714285714285722 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 21 139.28571428571428 h 18 v 32.14285714285714 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 61 214.28571428571428 h 18 v 32.14285714285714 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 1 10.71428571428571 h 18 v 0 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 41 225 h 18 v 75 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 21 171.42857142857142 h 18 v 128.57142857142858 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 61 246.42857142857142 h 18 v 53.571428571428584 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 1 10.71428571428571 h 18 v 289.2857142857143 h -18 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 0 0 h 41 v 40 h -41 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 499.103544973545 6.705291005291042) " stroke-linecap="round" />
	<path d="M 0 0 h 0 v 0 h 0 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 499.103544973545 30.54529100529104) " stroke-linecap="round" />
	<path d="M 0 0 h 24.330078125 v 11 h -24.330078125 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 499.103544973545 30.54529100529104) " stroke-linecap="round" />
	<path d="M -5 -5 h 10 v 10 h -10 Z" style="stroke: none; stroke-width: 1.5; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(76,120,168); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 508.043544973545 39.48529100529104) " stroke-linecap="round" />
		<g transform=" matrix(1.49 0 0 1.49 522.943544973545 43.955291005291045) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">F</tspan>
		</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 499.103544973545 30.54529100529104) " stroke-linecap="round" />
	<path d="M 0 0 h 24.330078125 v 11 h -24.330078125 Z" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 499.103544973545 49.91529100529104) " stroke-linecap="round" />
	<path d="M -5 -5 h 10 v 10 h -10 Z" style="stroke: none; stroke-width: 1.5; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(245,133,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1.49 0 0 1.49 508.043544973545 58.85529100529104) " stroke-linecap="round" />
		<g transform=" matrix(1.49 0 0 1.49 522.943544973545 63.325291005291035) ">
		<text font-family="sans-serif" font-size="10" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.28" fill="rgb(0,0,0)">M</tspan>
		</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 499.103544973545 49.91529100529104) " stroke-linecap="round" />
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 499.103544973545 30.54529100529104) " stroke-linecap="round" />
		<g transform=" matrix(1.49 0 0 1.49 499.103544973545 20.11529100529104) ">
		<text font-family="sans-serif" font-size="11" font-weight="bold" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" >
			<tspan x="0" y="-0.25" fill="rgb(0,0,0)">classify</tspan>
		</text>
	</g>
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 499.103544973545 6.705291005291042) " stroke-linecap="round" />
	<path d="" style="stroke: none; stroke-width: 1; stroke-dasharray: NaN; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1; visibility: hidden;" transform=" matrix(1.49 0 0 1.49 353.08354497354503 6.705291005291042) " stroke-linecap="round" />
	<path d="M 301.9375 191.8125 Q 301.9375 191.8125 302.4375 191.8125 Q 302.9375 191.8125 309.2441864013672 192.10791015625 Q 315.5508728027344 192.4033203125 316.1191864013672 192.54541015625 Q 316.6875 192.6875 316.9375 192.84375 Q 317.1875 193 317.71875 193.28125 Q 318.25 193.5625 318.3125 193.65625 Q 318.375 193.75 318.84849548339844 193.99273681640625 Q 319.3219909667969 194.2354736328125 319.7284393310547 194.88473510742188 Q 320.1348876953125 195.53399658203125 320.37994384765625 196.44357299804688 Q 320.625 197.3531494140625 320.625 199.2550048828125 Q 320.625 201.1568603515625 320.625 203.79837036132812 Q 320.625 206.43988037109375 320.625 209.96994018554688 Q 320.625 213.5 320.4550323486328 218.466064453125 Q 320.2850646972656 223.43212890625 320.0380554199219 227.67074584960938 Q 319.7910461425781 231.90936279296875 319.34423828125 235.967529296875 Q 318.8974304199219 240.02569580078125 318.66746520996094 243.736083984375 Q 318.4375 247.44647216796875 318.15625 250.465576171875 Q 317.875 253.48468017578125 317.71026611328125 255.773193359375 Q 317.5455322265625 258.06170654296875 317.49151611328125 259.9937438964844 Q 317.4375 261.92578125 317.375 263.30438232421875 Q 317.3125 264.6829833984375 317.149169921875 265.82147216796875 Q 316.98583984375 266.9599609375 316.867919921875 267.6494140625 Q 316.75 268.3388671875 316.5190887451172 269.00018310546875 Q 316.2881774902344 269.6614990234375 316.1382141113281 270.0553894042969 Q 315.9882507324219 270.44927978515625 315.73907470703125 270.8597412109375 Q 315.4898986816406 271.27020263671875 315.1737365722656 271.612548828125 Q 314.8575744628906 271.95489501953125 314.19435119628906 272.4931335449219 Q 313.5311279296875 273.0313720703125 312.52574157714844 273.5887145996094 Q 311.5203552246094 274.14605712890625 310.4949188232422 274.5196838378906 Q 309.469482421875 274.893310546875 308.3060302734375 275.1728820800781 Q 307.142578125 275.45245361328125 306.08790588378906 275.6070861816406 Q 305.0332336425781 275.76171875 304.06654357910156 275.82086181640625 Q 303.099853515625 275.8800048828125 302.2634582519531 275.87750244140625 Q 301.42706298828125 275.875 300.9305419921875 275.875 Q 300.43402099609375 275.875 300.1531677246094 275.875 Q 299.872314453125 275.875 299.7486572265625 275.875 Q 299.625 275.875 299.59375 275.84375 Q 299.5625 275.8125 299.40577697753906 275.7178039550781 Q 299.2490539550781 275.62310791015625 298.96820068359375 275.3426513671875 Q 298.6873474121094 275.06219482421875 298.2505645751953 274.0336608886719 Q 297.81378173828125 273.005126953125 297.4076385498047 271.0732116699219 Q 297.0014953613281 269.14129638671875 296.87574768066406 266.6220703125 Q 296.75 264.10284423828125 296.75 261.1334228515625 Q 296.75 258.16400146484375 296.75 253.66583251953125 Q 296.75 249.16766357421875 297.08807373046875 243.927490234375 Q 297.4261474609375 238.68731689453125 298.0706024169922 233.21224975585938 Q 298.7150573730469 227.7371826171875 299.041748046875 222.97872924804688 Q 299.3684387207031 218.22027587890625 299.7355651855469 213.75439453125 Q 300.1026916503906 209.28851318359375 300.6866149902344 205.80935668945312 Q 301.2705383300781 202.3302001953125 301.5902557373047 200.48764038085938 Q 301.90997314453125 198.64508056640625 302.0749969482422 197.56622314453125 Q 302.2400207519531 196.48736572265625 302.40126037597656 195.78561401367188 Q 302.5625 195.0838623046875 302.65625 194.63568115234375 Q 302.75 194.1875 302.78125 194.0625 Q 302.8125 193.9375 303.15625 193.4375 L 303.5 192.9375" style="stroke: rgb(234,72,77); stroke-width: 1.7647058823529411; stroke-dasharray: NaN NaN; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0.0024999999999977263 0.004608268597621645) " stroke-linecap="round" />
</g>
</svg>`;
    svg = convertTspansToText(svg);
    console.log(svg);
}

$("#test").click(function () {
    test();
});