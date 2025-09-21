import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Chip,
  IconButton,
  InputBase,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  Groups,
  Security,
  Assignment,
  Speed,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import DashboardSidebar from "../components/DashboardSidebar";
import { useState, useEffect } from "react";
import DashboardAPI from "../api/dashboardAPI";

// Type definitions
interface AudienceStats {
  total_attendees: number;
  entered: number;
  not_entered: number;
  exited: number;
  zone_distribution: { [key: string]: number };
  entry_rate: number;
}

interface RecentEvent {
  id: number;
  attendee: string;
  zone: string;
  time: string;
  status: string;
  name?: string;
  location?: string;
  attendees?: string;
  crew?: string;
  statusColor?: string;
}

interface Alert {
  type: string;
  message: string;
  time: string;
  icon: string;
}

interface CrewStat {
  title: string;
  value: number | string;
  change: string;
  changeType: string;
  icon: React.ReactElement;
  color: string;
}

const DashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [audienceStats, setAudienceStats] = useState<AudienceStats | null>(
    null
  );
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [crewStats, setCrewStats] = useState<CrewStat[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Manual refresh function
  const refreshData = async () => {
    try {
      setLoading(true);
      console.log("🔄 Manually refreshing dashboard data...");

      // Fetch data in optimized order to avoid duplicate API calls
      const [statsData, eventsData, entryRushData] = await Promise.all([
        DashboardAPI.getAudienceStats(),
        DashboardAPI.getRecentEvents(),
        DashboardAPI.getEntryRush(),
      ]);

      // Generate alerts using the already fetched entry rush data
      const alertsData = await DashboardAPI.getAlerts(entryRushData);

      setAudienceStats(statsData);
      setRecentEvents(eventsData);
      setAlerts(alertsData);

      console.log("📊 Recent Events Data:", eventsData);
      console.log("🚨 Alerts Data:", alertsData);

      // Transform entry rush data into crew stats
      const crewStatsData = [
        {
          title: "Gate A Crew",
          value: entryRushData.A || 0,
          change: "+12%",
          changeType: "positive",
          icon: <Groups sx={{ fontSize: 30 }} />,
          color: "primary.main",
        },
        {
          title: "Gate B Crew",
          value: entryRushData.B || 0,
          change: "+8%",
          changeType: "positive",
          icon: <Assignment sx={{ fontSize: 30 }} />,
          color: "safe.main",
        },
        {
          title: "Gate C Crew",
          value: entryRushData.C || 0,
          change: "+2.1%",
          changeType: "positive",
          icon: <Security sx={{ fontSize: 30 }} />,
          color: "safe.main",
        },
        {
          title: "Entry Rate",
          value: `${statsData.entry_rate || 0}%`,
          change: "-15%",
          changeType: "positive",
          icon: <Speed sx={{ fontSize: 30 }} />,
          color: "accent.main",
        },
      ];
      setCrewStats(crewStatsData);
      console.log("✅ Dashboard data refreshed successfully");
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data from API only once on page load
  useEffect(() => {
    refreshData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading dashboard data...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        overflow: "auto",
      }}
    >
      <DashboardSidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: 0 },
          mt: { xs: 7, md: 0 },
          overflow: "auto",
          height: "100vh",
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
                borderRadius: 2,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search events, crew, locations..."
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              label="Live"
              color="error"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={refreshData}
              disabled={loading}
              title="Refresh Dashboard Data"
              sx={{
                color: loading ? "text.disabled" : "primary.main",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <RefreshIcon
                sx={{
                  animation: loading ? "spin 1s linear infinite" : "none",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            </IconButton>
            <IconButton onClick={toggleDarkMode}>
              <DarkModeIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: "primary.main" }}>JD</Avatar>
          </Box>
        </Box>

        {/* Hero Banner */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Event Dashboard - Kuala Lumpur Concert Hall
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              {audienceStats ? (
                <>
                  Total Attendees: {audienceStats.total_attendees} | Entered:{" "}
                  {audienceStats.entered} | Entry Rate:{" "}
                  {audienceStats.entry_rate}%
                </>
              ) : (
                "Welcome to your crowd control command center. Monitor events, manage crew, and ensure safety across all venues."
              )}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              View Live Events
            </Button>
          </Box>

          {/* Decorative Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.1)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              right: 50,
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.05)",
              zIndex: 1,
            }}
          />
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {crewStats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar sx={{ bgcolor: stat.color }}>{stat.icon}</Avatar>
                    <Chip
                      label={stat.change}
                      size="small"
                      color={
                        stat.changeType === "positive" ? "success" : "error"
                      }
                      sx={{ fontWeight: "bold" }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Events */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Recent Events
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>

                {recentEvents.length > 0 ? (
                  recentEvents.map((event) => (
                    <Paper
                      key={event.id}
                      sx={{
                        p: 3,
                        mb: 2,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          boxShadow: 2,
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {event.attendee}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            🎫 Zone: {event.zone}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ⏰ {event.time}
                          </Typography>
                        </Box>
                        <Chip
                          label={event.status}
                          color={
                            event.status === "Entered"
                              ? "success"
                              : event.status === "Not Entered"
                              ? "warning"
                              : "default"
                          }
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No recent events to display
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Alerts & Notifications */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Live Alerts
                </Typography>

                {alerts.map((alert, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          alert.type === "success"
                            ? "success.main"
                            : alert.type === "warning"
                            ? "warning.main"
                            : alert.type === "error"
                            ? "error.main"
                            : alert.type === "info"
                            ? "info.main"
                            : "grey.500",
                        width: 32,
                        height: 32,
                        fontSize: "16px",
                      }}
                    >
                      {alert.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
