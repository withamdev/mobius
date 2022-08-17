const textDisplay = document.getElementById("mobius");
const phrases = [
  "Hello, my name is Möbius.",
  "I am an AI chatbot powered by GPT-3!",
  "Ask me anything, I love to help!",
  "What happens when I get a longer message? Stick around after this commercial break to find out!",
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isPause = true;
let isDeleting = false;
let isEnd = false;
let isStart = true;

function startLoop() {
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
  if (isStart) {
    setTimeout(startLoop, time);
  }
}

startLoop();

let responsePhrase = "";

function newLoop() {
  console.log(j);
  console.log(responsePhrase.length);
  isEnd = false;

  if (j === 0) {
    isDeleting = false;
  } else if (isDeleting) {
    currentPhrase.pop(responsePhrase[j--]);
  } else if (j == responsePhrase.length) {
    isEnd = true;
  } else {
    currentPhrase.push(responsePhrase[j++]);
  }

  textDisplay.innerHTML = currentPhrase.join("") + "<span>|</span>";

  const normalSpeed = Math.random() * 50 + 50;
  const time = isDeleting ? 50 : normalSpeed;
  if (!isEnd) {
    setTimeout(newLoop, time);
  }
}

let userInput = "";
let inputField = document.getElementById("textInput");

inputField.focus();

document.addEventListener("keydown", function (event) {
  console.log(event);

  if (event.key === "Enter") {
    console.log(j);
    userInput = inputField.value;
    inputField.value = "";
    console.log(userInput);
    responsePhrase = userInput;
    isStart = false;
    isDeleting = true;
    newLoop();
  }
});
