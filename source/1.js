require(['vui'], function () {
    VUI.fn.abc = '4352';
    console.log(VUI.q(document.getElementById('abc')).length);
});