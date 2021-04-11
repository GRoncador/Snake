var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

document.addEventListener('keydown', event => {

    if (directions.includes(event.key)) {

        console.log(snake.lastDirection.x,snake.lastDirection.y,event.key)

        if (event.key == 'ArrowUp' && snake.lastDirection.y != 1) {
    
            snake.xDirection = 0;
    
            snake.yDirection = - 1;
    
        } else if (event.key == 'ArrowRight' && snake.lastDirection.x != -1) {
    
            snake.xDirection = 1;
    
            snake.yDirection = 0;
    
        } else if (event.key == 'ArrowDown' && snake.lastDirection.y != -1) {
    
            snake.xDirection = 0;
    
            snake.yDirection = 1;
    
        } else if (event.key == 'ArrowLeft' && snake.lastDirection.x != 1){
    
            snake.xDirection = - 1;
    
            snake.yDirection = 0;
    
        }

    }

});

var board = {
    size : 525,
    numberOfSquares : 21,
    squareSize : 0, // value set by 'setBoard()' function
    setBoard(){

        document.getElementsByTagName('body')[0].style.setProperty('--board-size', `${board.size}px`); 

        this.squareSize = this.size / this.numberOfSquares;

        canvas.style.width = canvas.style.height = `${this.size}px`

    },
}

var game = {
    score : 0,
    highScore : 0,
    level : 0, // number of eaten apples
}

const directions = [
    'ArrowUp', 
    'ArrowRight', 
    'ArrowDown', 
    'ArrowLeft'
];

var snake = {
    fillStyle : 'grey',
    strokeStyle : 'black',

    startVelocity : 200, // in ms
    acceleration : 25, //in ms
    velocity : 0, //in ms

    startXDirection : 1,
    xDirection : 0,
    yDirection : 0,
    lastDirection : {},

    startTrail : [
        {x:8, y:10},
        {x:7, y:10},
        {x:6, y:10},
        {x:5, y:10},
        ],
    trail : [],

    checkHit(x,y) {

        var hit = this.trail.map(square => {

            return square.x == x && square.y == y;
        
        });

        if (hit.includes(true)) {
            
            return true
        
        } else {
            
            return false
        
        }

    },

    move(){

        var nextX = this.trail[0].x + this.xDirection;
        var nextY = this.trail[0].y + this.yDirection;

        this.lastDirection.x = this.xDirection;
        this.lastDirection.y = this.yDirection;

        if (nextX < 0) {

            nextX = board.numberOfSquares - 1;

        } else if (nextX >= board.numberOfSquares) {

            nextX = 0;

        } else if (nextY < 0) {

            nextY = board.numberOfSquares - 1;

        } else if (nextY >= board.numberOfSquares) {

            nextY = 0;

        }

        var nextSquare = {x:nextX, y:nextY};

        if (apple.checkHit(nextX, nextY)) {

            this.trail.unshift(nextSquare);

            apple.move();

        } else {

            this.trail.unshift(nextSquare);

            this.trail.pop();

        }

    },

    draw(){

        this.trail.forEach(square => {

            ctx.fillStyle = this.fillStyle
            ctx.fillRect(square.x * board.squareSize, square.y * board.squareSize, board.squareSize, board.squareSize)

            ctx.strokeStyle = this.strokeStyle
            ctx.strokeRect(square.x * board.squareSize, square.y * board.squareSize, board.squareSize, board.squareSize)

        })

    },

}

var apple = {
    fillStyle : 'red',
    strokeStyle : 'grey',

    startPosition : {x:15, y:10},
    position : {},

    checkHit(x,y) {

        if (this.position.x == x && this.position.y == y) {

            return true;

        } else {

            return false;

        }

    },

    move() {

        while ( snake.checkHit(this.position.x,this.position.y) ) {

            this.position.x = parseInt( ( Math.random() * board.numberOfSquares ) );

            this.position.y = parseInt( ( Math.random() * board.numberOfSquares ) );

        }

    },

    draw(){

        ctx.fillStyle = this.fillStyle
        ctx.fillRect(this.position.x * board.squareSize, this.position.y * board.squareSize, board.squareSize, board.squareSize)

        ctx.strokeStyle = this.strokeStyle
        ctx.strokeRect(this.position.x * board.squareSize, this.position.y * board.squareSize, board.squareSize, board.squareSize)

    },

}

function updateScreen() {

    snake.draw();

    apple.draw();

}

function gameStart() {

    snake.trail = snake.startTrail
    snake.xDirection = snake.startXDirection
    snake.velocity = snake.startVelocity

    apple.position = apple.startPosition

    //console.log('gameStart()', snake.trail, snake.xDirection, snake.velocity, apple.position),

    updateScreen();

    setInterval(gameLoop, 100);

}

function gameOver() {

    // checks if next move hits snake trail 

    var nextX = snake.trail[0].x + snake.xDirection;
    var nextY = snake.trail[0].y + snake.yDirection;

    return snake.checkHit(nextX,nextY)

}

function gameLoop() {

    //console.log('inicio gameloop')

    if (!gameOver()) {

       // console.log('! gameover condição')

        ctx.clearRect(0, 0, board.size, board.size);

        snake.move();

        updateScreen();

    }

}

board.setBoard()

gameStart()






