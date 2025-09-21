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
  CheckCircle,
  Warning,
  Error,
} from "@mui/icons-material";
import DashboardSidebar from "../components/DashboardSidebar";
import { useState } from "react";

const DashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNotificationClick = () => {
    setIsNotificationClicked(!isNotificationClicked);
  };

  const recentEvents = [
    {
      id: 1,
      name: "Summer Music Festival",
      status: "Active",
      statusColor: "success",
      attendees: "15,000",
      crew: "45",
      location: "Central Park",
    },
    {
      id: 2,
      name: "Tech Conference 2024",
      status: "Scheduled",
      statusColor: "info",
      attendees: "3,500",
      crew: "25",
      location: "Convention Center",
    },
    {
      id: 3,
      name: "Sports Championship",
      status: "Completed",
      statusColor: "default",
      attendees: "25,000",
      crew: "60",
      location: "Stadium Arena",
    },
  ];

  const crewStats = [
    {
      title: "Active Crew Members",
      value: "127",
      change: "+12%",
      changeType: "positive",
      icon: <Groups sx={{ fontSize: 30 }} />,
      color: "primary.main",
    },
    {
      title: "Events This Month",
      value: "23",
      change: "+8%",
      changeType: "positive",
      icon: <Assignment sx={{ fontSize: 30 }} />,
      color: "safe.main",
    },
    {
      title: "Safety Score",
      value: "98.5%",
      change: "+2.1%",
      changeType: "positive",
      icon: <Security sx={{ fontSize: 30 }} />,
      color: "safe.main",
    },
    {
      title: "Response Time",
      value: "2.3 min",
      change: "-15%",
      changeType: "positive",
      icon: <Speed sx={{ fontSize: 30 }} />,
      color: "accent.main",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "High crowd density detected at Zone A",
      time: "2 minutes ago",
      icon: <Warning />,
    },
    {
      type: "success",
      message: "Crew member John Doe checked in successfully",
      time: "5 minutes ago",
      icon: <CheckCircle />,
    },
    {
      type: "error",
      message: "Emergency protocol activated at Zone C",
      time: "8 minutes ago",
      icon: <Error />,
    },
  ];

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
            <IconButton 
              onClick={handleNotificationClick}
              sx={{
                color: isNotificationClicked ? "#FFD700" : "inherit", // Yellow when clicked
                "&:hover": {
                  backgroundColor: isNotificationClicked ? "rgba(255, 215, 0, 0.1)" : "action.hover",
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
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
              Hi, John Doe
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Welcome to your crowd control command center. Monitor events,
              manage crew, and ensure safety across all venues.
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
            <Grid item xs={12} sm={6} md={3} key={index}>
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

                {recentEvents.map((event) => (
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
                          {event.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          📍 {event.location}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Typography variant="body2">
                            👥 {event.attendees} attendees
                          </Typography>
                          <Typography variant="body2">
                            🛡️ {event.crew} crew members
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={event.status}
                        color={event.statusColor as any}
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                  </Paper>
                ))}
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
                            ? "safe.main"
                            : alert.type === "warning"
                            ? "warning.main"
                            : "critical.main",
                        width: 32,
                        height: 32,
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
