const axios = require("axios");

module.exports = async (personality, memories, message) => {
  const system = `
  Personality:
  ${personality}

  Memory:
  ${memories.join("\n")}
  `;

    const res = await axios.post(
        "https://api.x.ai/v1/chat/completions",
            {
                model: "grok-beta",
                messages: [
                    { role: "system", content: system },
                    { role: "user", content: message }
                ]
            },
        {
            headers: {
            Authorization: `Bearer ${process.env.GROK_API_KEY}`
        }
    }
);

return res.data.choices[0].message.content;
};