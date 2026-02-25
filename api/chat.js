module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method Not Allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response from AI"
    });

  } catch (error) {
    return res.status(500).json({ reply: "Server error occurred." });
  }
};
