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

// 默认模式
let currentMode = "textToMorse";

// 更新模式的函数
function updateMode(mode) {
    currentMode = mode;

    // 切换按钮的 active 样式
    document.getElementById("textToMorse").classList.toggle("active", mode === "textToMorse");
    document.getElementById("morseToText").classList.toggle("active", mode === "morseToText");

    // 更新占位符和功能说明
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");

    if (mode === "textToMorse") {
        inputText.placeholder = "Enter your text...";
        outputText.placeholder = "Your Morse code translation will appear here...";
    } else {
        inputText.placeholder = "Enter your Morse code...";
        outputText.placeholder = "Your text translation will appear here...";
    }
}

// 读取文本的语音功能
function playSpeech(text) {
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.pitch = 1;
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    }
}

// 播放 Morse Code 的音效
function playMorseCode(morseCode) {
    if (!morseCode) return;

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 0.1; 
    const dashDuration = 0.3; 
    const symbolGap = 0.1; 
    const letterGap = 0.3; 
    const wordGap = 0.7; 

    let currentTime = context.currentTime;
    const words = morseCode.split("   "); 
    words.forEach((word) => {
        const letters = word.trim().split(" ");
        letters.forEach((letter) => {
            letter.split("").forEach((symbol) => {
                const oscillator = context.createOscillator();
                oscillator.type = "sine";
                oscillator.frequency.value = 600; 
                oscillator.connect(context.destination);

                const duration = symbol === "." ? dotDuration : dashDuration;
                oscillator.start(currentTime);
                oscillator.stop(currentTime + duration);
                currentTime += duration + symbolGap;
            });
            currentTime += letterGap;
        });
        currentTime += wordGap;
    });
}

// 根据当前模式动态设置按钮的功能
document.getElementById("playInputMorseBtn").addEventListener("click", () => {
    const input = document.getElementById("inputText").value.trim();
    if (currentMode === "textToMorse") {
        playSpeech(input);
    } else {
        playMorseCode(input); 
    }
});

document.getElementById("playMorseBtn").addEventListener("click", () => {
    const output = document.getElementById("outputText").value.trim();
    if (currentMode === "textToMorse") {
        playMorseCode(output); 
    } else {
        playSpeech(output);
    }
});

// 模式切换按钮事件监听
document.getElementById("textToMorse").addEventListener("click", () => updateMode("textToMorse"));
document.getElementById("morseToText").addEventListener("click", () => updateMode("morseToText"));
