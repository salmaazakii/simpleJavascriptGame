var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width-30;
var y = canvas.height/2;
var dx = 4;
var dy = -4;

var score = 0;
var lives = 3;

var paddleHeight = 150;
var paddleWidth = 10;
var paddleX = canvas.width-paddleWidth;
var paddleY = (canvas.height-paddleHeight)/ 2;

var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" ||e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowUp" || e.key == "Up") {    // or e.key == "Up"
        upPressed = false;
    }
    else if(e.key == "ArrowDown" || e.key == "Up") {
        downPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<3; c++) {
        for(var r=0; r<=11; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+40 && y > b.y && y < b.y+40) {
                    dx = -dx;
                    b.status = 0;
                    score++;
                    if(score == 12*3) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#739ff5";
    ctx.fillText("Score: "+score, 800, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#739ff5";
    ctx.fillText("Lives: "+lives, 870, 20);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,20,0, Math.PI*2);
    ctx.fillStyle = "#8f1e47";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#8f1e47";
    ctx.fill();
    ctx.closePath();
}

var bricks = [];
for(var c=0; c<3; c++) {    //columns count
    bricks[c] = [];
    for(var r=0; r<=11 ; r++) {   //rows count
        bricks[c][r] = { x: 0, y: 0 ,status: 1};
    }
}

function drawBricks() {
    for(var c=0; c<3; c++) {
        for(var r=0; r<=11; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*50)+30; // col.no*(r+padding)+offset
                var brickY = (r*50)+30;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.arc(brickX,brickY, 20, 0, 2 * Math.PI);
                ctx.fillStyle = "##8f1e47";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    drawBricks();
    if(x + dx < 20) {       // 20 is the ball raduis
        dx = -dx;
    }
    else if(x + dx > canvas.width-20) {
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -(dx*1.1); // give the ball more speed than normal
        }
        else {
            //code your gameover message
            lives--;
            if(!lives) {
            alert("GAME OVER");
            document.location.reload();
            }
        else {
            x = canvas.width-30;
            y = canvas.height/2;
            dx = 4;
            dy = -4;
            paddleY = (canvas.height-paddleHeight)/ 2;
}
        }
    }   
    if(y + dy > canvas.height-20 || y + dy < 20) {
        dy = -dy;
    } 
    if(downPressed) {
        paddleY += 7;
        if (paddleY + paddleHeight > canvas.height){
            paddleY = canvas.height - paddleHeight;
        }
    }
    else if(upPressed) {
        paddleY -= 7;
        if (paddleY < 0){
            paddleY = 0;
        }
    }
    x +=dx;
    y +=dy;
    requestAnimationFrame(draw);
}


//we can add start button then start gaming

draw();