//const API_KEY = "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"; 
//const API_URL = "https://api.openai.com/v1/chat/completions";

const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const messagesDiv = document.getElementById("messages");

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  userInput.value = "";

  try {
    const botResponse = await getBotResponse(userMessage);
    addMessage("bot", botResponse);
  } catch (error) {
    console.error("Error:", error);
    addMessage("bot", "I'm sorry, something went wrong. Please try again later.");
  }
});

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  messagesDiv.appendChild(message);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getBotResponse(userMessage) {
  options.body = JSON.stringify({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a Morse Code expert. Answer all questions about Morse Code, including its history, encoding/decoding, usage in communication, and its applications in modern technology. Provide clear and concise explanations.",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.5,
  });

  const response = await fetch(API_URL, options);
  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content.trim();
  } else {
    throw new Error("No response from OpenAI API");
  }
}

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
  
    let prefix = "";
    if (sender === "user") {
      prefix = "Me: ";
    } else if (sender === "bot") {
      prefix = "Your Chatbot: ";
    }
  
    message.textContent = prefix + text;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  