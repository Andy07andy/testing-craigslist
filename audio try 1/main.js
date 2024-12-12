// Morse Code Mapping
const morseCodeMap = {
    "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
    "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
    "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
    "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
    "y": "-.--", "z": "--..", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..",
    "9": "----.", "0": "-----", " ": "/"
};

// Translate Functions
function translateTextToMorse(text) {
    return text.toLowerCase().split("").map(char => morseCodeMap[char] || "").join(" ");
}

function translateMorseToText(morse) {
    const reversedMap = Object.entries(morseCodeMap).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
    return morse.split(" ").map(code => reversedMap[code] || "").join("");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script Loaded");

    const translateBtn = document.getElementById("translateBtn");
    const clearBtn = document.getElementById("clearBtn");
    const copyBtn = document.getElementById("copyBtn");
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");

    translateBtn.addEventListener("click", () => {
        console.log("Translate button clicked");
        const mode = document.querySelector(".mode-btn.active").id;
        const result = mode === "textToMorse"
            ? translateTextToMorse(inputText.value)
            : translateMorseToText(inputText.value);
        outputText.value = result;
    });

    clearBtn.addEventListener("click", () => {
        console.log("Clear button clicked");
        inputText.value = "";
        outputText.value = "";
    });

    copyBtn.addEventListener("click", () => {
        console.log("Copy button clicked");
        outputText.select();
        document.execCommand("copy");
        alert("Copied to clipboard!");
    });

    document.querySelectorAll(".mode-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            inputText.value = "";
            outputText.value = "";
            document.getElementById("inputLabel").textContent =
                button.id === "textToMorse" ? "Enter Text:" : "Enter Morse Code:";
        });
    });
});

function playSpeech() {
    const input = document.getElementById('inputText').value.trim();
    if (input) {
        const utterance = new SpeechSynthesisUtterance(input);
        // Optional: Set voice, language, pitch, rate, etc.
        utterance.lang = 'en-US'; 
        utterance.pitch = 1;  
        utterance.rate = 1;   
        
        // Speak the typed text
        speechSynthesis.speak(utterance);
    }
}

function playMorseCode() {
    const output = document.getElementById('outputText').value.trim();
    if (!output) return;
    
    // Example: simple tone generator using Web Audio API
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 0.1; // seconds
    const dashDuration = 0.3; // seconds
    const symbolGap = 0.1;   // gap between parts of the same letter
    const letterGap = 0.3;   // gap between letters
    const wordGap = 0.7;     // gap between words
    
    let currentTime = context.currentTime;
    const words = output.split('   '); // Assuming 3 spaces separate words
    words.forEach((word, wIndex) => {
        const letters = word.trim().split(' ');
        letters.forEach((letter, lIndex) => {
            // Each letter is composed of dots (.) and dashes (-)
            letter.split('').forEach((symbol, sIndex) => {
                const oscillator = context.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.value = 600; // frequency in Hz (Morse tone)
                oscillator.connect(context.destination);

                let duration = symbol === '.' ? dotDuration : dashDuration;
                oscillator.start(currentTime);
                oscillator.stop(currentTime + duration);
                currentTime += duration + symbolGap;
            });
            // Add a gap after each letter
            currentTime += letterGap;
        });
        // Add a longer gap after each word
        currentTime += wordGap;
    });
}

document.getElementById('playMorseBtn').addEventListener('click', playMorseCode);

document.getElementById('playInputMorseBtn').addEventListener('click', playSpeech);
