// API service for fetching data using AWS Bedrock directly
import {
  callBedrockAI,
  callWhatIfAnalysis,
  callEntryRushAnalysis,
} from "./bedrockService";

class DashboardAPI {
  // Generate mock audience statistics
  static async getAudienceStats() {
    try {
      // Return mock data since we don't have S3 access from frontend
      return {
        total_attendees: 1000,
        entered: 750,
        not_entered: 200,
        exited: 50,
        zone_distribution: { A: 300, B: 350, C: 350 },
        entry_rate: 75.0,
      };
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error("Error generating audience stats:", error);
      return {
        total_attendees: 1000,
        entered: 750,
        not_entered: 200,
        exited: 50,
        zone_distribution: { A: 300, B: 350, C: 350 },
        entry_rate: 75.0,
      };
    }
  }

  // Fetch crew assignment for entry rush using Bedrock
  static async getEntryRush() {
    try {
      console.log("🔄 DashboardAPI: Getting entry rush data...");
      const result = await callEntryRushAnalysis();
      console.log("✅ DashboardAPI: Entry rush data received:", result);
      return result;
    } catch (error) {
      console.error("❌ DashboardAPI: Error fetching entry rush data:", error);
      console.error("Error stack:", error.stack);
      // Return fallback data
      const fallbackData = { A: 15, B: 20, C: 15 };
      console.log("🔄 DashboardAPI: Using fallback data:", fallbackData);
      return fallbackData;
    }
  }

  // Generate mock recent events
  static async getRecentEvents() {
    try {
      // Return mock data
      return [
        {
          id: 1,
          attendee: "Attendee 001",
          zone: "A-15",
          time: "2 minutes ago",
          status: "Entered",
        },
        {
          id: 2,
          attendee: "Attendee 002",
          zone: "B-22",
          time: "3 minutes ago",
          status: "Entered",
        },
        {
          id: 3,
          attendee: "Attendee 003",
          zone: "C-08",
          time: "5 minutes ago",
          status: "Entered",
        },
      ];
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error("Error generating recent events:", error);
      return [
        {
          id: 1,
          attendee: "Attendee 001",
          zone: "A-15",
          time: "2 minutes ago",
          status: "Entered",
        },
        {
          id: 2,
          attendee: "Attendee 002",
          zone: "B-22",
          time: "3 minutes ago",
          status: "Entered",
        },
        {
          id: 3,
          attendee: "Attendee 003",
          zone: "C-08",
          time: "5 minutes ago",
          status: "Entered",
        },
      ];
    }
  }

  // Generate mock system alerts
  static async getAlerts() {
    try {
      // Return mock data
      return [
        {
          type: "warning",
          message: "High crowd density detected at Zone A",
          time: "2 minutes ago",
          icon: "warning",
        },
        {
          type: "success",
          message: "Crew member John Doe checked in successfully",
          time: "5 minutes ago",
          icon: "success",
        },
        {
          type: "error",
          message: "Emergency protocol activated at Zone C",
          time: "8 minutes ago",
          icon: "error",
        },
      ];
    } catch (error) {
      console.error("Error generating alerts:", error);
      return [
        {
          type: "warning",
          message: "High crowd density detected at Zone A",
          time: "2 minutes ago",
          icon: "warning",
        },
        {
          type: "success",
          message: "Crew member John Doe checked in successfully",
          time: "5 minutes ago",
          icon: "success",
        },
        {
          type: "error",
          message: "Emergency protocol activated at Zone C",
          time: "8 minutes ago",
          icon: "error",
        },
      ];
    }
  }

  // Fetch what-if scenario analysis using Bedrock
  static async getWhatIfAnalysis(scenario) {
    try {
      const result = await callWhatIfAnalysis(scenario);
      return result;
    } catch (error) {
      console.error("Error fetching what-if analysis:", error);
      // Return fallback data
      return {
        situation: scenario,
        estimated_count: 100,
        plan: `If ${scenario} occurs, we will implement emergency protocols and ensure attendee safety.`,
      };
    }
  }

  // Fetch chat bot response using Bedrock
  static async getChatResponse(message) {
    try {
      const response = await callBedrockAI(message);
      return response;
    } catch (error) {
      console.error("Error fetching chat response:", error);
      return "I'm sorry, I'm having trouble connecting to the AI service. Please try again later.";
    }
  }
}

export default DashboardAPI;
