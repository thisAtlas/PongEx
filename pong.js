//List of global variables used throughout the code. Most are simply declared, then later adjusted in settings().
var canvas;
var ctx;
//paddle variables
var pWidth;     //Paddle width.
var pHeight;    //Paddle height.
var xPadding;   //Padding (distance from) on the x-axis.
var p1YPos;     //Paddle #1 Y position.
var p2YPos;     //Paddle #2 Y position.
//ball variables
var ballx;      //Ball x position.
var bally;      //Ball y position.
var ballSize;   //Ball size (side length).
//score
var score1;
var score2;
var fontSize;

function onload() {
    "use strict";
    canvas = document.getElementById("canvas");    //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d');      //Creates a "CanvasRenderingContext2D"-object
    canvas.width = window.innerWidth;   //Sets canvas size to window size.
    canvas.height = window.innerHeight; // ^.
    
    window.addEventListener('resize', resizeCanvas, false); //EventListener for 'resize' of window. Runs resizeCanvas(). 
    resizeCanvas();
    
    settings();
    gameloop();
}

function settings() {
    "use strict";
    pWidth = canvas.width / 250;
    pHeight = canvas.height / 10;
    
    xPadding = canvas.width / 100;
    
    p1YPos = (canvas.height / 2) - (pHeight / 2);
    p2YPos = (canvas.height / 2) - (pHeight / 2);
    
    ballSize = pWidth * 1.2; //1.2 times the width of the paddle.
    ballx = (canvas.width / 2);
    bally = (canvas.height / 2);
    
    score1 = 0;
    score2 = 0;
    
}

function resizeCanvas() {
    "use strict";
    //Fetches window size and updates canvas dimension variables.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //Draws canvas background in side window
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    
    settings(); //Runs settings again to update sizes of objects.
}

function gameloop() {
    "use strict";
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    draw();
    
    requestAnimationFrame(gameloop);
}

function drawRect(cornerx, cornery, width, height) {
    "use strict";
    ctx.beginPath();
    ctx.rect(cornerx, cornery, width, height);
    ctx.fillStyle = "#eeeeee";
    ctx.fill();
}

function drawLine(dash, space, x1, y1, x2, y2) {
    "use strict";
    ctx.setLineDash([dash, space]);
    ctx.beginPath();
    ctx.strokeStyle = '#eeeeee';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawText(text, x, y, ratio, rightAlign) {
    "use strict";
     fontSize = canvas.height / ratio;
    
    ctx.font = fontSize + 'px Nova Square';
    if (rightAlign === true) {
        var textSize = ctx.measureText(text).width;
        ctx.fillText(text, x - textSize, y);
    } else {
        ctx.fillText(text, x, y);
    }
}

function draw() {
    "use strict";
    drawRect(xPadding, p1YPos, pWidth, pHeight); //Player1Paddle
    drawRect(canvas.width - xPadding - pWidth, p2YPos, pWidth, pHeight); //Player2Paddle
    drawRect(ballx - (ballSize / 2), bally - (ballSize / 2), ballSize, ballSize); //Ball
    
    drawLine(12, 12, (canvas.width / 2), 0, (canvas.width / 2), canvas.height); //Vertical line
    
    drawText(score1, canvas.width * 0.98 / 2, 10 + canvas.height * 0.05, 25, true); //player1 score
    drawText(score2, canvas.width * 1.02 / 2, 10 + canvas.height * 0.05, 25, false); //player2 score
    
}