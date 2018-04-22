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
    winnerFound,    //Variable for determining if the round is over.
    fontSize,       //Size of text.
//movement variables
    p1Up,           //If p1 is pressing 'up'.
    p1Down,         //If p1 is pressing 'down'.
    p2Up,           //If p2 is pressing 'up'.
    p2Down,         //If p2 is pressing 'down'.
    paddleSpeed;    //Speed of the paddles.
    

function onload() {
    canvas = document.getElementById("canvas");    //Saves ref. to id:canvas in var
    ctx = canvas.getContext('2d');      //Creates a "CanvasRenderingContext2D"-object
    canvas.width = window.innerWidth;   //Sets canvas size to window size.
    canvas.height = window.innerHeight; // ^
    
    defaultSettings();
    restartSettings();
    
    resizeCanvas();
    
    window.addEventListener("keydown", keyDownHandler); //EventListeners to record keypresses
    window.addEventListener("keyup", keyUpHandler);
    
    
    if (firstRun === true) {
        console.log('onload() run successfully.');
    }
    
    //Once initial setup is complete, the main gameloop function runs.
    gameloop();
}

function defaultSettings() {
    //Default size settings for various elements, speeds, so on.
    pWidth = canvas.width / 250;
    pHeight = canvas.height / 12;
    
    xPadding = canvas.width / 100;
    p1YPos = (canvas.height / 2) - (pHeight / 2);
    p2YPos = (canvas.height / 2) - (pHeight / 2);
    
    ballSize = pWidth * 1.5; //Makes sure the ball size stays proportional to paddle size, which is proportional to canvas and thus window size.
    
    score1 = score2 = 0;
    scoreToWin = 3;
    winnerFound = false;
    
    ballXSpeed = 2.5;
    ballYSpeed = -2.5;
    
    p1Up = false;
    p1Down = false;
    p2Up = false;
    p2Down = false;
    paddleSpeed = ballSize / 2;
    
    if (firstRun === true) {
        console.log('defaultSettings() run successfully.');
    }
}

function restartSettings() {
    //Settings that need to be reset when a player scores a goal.
    ballX = (canvas.width / 2) - (ballSize / 2);
    ballY = (canvas.height / 2) - (ballSize / 2);
    
    ballXSpeed = -ballXSpeed;
    
    if (firstRun === true) {
        console.log('restartSettings() run successfully.');
    }
}

function resizeCanvas() {
    //Fetches window size and updates canvas dimension variables.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //Draws canvas background inside window.
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    
    if (firstRun === true) {
        console.log('resizeCanvas() run successfully.');
    }
}

function keyDownHandler(e) {
    //Listens for keypresses on W, S, Arrow-up, Arrow-down, enter-key.
    if (e.keyCode === 87) {
        p1Up = true;
        console.log("p1Up = true");
    }
    if (e.keyCode === 83) {
        p1Down = true;
        console.log("p1Down = true");
    }
    if (e.keyCode === 38) {
        p2Up = true;
        console.log("p2Up = true");
    }
    if (e.keyCode === 40) {
        p2Down = true;
        console.log("p2Down = true");
    }
    if (e.keyCode === 13 && winnerFound == true) {
        //Reloads page to restart the game.
        document.location.reload();
    }
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
    if (e.keyCode === 38) {
        p2Up = false;
        console.log("p2Up = false");
    }
    if (e.keyCode === 40) {
        p2Down = false;
        console.log("p2Down = false");
    }
}

function gameloop() {
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //runs other looping functions.
    move();
    collisionDetect();
    winCheck();
    //runs draw() function.
    draw();
    
    if (firstRun === true) {
        console.log('gameloop() run successfully.');
    }
    
    //As long as a winner isn't found, the gameloop repeats itself.
    if (winnerFound == false) {
        window.requestAnimationFrame(gameloop);
    }
    //sets firstRun to false to prevent spamming the console with console.logs.
    firstRun = false;
}

