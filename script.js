/* =========================================
   PANU BIRTHDAY WEBSITE
========================================= */


/* ---------- PAGE NAVIGATION ---------- */

function goToPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
        window.scrollTo(0, 0);
    }
}


/* ---------- MUSIC ---------- */

const music = document.getElementById("backgroundMusic");

function toggleMusic() {

    if (!music) return;

    if (music.paused) {
        music.play().catch(() => {});
    } else {
        music.pause();
    }
}


/* ---------- BACKGROUND PARTICLES ---------- */

function createParticles() {

    const container =
        document.getElementById("particles");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 45; i++) {

        const p = document.createElement("span");

        p.className = "particle";

        p.style.left =
            Math.random() * 100 + "%";

        p.style.animationDuration =
            (5 + Math.random() * 8) + "s";

        p.style.animationDelay =
            (Math.random() * 7) + "s";

        const size =
            1 + Math.random() * 3;

        p.style.width = size + "px";
        p.style.height = size + "px";

        container.appendChild(p);
    }
}

createParticles();


/* =========================================
   ENVELOPE
========================================= */

function openEnvelope() {

    const envelope =
        document.querySelector(".envelope");

    if (!envelope) return;

    envelope.classList.add("open");

    setTimeout(() => {
        goToPage("birthdayPage");
    }, 1200);
}


/* =========================================
   CAKE ANIMATION
========================================= */

let cakeStarted = false;
let candleOff = false;


/* =========================================
   🎂 PREMIUM CAKE ANIMATION
   ========================================= */

function startCakeAnimation() {

    const cake = document.querySelector(".cake");

    if (!cake) return;

    // Reset cake
    cake.classList.remove(
        "layer-one",
        "layer-two",
        "layer-three",
        "show-candle",
        "candle-off"
    );

    // Layer 1
    setTimeout(() => {
        cake.classList.add("layer-one");
    }, 300);

    // Layer 2
    setTimeout(() => {
        cake.classList.add("layer-two");
    }, 1200);

    // Layer 3
    setTimeout(() => {
        cake.classList.add("layer-three");
    }, 2100);

    // Candle
    setTimeout(() => {
        cake.classList.add("show-candle");
    }, 3000);

    // Golden sparkle effect
    setTimeout(() => {
        createCakeSparkles();
    }, 3300);
}


/* ✨ Cake Sparkles */

function createCakeSparkles() {

    const cake = document.querySelector(".cake");

    if (!cake) return;

    for (let i = 0; i < 18; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "cake-sparkle";

        sparkle.innerHTML =
            i % 2 === 0 ? "✦" : "•";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 75 + "%";

        sparkle.style.animationDelay =
            Math.random() * 1.5 + "s";

        cake.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }
}


/* 🕯️ Make a Wish */

function makeWish() {

    const cake = document.querySelector(".cake");

    if (!cake) return;

    // Turn off candle
    cake.classList.add("candle-off");

    // Sparkles
    createCakeSparkles();

    // Small celebration
    setTimeout(() => {

        const wishText =
            document.querySelector(".wish-text");

        if (wishText) {
            wishText.innerHTML =
                "Wish made... ✨ May all your dreams come true ❤️";
        }

    }, 700);
}


/* Start cake when birthday page opens */

const birthdayPage =
    document.getElementById("birthdayPage");

if (birthdayPage) {

    const observer =
        new MutationObserver(() => {

            if (
                birthdayPage.classList.contains("active")
            ) {
                startCakeAnimation();
            }

        });

    observer.observe(
        birthdayPage,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );
}


/* =========================================
   MAKE A WISH
========================================= */

