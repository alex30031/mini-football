window.main = () =>{
    window.requestAnimationFrame(main);
    const button = document.getElementById('two-player-button');
    const button1 = document.getElementById('single-player-button');
    const startingText = document.querySelector('.start-game');
    let gameStarted = false;
    button.addEventListener('click', function () {
    if (!gameStarted) {
        gameStarted = true;
        gameArea.start();
        button.style.display = 'none';
        startingText.style.display = 'none';
    }
});

    button1.onclick = function(){
        window.alert("To be continued!");
    }
    
}

let player1;
let ball;
let scoreboardVisible = false;



function Player(x,y,radius =10, color = "yellow",score){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = score;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    

    
}

const keysPressed = [];

    document.addEventListener('keydown', (e) =>{
    keysPressed[e.code] = true;
    });
    document.addEventListener('keyup', (e) =>{
    keysPressed[e.code] = false;
    })

function move(player, dx, dy, canvas){
    const fieldWidth = canvas.width - 50;
    const fieldHeight = canvas.height - 50;
    const marginX = (canvas.width - fieldWidth) / 2;
    const marginY = 25;

    const left = marginX + player.radius;
    const right = canvas.width - marginX - player.radius;
    const top = marginY + player.radius;
    const bottom = marginY + fieldHeight - player.radius;

    if (keysPressed['KeyW'] && player.y - dy > top) player.y -= dy;
    if (keysPressed['KeyA'] && player.x - dx > left) player.x -= dx;
    if (keysPressed['KeyS'] && player.y + dy < bottom) player.y += dy;
    if (keysPressed['KeyD'] && player.x + dx < right) player.x += dx;
    }

    function move1(player, dx, dy, canvas){
    const fieldWidth = canvas.width - 50;
    const fieldHeight = canvas.height - 50;
    const marginX = (canvas.width - fieldWidth) / 2;
    const marginY = 25;

    const left = marginX + player.radius;
    const right = canvas.width - marginX - player.radius;
    const top = marginY + player.radius;
    const bottom = marginY + fieldHeight - player.radius;

    if (keysPressed['ArrowUp'] && player.y - dy > top) player.y -= dy;
    if (keysPressed['ArrowLeft'] && player.x - dx > left) player.x -= dx;
    if (keysPressed['ArrowDown'] && player.y + dy < bottom) player.y += dy;
    if (keysPressed['ArrowRight'] && player.x + dx < right) player.x += dx;
    }

function Ball(x, y, radius = 10, color = "white") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    
    this.vx = 0;
    this.vy = 0;

    this.update = function(canvas) {
    const fieldWidth = canvas.width - 50;
    const fieldHeight = canvas.height - 50;
    const marginX = (canvas.width - fieldWidth) / 2;
    const marginY = 25;

    const left = marginX + this.radius;
    const right = canvas.width - marginX - this.radius;
    const top = marginY + this.radius;
    const bottom = marginY + fieldHeight - this.radius;

   
    this.x += this.vx;
    this.y += this.vy;

   
    if (this.x <= left || this.x >= right) {
        this.vx *= -1;
        
        this.x = Math.max(left, Math.min(right, this.x));
    }

    
    if (this.y <= top || this.y >= bottom) {
        this.vy *= -1;
        this.y = Math.max(top, Math.min(bottom, this.y));
    }

   
    if (Math.abs(this.vx) < 0.01) this.vx = 0;
    if (Math.abs(this.vy) < 0.01) this.vy = 0;
};


    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
}



