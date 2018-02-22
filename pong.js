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
var ballX;      //Ball x position.
var ballY;      //Ball y position.
var ballSize;   //Ball size (side length).
var ballXSpeed = 1; //Speed of ball on x-axis.
var ballYSpeed = -1; //Speed of ball on y-axis.
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
    
    defaultSettings();
    variableSettings();
    gameloop();
}

function defaultSettings() {
    "use strict";
    p1YPos = (canvas.height / 2) - (pHeight / 2);
    p2YPos = (canvas.height / 2) - (pHeight / 2);
    
    ballX = (canvas.width / 2);
    ballY = (canvas.height / 2);
    
    score1 = 0;
    score2 = 0;
}

function variableSettings() {
    pWidth = canvas.width / 250;
    pHeight = canvas.height / 10;
    
    xPadding = canvas.width / 100;
    
    ballSize = pWidth * 1.2; //1.2 times the width of the paddle.
    
}

function resizeCanvas() {
    "use strict";
    //Fetches window size and updates canvas dimension variables.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //Draws canvas background in side window
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    
    variableSettings(); //Runs settings again to update sizes of objects.
}

function gameloop() {
    "use strict";
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    draw();
    move();
    //collision
    //wincheck
    
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
    
    var textHeight = ctx.measureText('M').width, //The letter M is almost square so one can approximate the height of the text.
        textWidth = ctx.measureText(text).width;
    
    y = y + textHeight;
    
    ctx.font = fontSize + 'px Nova Square';
    if (rightAlign === true) {
        ctx.fillText(text, x - textWidth, y);
    } else {
        ctx.fillText(text, x, y);
    }
}

function draw() {
    "use strict";
    drawRect(xPadding, p1YPos, pWidth, pHeight); //Player1Paddle
    drawRect(canvas.width - xPadding - pWidth, p2YPos, pWidth, pHeight); //Player2Paddle
    drawRect(ballX - (ballSize / 2), ballY - (ballSize / 2), ballSize, ballSize); //Ball
    
    drawLine(12, 12, (canvas.width / 2), 0, (canvas.width / 2), canvas.height); //Vertical line
    
    drawText(score1, canvas.width * 0.98 / 2, canvas.height / 100, 15, true); //player1 score
    drawText(score2, canvas.width * 1.02 / 2, canvas.height / 100, 15, false); //player2 score
}

function ballMove() {
    "use strict";
    ballX += ballXSpeed;
    ballY += ballYSpeed;
}

function move() {
    "use strict";
    ballMove();
}