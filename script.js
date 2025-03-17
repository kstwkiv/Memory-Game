console.log("JavaScript file loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const moveCount = document.getElementById("moveCount");
    const timer = document.getElementById("timer");
    const restartButton = document.getElementById("restartButton");
    const winPopup = document.getElementById("winPopup");
    const finalMoves = document.getElementById("finalMoves");
    const finalTime = document.getElementById("finalTime");
    const closePopup = document.getElementById("closePopup");

    const flipSound = new Audio("flip.mp3");
    const matchSound = new Audio("match.mp3");
    const winSound = new Audio("win.mp3");

    const landingPage = document.getElementById("landingPage");
    const gameContainer = document.getElementById("gameContainer");
    const startGameButton = document.getElementById("startGameButton");

    startGameButton.addEventListener("click", () => {
        landingPage.style.display = "none"; // Hide landing page
        gameContainer.style.display = "flex"; // Show game
        createBoard(); // Initialize game
    });

    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let matchedPairs = 0;
    let gameStarted = false;
    let startTime;
    let timerInterval;

    const fruits = ["🍎", "🍌", "🍇", "🍉", "🥝", "🍒", "🥭", "🥥"];

function createRandomFruit() {
    if (!fruitContainer) return;

    const fruit = document.createElement("div");
    fruit.classList.add("fruit");

    // Pick a random fruit
    fruit.innerHTML = fruits[Math.floor(Math.random() * fruits.length)];

    // Random position
    fruit.style.left = `${Math.random() * 100}vw`;
    fruit.style.top = `${Math.random() * 100}vh`;
    fruit.style.animationDuration = `${1.5 + Math.random() * 1}s`; // Faster movement

    fruitContainer.appendChild(fruit);

    // Remove after animation
    setTimeout(() => {
        fruit.remove();
    }, 2500);
}
/*document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("howToPlayModal");
    const howtoplay = document.getElementById("howtoplay");
    const closeBtn = document.querySelector(".close");
    const closeModalBtn = document.getElementById("closeModalBtn");

    // Show the modal when the "?" button is clicked
    howtoplay.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Hide the modal when the close (×) button is clicked
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Hide the modal when "Got it!" button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Hide the modal if the user clicks outside the modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
*/

// Open and close the modal
const howtoplay = document.getElementById("howtoplay");
const modal = document.getElementById("howToPlayModal");
const closeBtn = document.querySelector(".close");

howtoplay.addEventListener("click", () => {
    howToPlayModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    howToPlayModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === howToPlayModal) {
        howToPlayModal.style.display = "none";
    }
});

// Start creating fruits FASTER
fruitInterval = setInterval(createRandomFruit, 400); // Now every 0.4s instead of 0.8s


    const symbols = ["🍎", "🍌", "🍇", "🍉", "🥝", "🍒", "🥭", "🥥"];
    const cardValues = [...symbols, ...symbols];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        gameBoard.innerHTML = "";
        cards = [];
        flippedCards = [];
        moves = 0;
        matchedPairs = 0;
        moveCount.textContent = moves;
        timer.textContent = "00:00";
        gameStarted = false;
        clearInterval(timerInterval);
        winPopup.style.display = "none";

        let shuffledValues = shuffle(cardValues);
        shuffledValues.forEach((symbol) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.symbol = symbol;
            card.textContent = "?"; // Ensure it starts as hidden
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (!gameStarted) startTimer();
        if (flippedCards.length >= 2 || this.classList.contains("flipped")) return;

        flipSound.play();
        this.classList.add("flipped");
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            moveCount.textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchSound.play(); // Play match sound
            matchedPairs++;
            card1.classList.add("matched");
            card2.classList.add("matched");
            flippedCards = [];

            if (matchedPairs === symbols.length) {
                clearInterval(timerInterval);
                showWinPopup();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.textContent = "?";
                card2.textContent = "?";
                flippedCards = [];
            }, 1000);
        }
    }

    function startTimer() {
        gameStarted = true;
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
            const seconds = String(elapsedTime % 60).padStart(2, "0");
            timer.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    function showWinPopup() {
        winSound.play();
        winPopup.style.display = "block";
        finalMoves.textContent = moves;

        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
        const seconds = String(elapsedTime % 60).padStart(2, "0");
        finalTime.textContent = `${minutes}:${seconds}`;
    }

    restartButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        createBoard();
    });

    closePopup.addEventListener("click", () => {
        winPopup.style.display = "none";
        createBoard();
    });

    // Remove createBoard(); to prevent auto-start
});
