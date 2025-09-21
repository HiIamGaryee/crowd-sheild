// AWS SDK v3 for JavaScript (Browser)
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

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

// Configure AWS
const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN,
  },
});

console.log("Bedrock client configured:", {
  region: client.config.region(),
  credentials: client.config.credentials ? "✅ Set" : "❌ Missing",
});

// Validate credentials function
const validateCredentials = () => {
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.REACT_APP_AWS_SESSION_TOKEN;

  console.log("🔍 Credential validation:");
  console.log(
    "- Access Key ID:",
    accessKeyId ? `${accessKeyId.substring(0, 8)}...` : "❌ Missing"
  );
  console.log(
    "- Secret Access Key:",
    secretAccessKey ? `${secretAccessKey.substring(0, 8)}...` : "❌ Missing"
  );
  console.log(
    "- Session Token:",
    sessionToken ? `${sessionToken.substring(0, 20)}...` : "❌ Missing"
  );

  if (!accessKeyId || !secretAccessKey || !sessionToken) {
    console.error("❌ Missing required AWS credentials!");
    return false;
  }

  if (accessKeyId.length < 10 || secretAccessKey.length < 10) {
    console.error("❌ AWS credentials appear to be invalid (too short)!");
    return false;
  }

  console.log("✅ All credentials appear to be present");
  return true;
};

// Run validation on load
validateCredentials();

export const callBedrockAI = async (message) => {
  const systemPrompt = `
    You are an experienced and helpful event crew supervisor.
    You are given a task to answer questions from crew members.
    The event is a music concert on 22 September 2025, from 7:00 PM to 10:00 PM.
    Location: Kuala Lumpur Concert Hall.
    Genre: Pop and Rock.
    Headline Artist: The Rising Stars Band.
    Audience size: ~1,000 attendees.
    Facilities: 3 main gates, 2 emergency exits, food stalls, medical tent, and security checkpoints.
    Your role is to provide correct and practical guidance so crew members can manage the event smoothly.
    If you don't know the answer, you must say: "I don't know, please ask the manager".
    `;

  const prompt = `${systemPrompt}\n\nCrew member question: ${message}\nSupervisor answer:`;

  const command = new InvokeModelCommand({
    modelId: "meta.llama3-70b-instruct-v1:0",
    body: JSON.stringify({
      prompt: prompt,
      max_gen_len: 100,
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

// What-if analysis function
export const callWhatIfAnalysis = async (scenario) => {
  console.log("🚀 Starting what-if analysis for scenario:", scenario);

  const systemPrompt = `
    You are an experienced and helpful event crew supervisor.
    You are given a task to answer questions from crew members.
    The event is a music concert on 22 September 2025, from 7:00 PM to 10:00 PM.
    Location: Kuala Lumpur Concert Hall.
    Genre: Pop and Rock.
    Headline Artist: The Rising Stars Band.
    Audience size: ~1,000 attendees.
    Facilities: 3 main gates, 2 emergency exits, food stalls, medical tent, and security checkpoints.
    Your role is to provide plan if anything happens (rain, fire, etc.)
    so crew members can manage the event smoothly.
    No explanation or chain of thought needed, just return the result in JSON format.
    Example output:
    {
        "situation": "rain",
        "estimated_count": 100,
        "plan": "If it rains, we will move the event to the indoor stadium."
    }
    Only provide the plan the user asked for, no other text or explanation.
    `;

  const prompt = `${systemPrompt}\n\nScenario: ${scenario}`;

  const command = new InvokeModelCommand({
    modelId: "meta.llama3-70b-instruct-v1:0",
    body: JSON.stringify({
      prompt: prompt,
      max_gen_len: 100,
    }),
  });

  try {
    console.log("📡 Sending what-if request to Bedrock...");
    const response = await client.send(command);
    console.log("✅ Received what-if response from Bedrock");

    const result = JSON.parse(new TextDecoder().decode(response.body));
    console.log("📊 What-if Bedrock response:", result);

    // Clean the response to extract only the JSON part
    let cleanResponse = result.generation.trim();

    // Remove any leading/trailing non-JSON characters
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[0];
    }

    console.log("🧹 Cleaned what-if response:", cleanResponse);

    const parsedResult = JSON.parse(cleanResponse);
    console.log("🎯 Parsed what-if result:", parsedResult);

    return parsedResult;
  } catch (error) {
    console.error("❌ Error calling Bedrock for what-if analysis:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });
    throw error;
  }
};

// Entry rush analysis function
export const callEntryRushAnalysis = async () => {
  console.log("🚀 Starting entry rush analysis...");

  // Use dynamic audience data instead of hardcoded values
  // For now, we'll use mock data that represents real-time distribution
  const mockZoneDistribution = {
    A: Math.floor(Math.random() * 200) + 100, // Random between 100-300
    B: Math.floor(Math.random() * 200) + 100, // Random between 100-300
    C: Math.floor(Math.random() * 200) + 100, // Random between 100-300
  };

  const A_count = mockZoneDistribution.A;
  const B_count = mockZoneDistribution.B;
  const C_count = mockZoneDistribution.C;

  console.log("📊 Current zone distribution:", mockZoneDistribution);

  const systemPrompt = `
    You are an experienced and helpful event crew supervisor.

    Event Details:
    - 3 main gates: A, B, C
    - Attendees at gate A: ${A_count}
    - Attendees at gate B: ${B_count}
    - Attendees at gate C: ${C_count}

    Task:
    - Assign crew to gates in proportion to attendees at each gate.
    - Total crew should not exceed 50.
    - Use ONLY the gates A, B, C.
    - Always output all gates, even if the value is 0.
    - Do NOT include any explanation, reasoning, or code in the response.
    - The output MUST be strictly valid JSON in the format of the example below.
    - DO NOT return anything other than the JSON format.

    Required JSON schema:
    {
        "A": <integer>,
        "B": <integer>,
        "C": <integer>
    }

    Example (numbers are placeholders):
    {
        "A": 10,
        "B": 5,
        "C": 35
    }
    `;

  const command = new InvokeModelCommand({
    modelId: "meta.llama3-70b-instruct-v1:0",
    body: JSON.stringify({
      prompt: systemPrompt,
      max_gen_len: 100,
    }),
  });

  try {
    console.log("📡 Sending request to Bedrock...");
    const response = await client.send(command);
    console.log("✅ Received response from Bedrock");

    const result = JSON.parse(new TextDecoder().decode(response.body));
    console.log("📊 Bedrock response:", result);

    // Clean the response to extract only the JSON part
    let cleanResponse = result.generation.trim();

    // Remove any leading/trailing non-JSON characters
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[0];
    }

    console.log("🧹 Cleaned response:", cleanResponse);

    const parsedResult = JSON.parse(cleanResponse);
    console.log("🎯 Parsed entry rush result:", parsedResult);

    return parsedResult;
  } catch (error) {
    console.error("❌ Error calling Bedrock for entry rush analysis:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });
    throw error;
  }
};
