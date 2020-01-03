let canvas;
let ctx;
let prevX = 0;
let currX = 0;
let prevY = 0;
let currY = 0;
let dotFlag = false;
let x = "black";
let y = 2;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);

    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);

    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);

    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(value) {
    x = value;
}

function width(value) {
    y = value;
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    const m = confirm("Want to clear");

    if (m) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    document.getElementById("canvasimg").src = canvas.toDataURL();
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res === 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dotFlag = true;

        if (dotFlag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dotFlag = false;
        }
    }

    if (res === 'up' || res === "out") {
        flag = false;
    }

    if (res === 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            draw();
        }
    }
}