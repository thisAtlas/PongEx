//List of global variables used throughout the code. Most are simply declared, then later adjusted in settings().
var canvas,
    ctx;
//paddle variables
var pWidth,         //Paddle width.
    pHeight,        //Paddle height.
    xPadding,       //Padding (distance from) on the x-axis.
    p1YPos,         //Paddle #1 Y position.
    p2YPos;         //Paddle #2 Y position.
//ball variables
var ballX,          //Ball x position.
    ballY,          //Ball y position.
    ballSize,       //Ball size (side length).
    ballXSpeed,     //Speed of ball on x-axis.
    ballYSpeed;     //Speed of ball on y-axis.
//score and text variables
var score1,
    score2,
    fontSize;
//
var press1Text,
    press2Text,
    player1Instructions;

function onload() {
    "use strict";
    canvas = document.getElementById("canvas");    //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d');      //Creates a "CanvasRenderingContext2D"-object
    canvas.width = window.innerWidth;   //Sets canvas size to window size.
    canvas.height = window.innerHeight; // ^.
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false); //EventListener for 'resize' of window. Runs resizeCanvas(). 
    
    
    defaultSettings();
    variableSettings();
    
    startMenu();
    //gameloop();
    
    console.log('onload() run');
}

function defaultSettings() {
    "use strict";
    p1YPos = (canvas.height / 2) - (pHeight / 2);
    p2YPos = (canvas.height / 2) - (pHeight / 2);
    
    ballX = (canvas.width / 2);
    ballY = (canvas.height / 2);
    
    score1 = 1;
    score2 = 2;
    
    ballXSpeed = 2.5;
    ballYSpeed = -2.5;
}

function variableSettings() {
    "use strict";
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

function startMenu() {
    "use strict";
    draw(); 
    /* Bug: Første gang drawText kører placerer den ikke tekst
     * rigtigt. Ved anden drawText virker det, så draw() køres en gang
     * før canvas bliver cleared, for at undgå det problem.
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    draw();
    
    press1Text = "Press '1' for singleplayer.";
    press2Text = "Press '2' for multiplayer.";
    player1Instructions = "'W' to move up 'S' to move down";
    
    //Samme bug som før. Right-align virker ikke.
    drawText(press1Text, canvas.width / 15, canvas.height / 10, 25, false);
    drawText(press2Text, canvas.width - canvas.width / 15, canvas.height / 10, 25, true);
    
    
    //console.log('startMenu run');
    
    requestAnimationFrame(startMenu);
    
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
    
    console.log("W: " + textWidth + " H: " + textHeight);
    
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
    
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballYSpeed = -ballYSpeed;
    }
    if (ballX <= 0 || ballX + ballSize >= canvas.width) {
        //ballXSpeed = -ballXSpeed; //POC: Ball Bounce on all four walls, not just vertically.
        
    }
}

function move() {
    "use strict";
    ballMove();
}