//List of global variables used throughout the code. Most are simply declared, then later adjusted in settings().
var canvas;
var ctx;
//paddle variables
var pWidth;     //Paddle width.
var pHeight;    //Paddle height.
var xPadding;   //padding (distance from) on the x-axis.
var p1YPos;     //Paddle #1 Y position.
var p2YPos;     //Paddle #2 Y position.
//ball variables
var ballx;
var bally;
var ballSize;

function onload() {
    "use strict";
    canvas = document.getElementById("canvas");    //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d');      //Creates a "CanvasRenderingContext2D"-object
    canvas.width = window.innerWidth;   //Sets canvas size to window size.
    canvas.height = window.innerHeight; // ^.
    
    window.addEventListener('resize', resizeCanvas, false) //EventListener for 'resize' of window. Runs resizeCanvas(). 
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
    
    ballSize = pWidth; //Same size as the width of the paddles.
    ballx = (canvas.width / 2);
    bally = (canvas.height / 2);
}

function resizeCanvas() {
    "use strict";
    //Fetches window size and updates canvas dimension variables.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //Draws canvas background in side window
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
}

function gameloop() {
    "use strict";
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawRect(xPadding, p1YPos, pWidth, pHeight); //Player1Paddle
    drawRect(canvas.width - xPadding - pWidth, p2YPos, pWidth, pHeight); //Player2Paddle
    drawRect(ballx, bally, ballSize, ballSize); //Ball
    
    requestAnimationFrame(gameloop);
}

function drawRect(cornerx, cornery, width, height) {
    "use strict";
    ctx.beginPath();
    ctx.rect(cornerx, cornery, width, height);
    ctx.fillStyle = "#eeeeee";
    ctx.fill();
}

