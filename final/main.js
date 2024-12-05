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
