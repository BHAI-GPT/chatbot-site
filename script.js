import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// For resolving __dirname (because ES modules don’t have it directly)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// Main route — serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Chatbot API route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a friendly assistant." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
