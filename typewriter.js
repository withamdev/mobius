const textDisplay = document.getElementById("text");
const phrases = [
  "Hello, my name is Möbius.",
  "I am an AI chatbot powered by GPT-3!",
  "Ask me anything, I love to help!",
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isPause = true;
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  isPause = false;

  if (!isDeleting && j <= phrases[i].length) {
    currentPhrase.push(phrases[i][j++]);
  }

  if (isDeleting && j <= phrases[i].length) {
    currentPhrase.pop(phrases[i][j--]);
  }

  if (j == phrases[i].length) {
    isEnd = true;
    isDeleting = true;
  }

  if (j === 0) {
    isPause = true;

    if (isDeleting) {
      currentPhrase = [];
      isDeleting = false;
      i++;

      if (i === phrases.length) {
        i = 0;
      }
    }
  }
  textDisplay.innerHTML = currentPhrase.join("") + "<span>|</span>";
  const normalSpeed = Math.random() * 50 + 50;
  const time = isEnd ? 2000 : isPause ? 1000 : isDeleting ? 50 : normalSpeed;
  setTimeout(loop, time);
}

loop();
