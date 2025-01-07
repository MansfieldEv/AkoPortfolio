// script.js

let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let score = 0;
let gameOver = false;

// Allow the player to jump
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !gameOver) {
        jump();
    }
});

// Character jump function
function jump() {
    if (character.classList.contains("jump")) return;

    character.classList.add("jump");
    setTimeout(() => {
        character.classList.remove("jump");
    }, 600); // Jump lasts 500ms
    
}

// Check for collision
function checkCollision() {
    let characterBottom = parseInt(
        window.getComputedStyle(character).getPropertyValue("bottom")
    );
    let obstacleLeft = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue("left")
    );

    // Collision detection logic
    if (obstacleLeft < 50 && obstacleLeft > 0 && characterBottom < 50) {
        endGame();
    }
}

// End game function
function endGame() {
    gameOver = true;
    obstacle.style.animation = "none"; // Stop obstacle movement
    alert(`Game Over! Your score is: ${score}`);
    score = 0; // Reset score
    scoreDisplay.textContent = score;
}

// Increase score over time
function updateScore() {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = score;
    }
}


const obstacles = document.getElementById('obstacle');

// Array of rock images
const rockImages = [
    'rocks1.png',
    'rocks2.png',
    'rocks3.png',
    'rocks4.png'
];

// Initial animation speed (seconds)
let animationSpeed = 2.5;

// Function to change the rock image
function changeRockImage() {
    const randomIndex = Math.floor(Math.random() * rockImages.length); // Random index
    obstacle.style.backgroundImage = `url(${rockImages[randomIndex]})`;

    // Gradually increase the speed (decrease duration)
    animationSpeed = Math.max(animationSpeed - 0.05, 0.5); // Limit minimum speed to 0.5s
    obstacle.style.animationDuration = `${animationSpeed}s`; // Update the animation duration
    }

// Change rock image and adjust speed every time the animation restarts
obstacle.addEventListener('animationiteration', changeRockImage);

// Initial image setup and animation speed
obstacle.style.animationDuration = `${animationSpeed}s`;
changeRockImage();


// Speed up obstacles over time to make the game unwinnable
function speedUpObstacles() {
    if (!gameOver) {
        let currentDuration = parseFloat(
            window.getComputedStyle(obstacle).animationDuration
        );
        if (currentDuration > 1) {
            obstacle.style.animationDuration = `${currentDuration - 2}s`;
        }
    }
}

// Game loop
setInterval(() => {
    checkCollision();
    updateScore();
    speedUpObstacles();
}, 100);
