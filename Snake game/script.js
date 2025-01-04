// game constants 
let inputdir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakearray = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };
let score = 0;



//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < (1 / speed)) {
        return; // Adjust the divisor to control speed
    }
    lastPaintTime = ctime;
    gameEngine();
}
function iscollide(snake) {
    // Check if the snake bumps into itself
    for (let i = 1; i < snakearray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // Check if the snake bumps into the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }
    return false; // No collision
}

function gameEngine() {
    // Check for collisions
    if (iscollide(snakearray)) {
        inputdir = { x: 0, y: 0 };
        alert("Game over. Press any key to play again.");
        snakearray = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // Check if the snake has eaten the food
    if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        
        snakearray.unshift({ x: snakearray[0].x + inputdir.x, y: snakearray[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
      
    }
        // Move the snake normally if no food is eaten
        for (let i = snakearray.length - 2; i >= 0; i--) {
            snakearray[i + 1] = { ...snakearray[i] };
        }
    

    // Move the snake
    snakearray[0].x += inputdir.x;
    snakearray[0].y += inputdir.y;

    // Displaying snake and food
    board.innerHTML = "";
    snakearray.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeelement.classList.add('head');
        }else{
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });

    // Display food
    foodelement = document.createElement('div');
    foodelement.style.gridColumnStart = food.x;
    foodelement.style.gridRowStart = food.y;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

//game start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }
})