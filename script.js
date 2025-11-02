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
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY" // <-- yaha apni API key dalni hai
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

  // Bot message show karo
  const botMsg = document.createElement("div");
  botMsg.textContent = "🤖: " + reply;
  chatBox.appendChild(botMsg);

  input.value = "";
});
