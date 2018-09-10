// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:

var startXArray = [], startYArray = [], endXArray = [], endYArray = [];

var canvas, ctx, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var brushColor = "black",
brushThickness = 2;

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceivePaint", (startX, startY, endX, endY) => { 
    for (var i = 0; i < startX.length; i++) {
        ctx.beginPath();
        ctx.moveTo(startX[i], startY[i]);
        ctx.lineTo(endX[i], endY[i]);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushThickness;
        ctx.stroke();
        ctx.closePath();
    }
});

setInterval(function(){
    if (connection.connection.connectionState == 1) {
        connection.invoke("BroadcastPaint", startXArray, startYArray, endXArray, endYArray).catch(err => console.error(err));
        startXArray = [];
        startYArray = [];
        endXArray = [];
        endYArray = [];
    }
}, 100);

connection.start().catch(err => console.error(err));

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);

    canvas.addEventListener("touchstart", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);
    canvas.addEventListener("touchend", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);
    canvas.addEventListener("touchmove", function (e) {
        findxy(e)
        e.preventDefault();
    }, false);
}

function color(obj) {
switch (obj.id) {
    case "green":
    brushColor = "green";
        break;
    case "blue":
    brushColor = "blue";
        break;
    case "red":
    brushColor = "red";
        break;
    case "yellow":
    brushColor = "yellow";
        break;
    case "orange":
    brushColor = "orange";
        break;
    case "black":
    brushColor = "black";
        break;
    case "white":
    brushColor = "white";
        break;
}
if (brushColor == "white") y = 14;
else brushThickness = 2;

}

function draw() {
    startXArray.push(prevX);
    startYArray.push(prevY);
    endXArray.push(currX);
    endYArray.push(currY);

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushThickness;
    ctx.stroke();
    ctx.closePath();
}

function findxy(e) {
if (e.type === 'touchstart' || e.type === 'mousedown') {
    prevX = currX;
    prevY = currY;

    if (e.type === 'mousedown') {
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
    }

    if (e.type === 'touchstart') {
        currX = e.touches[0].clientX - canvas.offsetLeft;
        currY = e.touches[0].clientY - canvas.offsetTop;
    }

    flag = true;
    dot_flag = true;
    if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = brushColor;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
    }
}
if (e.type === 'touchend' || e.type === 'mouseup' || e.type === 'mouseout') {
    flag = false;
}
if (e.type === 'mousemove' || e.type === 'touchmove' ) {
    if (flag) {
        prevX = currX;
        prevY = currY;

        if (e.type === 'mousemove') {
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
        }
    
        if (e.type === 'touchmove') {
            currX = e.touches[0].clientX - canvas.offsetLeft;
            currY = e.touches[0].clientY - canvas.offsetTop;
        }
        draw();
    }
}
}

init();