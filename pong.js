"use strict"; //JSLint syntax.
//List of global variables used throughout the code. Most are simply declared, then later adjusted in settings().
var canvas,
    ctx,
    firstRun = true,
//paddle variables
    pWidth,         //Paddle width.
    pHeight,        //Paddle height.
    xPadding,       //Padding (distance from) on the x-axis.
    p1YPos,         //Paddle #1 Y position.
    p2YPos,         //Paddle #2 Y position.
//ball variables
    ballX,          //Ball x position.
    ballY,          //Ball y position.
    ballSize,       //Ball size (side length).
    ballXSpeed,     //Speed of ball on x-axis.
    ballYSpeed,     //Speed of ball on y-axis.
//score and text variables
    score1,         //String for player1 score.
    score2,         //String for player2 score.
    scoreToWin,     //Score needed to win the round.
    fontSize,       //Size of text.
//movement variables
    p1Up,           //
    p1Down,         //
    p2Up,           //
    p2Down,         //
    paddleSpeed;    //
    

function onload() {
    canvas = document.getElementById("canvas");    //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d');      //Creates a "CanvasRenderingContext2D"-object
    canvas.width = window.innerWidth;   //Sets canvas size to window size.
    canvas.height = window.innerHeight; // ^
    
    settings();
    
    resizeCanvas();
    
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    
    
    if (firstRun === true) {
        console.log('onload() run successfully.');
    }
    
    gameloop();
}

function settings() {
    pWidth = canvas.width / 250;
    pHeight = canvas.height / 12;
    
    xPadding = canvas.width / 100;
    p1YPos = (canvas.height / 2) - (pHeight / 2);
    p2YPos = (canvas.height / 2) - (pHeight / 2);
    
    ballSize = pWidth; //1.2 times the width of the paddle.
    ballX = (canvas.width / 2) - (ballSize / 2);
    ballY = (canvas.height / 2) - (ballSize / 2);
    
    score1 = score2 = 0;
    scoreToWin = 10;
    
    ballXSpeed = -2.5;
    ballYSpeed = -2.5;
    
    p1Up = false;
    p1Down = false;
    p2Up = false;
    p2Down = false;
    paddleSpeed = ballSize / 2.5;
    
    if (firstRun === true) {
        console.log('settings() run successfully.');
    }
}

function resizeCanvas() {
    //Fetches window size and updates canvas dimension variables.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //Draws canvas background in side window
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    
    if (firstRun === true) {
        console.log('resizeCanvas run successfully.');
    }
}

function keyDownHandler(e) {
    if (e.keyCode === 87) {
        p1Up = true;
        console.log("p1Up = true");
    }
    if (e.keyCode === 83) {
        p1Down = true;
        console.log("p1Down = true");
    }
    /*if (e.keyCode === 38) {
        p2Up = true;
        console.log("p2Up = true");
    }
    if (e.keyCode === 40) {
        p2Down = true;
        console.log("p2Down = true");
    }*/
}

function keyUpHandler(e) {   
    if (e.keyCode === 87) {
        p1Up = false;
        console.log("p1Up = false");
    }
    if (e.keyCode === 83) {
        p1Down = false;
        console.log("p1Down = false");
    }
    /*if (e.keyCode === 38) {
        p2Up = false;
        console.log("p2Up = false");
    }
    if (e.keyCode === 40) {
        p2Down = false;
        console.log("p2Down = false");
    }*/
}

/*function startMenu() {
    draw();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    draw();
    drawInfo();
    
    if(p1Active === true || p2Active === true) {
        requestAnimationFrame(startMenu);
    }
}*/

function gameloop() {
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    move();
    draw();
    
    if (firstRun === true) {
        console.log('gameloop() run successfully.');
    }
    
    firstRun = false;
    requestAnimationFrame(gameloop);
}

function ballMove() {
    ballX += ballXSpeed;
    ballY += ballYSpeed;
    
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballYSpeed = -ballYSpeed;
    }
    
    if (firstRun === true) {
        console.log('ballMove() run successfully.');
    }
}

function paddleMove() {
    if (p1Up === true && p1YPos - ballSize > 0) {
        p1YPos -= paddleSpeed;
    } else if (p1Down === true && p1YPos + pHeight < canvas.height - ballSize) {
        p1YPos += paddleSpeed;
    }
    /*if (p2Up === true && p2YPos - ballSize > 0) {
        p2YPos -= paddleSpeed;
        console.log("p2Up = true");
    } else if (p2Up === true && p2YPos + pHeight < canvas.height - ballSize) {
        p2YPos += paddleSpeed;
        console.log("p2Down = true");
    }*/
    
    if (firstRun === true) {
        console.log('paddleMove() run successfully.');
    }
}

function move() {
    ballMove();
    paddleMove();
    
    if (firstRun === true) {
        console.log("move() run successfully.");
    }
}

function drawRect(cornerx, cornery, width, height) {
    ctx.beginPath();
    ctx.rect(cornerx, cornery, width, height);
    ctx.fillStyle = "#eeeeee";
    ctx.fill();
}

function drawLine(dash, space, x1, y1, x2, y2) {
    ctx.setLineDash([dash, space]);
    ctx.beginPath();
    ctx.strokeStyle = '#eeeeee';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawText(text, x, y, ratio, rightAlign) {
    fontSize = canvas.height / ratio;
    
    var textHeight = fontSize;
    
    ctx.font = fontSize + 'px Arial';
    ctx.font = fontSize + 'px Nova Square';
    ctx.fillStyle = "#eeeeee";
    
    var textWidth = ctx.measureText(text).width;
    
    if (rightAlign !== true) {
        ctx.fillText(text, x + 10, y + textHeight);
    } else {
        ctx.fillText(text, x - textWidth - 10, y + textHeight);
    }
}

/*function drawInfo() {
    drawText(press1Text, canvas.width / 15, canvas.height / 10, 40, false);
    drawText(press2Text, canvas.width - canvas.width / 15, canvas.height / 10, 40, true);
    
    drawText(player1Instr, canvas.width / 15, canvas.height / 10 + fontSize, 40, false);
    drawText(player2Instr, canvas.width - canvas.width / 15, canvas.height / 10 + fontSize, 40, true);
}*/

function draw() {
    drawRect(xPadding, p1YPos, pWidth, pHeight); //Player1Paddle
    drawRect(canvas.width - xPadding - pWidth, p2YPos, pWidth, pHeight); //Player2Paddle
    
    drawLine(12, 12, (canvas.width / 2), 0, (canvas.width / 2), canvas.height); //Vertical line
    
    drawRect(ballX - (ballSize / 2), ballY - (ballSize / 2), ballSize, ballSize); //Ball
    
    drawText(score1, canvas.width / 2, canvas.height / 100, 15, true); //player1 score
    drawText(score2, canvas.width / 2, canvas.height / 100, 15, false); //player2 score
    
    if (firstRun === true) {
        console.log('draw() run successfully.');
    }
}