function collide(player, ball, canvas) {
    const dx = ball.x - player.x;
    const dy = ball.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + ball.radius) {
        
        const angle = Math.atan2(dy, dx);
        const overlap = (player.radius + ball.radius - distance);

        
        ball.x += Math.cos(angle) * overlap;
        ball.y += Math.sin(angle) * overlap;

      
        const kickStrength = 0.3;
        ball.vx = Math.cos(angle) * kickStrength;
        ball.vy = Math.sin(angle) * kickStrength;
    }

 
    const fieldWidth = canvas.width - 50;
    const fieldHeight = canvas.height - 50;
    const marginX = (canvas.width - fieldWidth) / 2;
    const marginY = 25;

    const left = marginX + ball.radius;
    const right = canvas.width - marginX - ball.radius;
    const top = marginY + ball.radius;
    const bottom = marginY + fieldHeight - ball.radius;

    ball.x = Math.max(left, Math.min(right, ball.x));
    ball.y = Math.max(top, Math.min(bottom, ball.y));
}

    function resetBall(ball, canvas) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 0;
    ball.vy = 0;
    }

    function showScoreboard() {
    scoreboardVisible = true;
    setTimeout(() => {
        scoreboardVisible = false;
    }, 3500); 
}

    function resetPlayers(canvas, player1, player2) {
    const centerY = canvas.height / 2;

    
    player1.x = canvas.width / 4;   
    player1.y = centerY;

    
    player2.x = (canvas.width * 3) / 4; 
    player2.y = centerY;
}


    function goal(ball, canvas, player1, player2) {
    const marginX = (canvas.width - (canvas.width - 50)) / 2;
    const goalTop = canvas.height / 2 - 80;
    const goalBottom = canvas.height / 2 + 80;

    
    if (ball.x - ball.radius <= marginX && ball.x + ball.radius >= marginX - 20 &&
        ball.y >= goalTop && ball.y <= goalBottom) {
        player2.score += 1; 
        resetBall(ball, canvas);
        resetPlayers(canvas, player1, player2); 
        showScoreboard();
    }

  
    if (ball.x + ball.radius >= canvas.width - marginX && ball.x - ball.radius <= canvas.width - marginX + 20 &&
        ball.y >= goalTop && ball.y <= goalBottom) {
        player1.score += 1; 
        resetBall(ball, canvas);
        resetPlayers(canvas, player1, player2); 
        showScoreboard();
    }
}







var gameArea = {
    start : function() {
       
    window.devicePixelRatio = 2;

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ball = new Ball(centerX, centerY, 10, "white");
    player1 = new Player(0, 0, 20, "yellow", 0);
    player2 = new Player(0, 0, 20, "blue", 0);
    resetPlayers(canvas, player1, player2);

    
    function drawEverything(){
    ctx.fillStyle = "#6DA544";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x = 0;
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle ="#588C3B";
        ctx.fillRect(x,0,128,canvas.height);
        x +=256;
    }

    const fieldWidth = canvas.width - 50;
    const fieldHeight = canvas.height - 50;
    const marginX = (canvas.width - fieldWidth) / 2;
    const marginY = 25;

   
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeRect(marginX, 25, fieldWidth, fieldHeight);

    
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 25);
    ctx.lineTo(canvas.width/2, fieldHeight + 25);
    ctx.stroke();

   
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 120, 0, 2*Math.PI);
    ctx.stroke();

    
    ctx.strokeRect(marginX, canvas.height / 2 - 100, 100, 200);
    ctx.strokeRect(marginX, canvas.height / 2 - 225, 225, 450);
    ctx.strokeRect(canvas.width - marginX - 100, canvas.height / 2 - 100, 100, 200);
    ctx.strokeRect(canvas.width - marginX - 225, canvas.height / 2 - 225, 225, 450);
    ctx.strokeRect(marginX - 20, canvas.height / 2 - 80, 20, 160);
    ctx.strokeRect(canvas.width - marginX, canvas.height / 2 - 80, 20, 160);

    if (scoreboardVisible) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(player1.score, canvas.width / 2 - 100, 60);
    ctx.fillText(player2.score, canvas.width / 2 + 100, 60);
}


    ball.update(canvas);
    ball.draw(ctx);
    player1.draw(ctx);
    player2.draw(ctx);
    move(player1,0.2,0.2,canvas);
    move1(player2,0.2,0.2,canvas);
    collide(player1,ball,canvas);
    collide(player2, ball,canvas);

    goal(ball, canvas, player1, player2);
}

    setInterval(drawEverything, 500/60);
}}








main();