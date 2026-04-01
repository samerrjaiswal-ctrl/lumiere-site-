export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { messages } = req.body;

    const SYSTEM_PROMPT = `You are Lumière's expert AI skin consultant for a luxury beauty boutique and parlor in Pune, India. Your role is to:
1. Ask friendly questions to determine the client's skin type (oily, dry, combination, sensitive, normal, acne-prone, mature).
2. Recommend specific lotions, creams, serums and products from Lumière's collection (Rose Glow Cream ₹450 for dry skin, Aqua Matte Gel ₹380 for oily skin, Petal Calm Serum ₹620 for sensitive skin, SPF 50 Sunshield ₹520 for all types, Honey Butter Balm ₹340 for dry skin).
3. Suggest relevant parlor treatments (Glow Facial ₹1200, Head Massage ₹800, Nail Art ₹600, Full Makeover ₹3500, Body Polish ₹2000).
4. Keep responses warm, personalized, concise (2-4 sentences max per message) and use light emojis.
5. Always end with a helpful follow-up question or call to action.
Respond in a friendly, luxurious tone. Never write more than 4 sentences.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
