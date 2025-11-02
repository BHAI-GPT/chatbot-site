const chatBox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  const userText = input.value;
  if (!userText) return;

  // User message show karo
  const userMsg = document.createElement("div");
  userMsg.textContent = "🧑: " + userText;
  chatBox.appendChild(userMsg);

  // API call
  const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", async () => {
  const userText = input.value;
  if (!userText) return;

  // User message show karo
  const userMsg = document.createElement("div");
  userMsg.textContent = "🧑: " + userText;
  chatBox.appendChild(userMsg);

  // Backend ko call karo (Render ya local server pe)
  const res = await fetch("https://YOUR-RENDER-APP.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await res.json();
  const reply = data.reply;

  // Bot message show karo
  const botMsg = document.createElement("div");
  botMsg.textContent = "🤖: " + reply;
  chatBox.appendChild(botMsg);

  input.value = "";
});
  const data = await res.json();
  const reply = data.choices[0].message.content;

  // Bot message show karo
  const botMsg = document.createElement("div");
  botMsg.textContent = "🤖: " + reply;
  chatBox.appendChild(botMsg);

  input.value = "";
});
