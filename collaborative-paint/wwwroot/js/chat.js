// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:

var startXArray = [], startYArray = [], endXArray = [], endYArray = [];

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceivePaint", (startX, startY, endX, endY) => { 
    for (var i = 0; i < startX.length; i++) {
        ctx.beginPath();
        ctx.moveTo(startX[i], startY[i]);
        ctx.lineTo(endX[i], endY[i]);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
});

document.getElementById("sendButton").addEventListener("click", event => {
    connection.invoke("BroadcastPaint", startXArray, startYArray, endXArray, endYArray).catch(err => console.error(err));
    event.preventDefault();
});

setInterval(function(){
        connection.invoke("BroadcastPaint", startXArray, startYArray, endXArray, endYArray).catch(err => console.error(err));
        startXArray = [];
        startYArray = [];
        endXArray = [];
        endYArray = [];
    }, 100);


connection.start().catch(err => console.error(err));

var canvas, ctx, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var x = "black",
y = 2;

function init() {
canvas = document.getElementById('can');
ctx = canvas.getContext("2d");
w = canvas.width;
h = canvas.height;

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

function color(obj) {
switch (obj.id) {
    case "green":
        x = "green";
        break;
    case "blue":
        x = "blue";
        break;
    case "red":
        x = "red";
        break;
    case "yellow":
        x = "yellow";
        break;
    case "orange":
        x = "orange";
        break;
    case "black":
        x = "black";
        break;
    case "white":
        x = "white";
        break;
}
if (x == "white") y = 14;
else y = 2;

}

function draw() {
    startXArray.push(prevX);
    startYArray.push(prevY);
    endXArray.push(currX);
    endYArray.push(currY);

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
var m = confirm("Want to clear");
if (m) {
    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";
}
}

function findxy(res, e) {
if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
    }
}
if (res == 'up' || res == "out") {
    flag = false;
}
if (res == 'move') {
    if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        draw();
    }
}
}

init();