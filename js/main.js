

document.addEventListener('DOMContentLoaded', () =>{
    const startButton = document.getElementById('startButton');
    const board = document.getElementById('board');
    const score = document.querySelector('.score');
    const image = document.querySelector('.image');
    const container = document.querySelector('.container');
    

    if(startButton){
        startButton.addEventListener('click', () =>{
            image.style.display = 'none';
            startButton.style.display = 'none';
            
            board.style.display = 'block';
            score.style.display = 'block';
            container.style.display = 'none';

            startGame();
        })
    }
});

function startGame () {
class Player {
    constructor() {
        this.width = 80;
        this.height = this.width * 2.12;
        this.positionX = 60;
        this.positionY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0.2;
        this.jumpForce = 1;
        this.isOnGround = true;
        this.isFalling = false;

        this.createDomelement();
    }

    updateVelocity(){
        if(!this.isOnGround){
            if(this.isFalling){
                this.velocityY += this.accelerationY * -1;
            } else {
                this.velocityY += this.accelerationY;
            }
        }
        
        this.positionY += this.velocityY;

        if(this.positionY >= 600 - this.height - 100){   
            this.velocityY = 0;
            this.isFalling = true;
        } else if (this.positionY <= 0 ){
            this.positionY = 0;
            this.velocityY = 0;
            this.isOnGround= true;
            this.isFalling = false;
        }
        
        this.elainePlayer.style.left = this.positionX + "px";
        this.elainePlayer.style.bottom = this.positionY + "px";
    }

    jump(){
        if(this.isOnGround){
            this.velocityY = this.jumpForce;
            this.isOnGround = false;
            
        }
    }

    createDomelement() {

        this.elainePlayer = document.createElement("div");
        this.elainePlayer.id = "elaine";

        this.elainePlayer.style.left = this.positionX + "px";
        this.elainePlayer.style.bottom = this.positionY + "px";
        this.elainePlayer.style.width = this.width + "px";
        this.elainePlayer.style.height = this.height + "px";
        this.elainePlayer.style.position = "absolute";

        const board = document.getElementById("board");
        board.appendChild(this.elainePlayer);
        this.newImg = document.createElement("img");
        this.newImg.setAttribute("src", "./img/elaineC.png");
        this.elainePlayer.appendChild(this.newImg);

        this.updatePosition();

    }

    updatePosition(){
        this.elainePlayer.style.left = this.positionX + "px";
        this.elainePlayer.style.bottom = this.positionY + "px";
    }

    moveLeft() {
        this.positionX -= 5;
        this.updatePosition();

    }

    moveRight() {
        this.positionX += 5;
        this.updatePosition();
    }

    moveUp() {
        this.positionY += 5;
        this.updatePosition();
    }

    moveDown() {
        this.positionY -= 5;
        this.updatePosition();
    }
}

class Obstacle {

    constructor() {
        this.width = 45;
        this.height = this.width * 1.12;
        this.positionX = Math.floor(Math.random() * (800 - this.width + 1));
        this.positionY = 500;
        
        
        this.createDomelement();
    }
    createDomelement() {

        this.saladObstacle = document.createElement("div");
        this.saladObstacle.className = "obstacleSalad";

        this.saladObstacle.style.left = this.positionX + "px";
        this.saladObstacle.style.bottom = this.positionY + "px";
        this.saladObstacle.style.width = this.width + "px";
        this.saladObstacle.style.height = this.height + "px";

        const board = document.getElementById("board");
        board.appendChild(this.saladObstacle);
        this.newImg2 = document.createElement("img");
        this.newImg2.setAttribute("src", "./img/salad.png");
        this.saladObstacle.appendChild(this.newImg2);
    }

    moveDown() {
        this.positionY--;
        this.saladObstacle.style.bottom = this.positionY + "px";
    }
}

class George {
    constructor (){
        this.width = 80;
        this.height = this.width * 2.12;
        this.positionX = 800;
        this.positionY = 0;


        this.createDomelement();
    }

    createDomelement() {

        this.georgeObstacle = document.createElement("div");
        this.georgeObstacle.id = "george";

        this.georgeObstacle.style.left = this.positionX + "px";
        this.georgeObstacle.style.bottom = this.positionY + "px";
        this.georgeObstacle.style.width = this.width + "px";
        this.georgeObstacle.style.height = this.height + "px";


        const board = document.getElementById("board");
        board.appendChild(this.georgeObstacle);
        this.newImg3 = document.createElement("img");
        this.newImg3.setAttribute("src", "./img/george.png");
        this.georgeObstacle.appendChild(this.newImg3);

    }
    moveLeft() {
        this.positionX -= 5;
        this.georgeObstacle.style.left = this.positionX + "px";

    }
   
}

const myPlayer = new Player();
const obstacle = [];
const georgeArr = [];
let score = 0;


function gameLoop(){
    myPlayer.updateVelocity();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function updateScore() {
    score++;
    document.querySelector('.score').textContent = "score:" + score; 
}

setInterval(() => {
    const newObstacle = new Obstacle();
    obstacle.push(newObstacle);
}, 4000);


setInterval(() => {
    obstacle.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
        if(
            myPlayer.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            myPlayer.positionX + myPlayer.width > obstacleInstance.positionX &&
            myPlayer.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            myPlayer.positionY + myPlayer.height > obstacleInstance.positionY
        ){
          updateScore();
          obstacleInstance.saladObstacle.remove();
        }
    })
}, 50);

setInterval(() => {
    const georgeObstacle = new George();
    georgeArr.push(georgeObstacle);

}, 8000);

setInterval(() => {
    georgeArr.forEach((georgeInstance) => {
        georgeInstance.moveLeft();
        console.log(`x: ${myPlayer.positionX} ... y ${myPlayer.positionY} `);
        if(
            georgeInstance.positionX < myPlayer.positionX + myPlayer.width &&
            georgeInstance.positionX + georgeInstance.width > myPlayer.positionX &&
            georgeInstance.positionY < myPlayer.positionY + myPlayer.height &&
            georgeInstance.positionY + georgeInstance.height > myPlayer.positionY
        ){
            location.href = "gameover.html"; 
        }
    })
}, 50);


document.addEventListener("keydown", (e) => {
    if (myPlayer) {
        if (e.code === 'ArrowLeft') {
            myPlayer.moveLeft();
        } else if (e.code === 'ArrowRight') {
            myPlayer.moveRight();
        } else if (e.code === 'ArrowUp') {
            myPlayer.jump();
        } 
    }
})

};