function makeWish() {

    if (candleOff) return;

    candleOff = true;

    const cake =
        document.querySelector(".cake");

    const wishText =
        document.querySelector(".wish-text");

    const wishButton =
        document.querySelector(".highlight-btn");

    if (cake) {
        cake.classList.add("candle-off");
    }

    if (wishText) {
        wishText.innerText =
            "✨ Wish made... ❤️";
    }

    if (wishButton) {
        wishButton.innerText =
            "✨ Wish Made ❤️";

        wishButton.disabled = true;
    }

    /* little sparkle effect */

    for (let i = 0; i < 15; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.innerText = "✦";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            (45 + Math.random() * 10) + "%";

        sparkle.style.top =
            (35 + Math.random() * 20) + "%";

        sparkle.style.color = "#ffd45c";

        sparkle.style.fontSize =
            (10 + Math.random() * 12) + "px";

        sparkle.style.zIndex = "200";

        document.body.appendChild(sparkle);

        sparkle.animate(
            [
                {
                    transform: "translate(0,0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            ${(Math.random() - 0.5) * 100}px,
                            ${-30 - Math.random() * 80}px
                        )`,
                    opacity: 0
                }
            ],
            {
                duration: 1000,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            sparkle.remove();
        }, 1100);
    }
}


/* =========================================
   MEMORY MATCH
========================================= */

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;


function flipCard(card) {

    if (
        lockBoard ||
        card === firstCard ||
        card.classList.contains("flipped") ||
        card.dataset.matched === "true"
    ) {
        return;
    }

    card.classList.add("flipped");

    if (!firstCard) {

        firstCard = card;

        return;
    }

    secondCard = card;

    moves++;

    const movesText =
        document.querySelector(".moves");

    if (movesText) {
        movesText.innerText =
            `${moves} moves`;
    }

    checkMatch();
}


function checkMatch() {

    if (
        firstCard.innerText ===
        secondCard.innerText
    ) {

        firstCard.dataset.matched = "true";
        secondCard.dataset.matched = "true";

        resetCards();

        checkGameComplete();

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetCards();

        }, 700);
    }
}


function resetCards() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


function checkGameComplete() {

    const cards =
        document.querySelectorAll(".memory-card");

    const matched =
        document.querySelectorAll(
            '.memory-card[data-matched="true"]'
        );

    if (
        cards.length &&
        matched.length === cards.length
    ) {

        setTimeout(() => {
            goToPage("giftPage");
        }, 900);
    }
}


function shuffleCards() {

    const grid =
        document.querySelector(".memory-grid");

    if (!grid) return;

    const cards =
        Array.from(
            grid.querySelectorAll(".memory-card")
        );

    cards.sort(() =>
        Math.random() - 0.5
    );

    cards.forEach(card => {

        card.classList.remove("flipped");

        card.removeAttribute("data-matched");

        grid.appendChild(card);
    });

    resetCards();

    moves = 0;

    const movesText =
        document.querySelector(".moves");

    if (movesText) {
        movesText.innerText = "0 moves";
    }
}


/* =========================================
   GIFT
========================================= */

function openGift() {

    const gift =
        document.querySelector(".gift-box");

    if (!gift) return;

    gift.classList.add("opening");

    setTimeout(() => {
        goToPage("wishesPage");
    }, 900);
}


/* =========================================
   BALLOON WISHES
========================================= */

let poppedBalloons = 0;


function popBalloon(balloon, message) {

    if (
        balloon.classList.contains("popped")
    ) {
        return;
    }

    balloon.classList.add("popped");

    poppedBalloons++;

    const wishMessage =
        document.getElementById("wishMessage");

    if (wishMessage) {

        wishMessage.innerText = message;

        wishMessage.classList.remove("show");

        setTimeout(() => {
            wishMessage.classList.add("show");
        }, 50);
    }

    const counter =
        document.querySelector(".popped");

    if (counter) {
        counter.innerText =
            `Popped ${poppedBalloons}/6`;
    }

    if (poppedBalloons === 6) {

        setTimeout(() => {
            goToPage("memoriesPage");
        }, 2500);
    }
}


/* =========================================
   PHOTO SLIDESHOW
========================================= */

const photoList = [];

for (let i = 1; i <= 16; i++) {
    photoList.push(`${i}.jpeg`);
}

let currentSlide = 0;

const captions = [
    "Your beautiful memories ❤️",
    "Another beautiful moment ✨",
    "A memory worth keeping 💕",
    "Just a beautiful chapter ❤️",
    "One of my favourite moments 🌸",
    "A moment to remember forever ❤️",
    "Our little memories ✨",
    "Some moments stay forever 💕",
    "A beautiful day ❤️",
    "Another chapter of our story 🌷",
    "Smiles that make memories special 😊",
    "One picture, so many memories ❤️",
    "Another beautiful chapter ✨",
    "Moments close to my heart 💕",
    "Forever grateful for these memories ❤️",
    "And our story continues... 🫶🏻"
];


function changePhoto(direction = 1) {

    const image = document.getElementById("slideshowImage");
    const number = document.getElementById("currentPhoto");
    const caption = document.getElementById("memoryCaption");

    if (!image) return;

    image.classList.add("fade-out");

    setTimeout(() => {

        currentSlide += direction;

        if (currentSlide >= photoList.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = photoList.length - 1;
        }

        image.src = photoList[currentSlide];

        if (number) {
            number.innerText = currentSlide + 1;
        }

        if (caption) {
            caption.innerText = captions[currentSlide];
        }

        image.classList.remove("fade-out");

    }, 300);
}


/* Change every 3 seconds */

setInterval(changePhoto, 3000);


/* =========================================
   POP EFFECT
========================================= */

function createPopEffect(element) {

    const rect =
        element.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.innerText = "✦";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            rect.left + "px";

        sparkle.style.top =
            rect.top + "px";

        sparkle.style.color =
            "#ffd45c";

        sparkle.style.zIndex = "300";

        document.body.appendChild(sparkle);

        sparkle.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            ${(Math.random() - 0.5) * 100}px,
                            ${(Math.random() - 0.5) * 100}px
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 600
            }
        );

        setTimeout(() => {
            sparkle.remove();
        }, 700);
    }
}
