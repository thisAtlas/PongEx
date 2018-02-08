var canvas;
var ctx;

function onload() {
    "use strict";
    canvas = document.getElementById("canvas"); //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d'); //Creates a "CanvasRenderingContext2D"-object
    
    settings();
    gameloop();
}

function settings() {
    
}

function gameloop() {
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle(xPadding, playerYPos, PWidth, PHeight);
    drawPaddle(canvas.width - xPadding - PWidth, AIPy, PHeight);
    
}

function drawPaddle(cornerx, cornery, width, height) {
    ctx.beginPath();
    ctx.rect(cornerx, cornery, width, height);
    ctx.fillStyle = "#eeeeee";
    ctx.fill();
}