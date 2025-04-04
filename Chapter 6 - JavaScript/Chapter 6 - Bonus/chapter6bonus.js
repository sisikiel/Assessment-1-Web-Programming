// Necessary DOM elements
const rgbValue = document.getElementById("rgb-value"); // For the RGB color
const colorOptions = document.getElementById("color-options"); // Color options container

const message = document.getElementById("message"); // Message output after color selection
const livesDisplay = document.getElementById("lives"); // Lives display
const scoreDisplay = document.getElementById("score"); // Score display
const highScoreDisplay = document.getElementById("high-score"); // Highest score display

const gameContainer = document.getElementById("game-container"); // Game container (main content)
const gameOverBox = document.getElementById("game-over-box"); // Game over screen
const finalScore = document.getElementById("final-score"); // Final score display
const replayButton = document.getElementById("replay"); // Play again button

// Fetching the highest score from localStorage or setting it to 0 if not available
let highestScore = localStorage.getItem('highestScore') ? parseInt(localStorage.getItem('highestScore')) : 0;
highScoreDisplay.textContent = highestScore; // Display the current highest score

// Default values for lives and score
let lives = 3;
let score = 0;

// Function to generate a random RGB color
function generateColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`; // Return the random color
}

// Function to set up the game with a new round
function setupGame() {
    gameContainer.style.display = "block"; // Show game container
    gameOverBox.style.display = "none"; // Hide game over box
    colorOptions.innerHTML = ""; // Clear previous color options
    message.textContent = ""; // Reset message

    const correctColor = generateColor(); // Generate the correct color
    rgbValue.textContent = correctColor; // Display RGB value for the user to guess

    // Generate 2 additional random colors and shuffle them with the correct one
    const options = [correctColor];
    while (options.length < 3) {
        const newColor = generateColor();
        if (!options.includes(newColor)) {
            options.push(newColor);
        }
    }
    options.sort(() => Math.random() - 0.5); // Shuffle the colors

    // Create color option buttons
    options.forEach(color => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.style.background = color;
        div.addEventListener("click", () => checkAnswer(color, correctColor)); // Add click event
        colorOptions.appendChild(div);
    });
}

// Function to check if the selected color is correct
function checkAnswer(selected, correct) {
    if (selected === correct) {
        message.textContent = "🎉 Correct!";
        message.style.color = "green";
        score++; // Increase score
    } else {
        message.textContent = "❌ Incorrect!";
        message.style.color = "red";
        lives--; // Decrease lives
    }
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;

    // Check if the game should continue or end
    if (lives > 0) {
        setTimeout(setupGame, 1000); // Load new round after a short delay
    } else {
        endGame(); // End the game
    }
}

// Function to check if the current score is the highest and update localStorage
function checkHighScore() {
    if (score > highestScore) {
        highestScore = score; // Update the highest score
        localStorage.setItem('highestScore', highestScore); // Save it to localStorage
        highScoreDisplay.textContent = highestScore; // Update the displayed highest score
    }
}

// Function to handle the game over scenario
function endGame() {
    checkHighScore(); // Check and update the highest score before ending the game
    gameContainer.style.display = "none"; // Hide the game container
    gameOverBox.style.display = "block"; // Show the game over box
    finalScore.textContent = score; // Display final score
}

// Event listener for the replay button to restart the game
replayButton.addEventListener("click", () => {
    lives = 3; // Reset lives
    score = 0; // Reset score
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    setupGame(); // Start a new game
});

setupGame(); // Start the game initially