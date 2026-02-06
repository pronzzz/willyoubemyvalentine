// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']"); // Optimized selector

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.opacity = "0"; // Smooth fade out
    setTimeout(() => {
        envelope.style.display = "none";
        letter.style.display = "flex";
        
        // Small delay to ensure display:flex moves happen before transition
        setTimeout(() => {
            document.querySelector(".letter-window").classList.add("open");
        }, 50);
    }, 500); // Wait for opacity transition
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton); // Determine if we want click or just hover. Mobile users tap, so click is needed.

function moveNoButton() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate safe boundaries (padding of 20px from edges)
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - btnWidth - padding;
    const minY = padding;
    const maxY = viewportHeight - btnHeight - padding;

    // Generate random position within safe boundaries
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;
    
    // Position fixed is easier for "teleporting" around visually than relative transforms which depend on where it started
    // But since we want smooth transitions, we need strictly controlled coordinates
    // Let's use Fixed positioning for the No button to make absolute screen coordinates easier
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Scale Yes button
    scaleYesButton();
}

// Logic to make YES btn to grow
let yesScale = 1;

function scaleYesButton() {
    yesScale += 0.2; // Increment scale
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Cap the scale so it doesn't get ridiculously huge and break everything immediately
    if (yesScale > 3) {
        yesScale = 3; 
    }
}

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";
    
    // Ensure final state is clean
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    // Confetti or extra flair could go here!
});
