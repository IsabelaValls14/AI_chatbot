function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const STAR_COUNT = 100;
let result = "";
for (let i = 0; i < STAR_COUNT; i++) {
    result += `${randomNumber(-50, 50)}vw ${randomNumber(-50, 50)}vh ${randomNumber(0, 3)}px ${randomNumber(0, 3)}px #fff,`;
}
const finalBoxShadow = result.slice(0, -1); // Remove trailing comma

const starfield = document.createElement("div");
starfield.classList.add("main");
starfield.style.boxShadow = finalBoxShadow;

document.body.appendChild(starfield);
