function toast(msg) {
    window.plugins.toast.showShortTop(
        msg,
        function (a) { console.log('toast success: ' + a) },
        function (b) { alert('toast error: ' + b) });
}