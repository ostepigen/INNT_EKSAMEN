import OpenAI from "openai/index.mjs";

import { OPENAI_API_KEY } from "@env"; // heneter API key fra .env fil
// opretter en ny instans af OpenAI klienten
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });


// funktion der sender en besked til OpenAI API'et
export default async function SendMessage(messageArray) {
  const response = await openai.chat.completions.create({
    model: "gpt-5", // model 5 chatgpt (måske brug en anden model hvis denne er for dyr???)
    messages: messageArray,
  });

  // henter svaret fra AI'en
  const result = response.choices[0]?.message?.content || "";
  // returnerer et objekt i OpenAI format
  return { role: "assistant", content: result };
}