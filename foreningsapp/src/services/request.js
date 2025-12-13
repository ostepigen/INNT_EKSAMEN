import OpenAI from "openai/index.mjs";
import { OPENAI_API_KEY } from "@env"; // henter API key fra .env fil

// opretter en ny instans af OpenAI klienten
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// funktion der sender en besked til OpenAI API'et
export default async function SendMessage(messageArray) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // model 3.5 chatgpt (billigste model)
    messages: messageArray,
  });

  // henter svaret fra AI'en
  const result = response.choices[0]?.message?.content || "";
  // returnerer et objekt i OpenAI format
  return { role: "assistant", content: result };
}