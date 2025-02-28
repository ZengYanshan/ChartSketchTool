function vega_lite_spec_to_svg(vlSpec, successCallback) {
    vegaEmbed('#view', vlSpec).then(function (result) {
        var view = result.view;

        view.toSVG().then(function (svg) {
            // console.log(svg);
            successCallback(svg);
            return svg;

            // 下载 svg
            // const filename = 'chart.svg';
            // const url = 'data:image/svg+xml,' + encodeURIComponent(svg);
            // const link = document.createElement('a');
            // link.setAttribute('href', url);
            // link.setAttribute('target', '_blank');
            // link.setAttribute('download', filename);
            // link.dispatchEvent(new MouseEvent('click'));
        }).catch(function (error) {
            console.error(error);
        });
    });
}