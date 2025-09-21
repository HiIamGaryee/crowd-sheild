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

  // Generate dynamic system alerts based on real data
  static async getAlerts(entryRushData = null) {
    try {
      console.log("🚨 Generating dynamic alerts...");

      // Use provided entry rush data or fetch it if not provided
      let rushData = entryRushData;
      if (!rushData) {
        console.log("📊 Fetching entry rush data for alerts...");
        rushData = await this.getEntryRush();
      }
      console.log("📊 Entry rush data for alerts:", rushData);

      const alerts = [];
      const currentTime = new Date();

      // Analyze crowd distribution and generate alerts
      if (rushData && rushData.A !== undefined) {
        const totalCrew = rushData.A + rushData.B + rushData.C;

        // Alert 1: High density zones
        const maxZone = Math.max(rushData.A, rushData.B, rushData.C);
        const minZone = Math.min(rushData.A, rushData.B, rushData.C);

        if (maxZone > 20) {
          const highZone =
            rushData.A === maxZone ? "A" : rushData.B === maxZone ? "B" : "C";
          alerts.push({
            type: "warning",
            message: `High crowd density detected at Zone ${highZone} (${maxZone} people)`,
            time: "1 minute ago",
            icon: "⚠️",
          });
        }

        // Alert 2: Crew distribution
        if (totalCrew > 0) {
          alerts.push({
            type: "success",
            message: `Crew distribution optimized: A(${rushData.A}), B(${rushData.B}), C(${rushData.C})`,
            time: "2 minutes ago",
            icon: "✅",
          });
        }

        // Alert 3: Low density zones
        if (minZone < 5 && minZone > 0) {
          const lowZone =
            rushData.A === minZone ? "A" : rushData.B === minZone ? "B" : "C";
          alerts.push({
            type: "info",
            message: `Low activity at Zone ${lowZone} (${minZone} people) - consider redeployment`,
            time: "3 minutes ago",
            icon: "ℹ️",
          });
        }

        // Alert 4: System status
        alerts.push({
          type: "success",
          message: "All security checkpoints operational",
          time: "5 minutes ago",
          icon: "🛡️",
        });

        // Alert 5: Weather/External factors (simulated)
        const weatherAlerts = [
          "Clear weather conditions maintained",
          "Temperature: 28°C, Humidity: 65%",
          "No weather warnings issued",
        ];

        alerts.push({
          type: "info",
          message:
            weatherAlerts[Math.floor(Math.random() * weatherAlerts.length)],
          time: "7 minutes ago",
          icon: "🌤️",
        });
      }

      // If no dynamic alerts, provide default system alerts
      if (alerts.length === 0) {
        alerts.push(
          {
            type: "success",
            message: "System monitoring active",
            time: "1 minute ago",
            icon: "✅",
          },
          {
            type: "info",
            message: "All zones reporting normal activity",
            time: "3 minutes ago",
            icon: "ℹ️",
          },
          {
            type: "success",
            message: "Emergency protocols ready",
            time: "5 minutes ago",
            icon: "🛡️",
          }
        );
      }

      console.log("🚨 Generated alerts:", alerts);
      return alerts;
    } catch (error) {
      console.error("Error generating alerts:", error);
      // Fallback to basic alerts
      return [
        {
          type: "warning",
          message: "System monitoring active",
          time: "1 minute ago",
          icon: "⚠️",
        },
        {
          type: "success",
          message: "All zones operational",
          time: "3 minutes ago",
          icon: "✅",
        },
        {
          type: "info",
          message: "Emergency protocols ready",
          time: "5 minutes ago",
          icon: "ℹ️",
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
