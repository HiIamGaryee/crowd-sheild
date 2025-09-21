// AWS SDK v3 for JavaScript (Browser)
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Configure AWS
const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN,
  },
});

// Debug: Check if credentials are loaded
console.log("AWS Credentials loaded:", {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID
    ? "✅ Loaded"
    : "❌ Missing",
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    ? "✅ Loaded"
    : "❌ Missing",
  sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN
    ? "✅ Loaded"
    : "❌ Missing",
  region: process.env.REACT_APP_AWS_REGION || "us-east-1",
});

export const callBedrockAI = async (message) => {
  const systemPrompt = `
    You are an experienced and helpful event crew supervisor.
    You are given a task to answer questions from crew members.
    The event is a music concert on 22 September 2025, from 7:00 PM to 10:00 PM.
    Location: Kuala Lumpur Concert Hall.
    Genre: Pop and Rock.
    Headline Artist: The Rising Stars Band.
    Audience size: ~1,000 attendees.
    Facilities: 6 main gates, 2 emergency exits, food stalls, medical tent, and security checkpoints.
    Your role is to provide correct and practical guidance so crew members can manage the event smoothly.
    If you don't know the answer, you must say: "I don't know, please ask the manager".
  `;

  const prompt = `${systemPrompt}\n\nCrew member question: ${message}\nSupervisor answer:`;

  const command = new InvokeModelCommand({
    modelId: "meta.llama3-70b-instruct-v1:0",
    body: JSON.stringify({
      prompt: prompt,
      max_gen_len: 200,
      temperature: 0.7,
      top_p: 0.9,
    }),
  });

  try {
    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    return result.generation;
  } catch (error) {
    console.error("Error calling Bedrock:", error);
    throw error;
  }
};
