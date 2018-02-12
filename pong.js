
//List of global variables used throughout the code. Most are simply declared, then later adjusted in settings().
var canvas;
var ctx;
//paddle variables
var PWidth;     //Paddle width.
var PHeight;    //Paddle height.

var xPadding;   //padding (distance from) on the x-axis.

var playerYPos;
var AIYPos;

function onload() {
    "use strict";
    canvas = document.getElementById("canvas");    //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d');    //Creates a "CanvasRenderingContext2D"-object
    
    settings();
    gameloop();
}

function settings() {
    "use strict";
    PWidth = canvas.width / 250;
    PHeight = canvas.height / 10;
    
    xPadding = canvas.width / 40;
    
    playerYPos = (canvas.height / 2) - (PHeight / 2);
    AIYPos = (canvas.height / 2) - (PHeight / 2);
}

function gameloop() {
    "use strict";
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle(xPadding, playerYPos, PWidth, PHeight);
    drawPaddle(canvas.width - xPadding - PWidth, AIYPos, PWidth, PHeight);
    
    console.log("gameloop run")
    requestAnimationFrame(gameloop);
}

function drawPaddle(cornerx, cornery, width, height) {
    "use strict";
    ctx.beginPath();
    ctx.rect(cornerx, cornery, width, height);
    ctx.fillStyle = "#eeeeee";
    ctx.fill();
}