function move() {
    //Runs the other move functions.
    ballMove();
    paddleMove();
    
    if (firstRun === true) {
        console.log("move() run successfully.");
    }
}

function ballMove() {
    //Moves the ball element.
    ballX += ballXSpeed;
    ballY += ballYSpeed;
    
    //Checks for vertical collisions with ball and canvas.
    if (ballY <= 0 + (ballSize / 2) || ballY + ballSize >= canvas.height - (ballSize / 2)) {
        ballYSpeed = -ballYSpeed;
    }
    //Checks for horisontal collisions with canvas, which is also a player-goal.
    if (ballX <= 0 + (ballSize / 2)) {
        score2++;
        restartSettings();
    }
    if (ballX + ballSize >= canvas.width - (ballSize / 2)) {
        score1++;
        restartSettings();
    }
    
    if (firstRun === true) {
        console.log('ballMove() run successfully.');
    }
}

function paddleMove() {
    //Checks for keypress input and canvas collision, moves paddles.
    if (p1Up === true && p1YPos - (ballSize / 2) > 0) {
        p1YPos -= paddleSpeed;
    } else if (p1Down === true && p1YPos + pHeight < canvas.height - (ballSize / 2)) {
        p1YPos += paddleSpeed;
    }
    if (p2Up === true && p2YPos - (ballSize / 2) > 0) {
        p2YPos -= paddleSpeed;
    } else if (p2Down === true && p2YPos + pHeight < canvas.height - (ballSize / 2)) {
        p2YPos += paddleSpeed;
    }
    
    if (firstRun === true) {
        console.log('paddleMove() run successfully.');
    }
}

function collisionDetect() {
    //P1 collision detection
    if (xPadding < ballX + (ballSize / 2) 
        && ballX < xPadding + pWidth 
        && p1YPos < ballY + (ballSize / 2) 
        && ballY - (ballSize / 2) < p1YPos + pHeight) {
            ballXSpeed = -ballXSpeed * 1.05;
    }
    
    //P2 collision detection
    if (canvas.width - xPadding - pWidth < ballX + ballSize 
        && ballX - (ballSize / 2) < canvas.width - xPadding 
        && p2YPos < ballY + (ballSize / 2) 
        && ballY + (ballSize / 2) < p2YPos + pHeight) {
            ballXSpeed = -ballXSpeed * 1.05;
    }
    
    if (firstRun === true) {
        console.log("move() run successfully.");
    }
}

function winCheck() {
    ctx.textAlign = 'center';
    var winText; 
    
    //Checks which player has won, determines which text should be shown on screen.
    if (score1 >= scoreToWin || score2 >= scoreToWin) {
        if(score1 > score2) {winText = 'Player 1 wins!'} else if (score1 < score2) {winText = 'Player 2 wins!'} else {winText = 'This was not supposed to happen.'}
        winnerFound = true;
    }
    
    //If a winner is found, game stops (pauses) and winText is displayed.
    if (winnerFound == true) {
        ctx.fillText(winText, canvas.width / 2, canvas.height / 2);
        drawText('Press enter to restart.', 0, 0, 25, false);
        window.cancelAnimationFrame(gameloop);
    }
}

function draw() {
    //Function that draws most of the elements on screen.
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

function drawRect(cornerx, cornery, width, height) {
    //Draws a rectangle with the given parameters, top-left corner position, width and height of rectangle.
    ctx.beginPath();
    ctx.rect(cornerx, cornery, width, height);
    ctx.fillStyle = "#eeeeee";
    ctx.fill();
}

function drawLine(dash, space, x1, y1, x2, y2) {
    //Draws a line with dash-length, space-length, start-point and end-point.
    ctx.setLineDash([dash, space]);
    ctx.beginPath();
    ctx.strokeStyle = '#eeeeee';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawText(text, x, y, ratio, rightAlign) {
    //Draws 'text' at given point, with a ratio to scale text with screen size. Rudimentary right-align function included.
    fontSize = canvas.height / ratio;
    ctx.textAlign = 'start';
    
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
