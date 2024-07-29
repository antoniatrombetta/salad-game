

class Player {
    constructor() {
        this.width = 120;
        this.height = this.width * 2.12;
        this.positionX = 60;
        this.positionY = 0;


        this.createDomelement();
        // window.addEventListener('resize', () => this.adjustSize());
        // this.adjustSize();

    }

    createDomelement() {

        this.elainePlayer = document.createElement("div");
        this.elainePlayer.id = "elaine";

        this.elainePlayer.style.left = this.positionX + "px";
        this.elainePlayer.style.bottom = this.positionY + "px";
        this.elainePlayer.style.width = this.width + "px";
        this.elainePlayer.style.height = this.height + "px";


        const board = document.getElementById("board");
        board.appendChild(this.elainePlayer);
        this.newImg = document.createElement("img");
        this.newImg.setAttribute("src", "./img/elaineC.png");
        this.elainePlayer.appendChild(this.newImg);

    }


    moveLeft() {
        this.positionX--;
        this.elainePlayer.style.left = this.positionX + "px";

    }

    moveRight() {
        this.positionX++;
        this.elainePlayer.style.left = this.positionX + "px";
    }

    moveUp() {
        this.positionY++;
        this.elainePlayer.style.bottom = this.positionY + "px";
    }

    moveDown() {
        this.positionY--;
        this.elainePlayer.style.bottom = this.positionY + "px";
    }
}

class Obstacle {

    constructor() {
        this.width = 5;
        this.height = this.width * 2.12;
        this.width = 10;
        this.height = 5;
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

const myPlayer = new Player();
const obstacle = [];

setInterval(() => {
    const newObstacle = new Obstacle();
    obstacle.push(newObstacle);
}, 3000);

setInterval(() => {
    obstacle.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
    })
}, 50);



document.addEventListener("keydown", (e) => {
    if (myPlayer) {
        if (e.code === 'ArrowLeft') {
            myPlayer.moveLeft();
        } else if (e.code === 'ArrowRight') {
            myPlayer.moveRight();
        } else if (e.code === 'ArrowUp') {
            myPlayer.moveUp();
        } else if (e.code === 'ArrowDown') {
            myPlayer.moveDown();
        }
    }
})