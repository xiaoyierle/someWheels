var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
var getCss = function(b, a) {
    return b.currentStyle ? b.currentStyle[a] : document.defaultView.getComputedStyle(b, false)[a]
};
var startDrag = function(a, b, c) {
    if (getCss(b, "left") !== "auto") {
        params.left = getCss(b, "left")
    }
    if (getCss(b, "top") !== "auto") {
        params.top = getCss(b, "top")
    }
    a.onmousedown = function(d) {
        params.flag = true;
        if (!d) {
            d = window.event;
            a.onselectstart = function() {
                return false
            }
        }
        var f = d;
        params.currentX = f.clientX;
        params.currentY = f.clientY;
        console.log('mouseDown')
    }
    ;
    document.onmouseup = function() {
        params.flag = false;
        if (getCss(b, "left") !== "auto") {
            params.left = getCss(b, "left")
        }
        if (getCss(b, "top") !== "auto") {
            params.top = getCss(b, "top")
        }
        console.log('onmouseup')
    }
    ;
    document.onmousemove = function(i) {
        console.log('onmousemove')
        var j = i ? i : window.event;
        if (params.flag) {
            var f = j.clientX
              , d = j.clientY;
            var h = f - params.currentX
              , g = d - params.currentY;
            b.style.left = parseInt(params.left) + h + "px";
            b.style.top = parseInt(params.top) + g + "px";
            if (typeof c == "function") {
                c((parseInt(params.left) || 0) + h, (parseInt(params.top) || 0) + g)
            }
            if (i.preventDefault) {
                i.preventDefault()
            }
            return false
        }
    }
};
