// API Configuration
// Load from environment variables (never commit .env to git)

export const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

if (!API_KEY) {
  console.warn(
    'Warning: REACT_APP_OPENAI_API_KEY is not defined in .env file. ' +
    'AI features will not work. Please add your API key to .env file.'
  );
}
