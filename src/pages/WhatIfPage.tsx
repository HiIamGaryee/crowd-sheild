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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Warning,
  Groups,
  Assignment,
  Security,
  PlayArrow,
  Refresh,
  Download,
} from "@mui/icons-material";
import DashboardSidebar from "../components/DashboardSidebar";
import { useState } from "react";

const WhatIfPage = () => {
  const [eventType, setEventType] = useState("");
  const [crowdSize, setCrowdSize] = useState("");

  const scenarios = [
    {
      id: 1,
      name: "Emergency Evacuation",
      description:
        "Simulate emergency evacuation procedures for different crowd sizes",
      icon: <Warning sx={{ fontSize: 30 }} />,
      color: "critical.main",
      complexity: "High",
    },
    {
      id: 2,
      name: "Weather Impact",
      description: "Analyze crowd behavior during weather changes",
      icon: <Security sx={{ fontSize: 30 }} />,
      color: "warning.main",
      complexity: "Medium",
    },
    {
      id: 3,
      name: "Venue Capacity",
      description: "Test different venue capacities and crowd flow patterns",
      icon: <Groups sx={{ fontSize: 30 }} />,
      color: "safe.main",
      complexity: "Low",
    },
    {
      id: 4,
      name: "Crew Shortage",
      description: "Simulate scenarios with reduced crew availability",
      icon: <Assignment sx={{ fontSize: 30 }} />,
      color: "accent.main",
      complexity: "Medium",
    },
  ];

  const simulationResults = [
    {
      metric: "Evacuation Time",
      current: "8.5 min",
      simulated: "12.3 min",
      change: "+45%",
      status: "warning",
    },
    {
      metric: "Crowd Density",
      current: "0.7",
      simulated: "0.9",
      change: "+29%",
      status: "critical",
    },
    {
      metric: "Response Time",
      current: "2.1 min",
      simulated: "3.8 min",
      change: "+81%",
      status: "warning",
    },
    {
      metric: "Safety Score",
      current: "98.5%",
      simulated: "87.2%",
      change: "-11%",
      status: "critical",
    },
  ];

  const recommendations = [
    {
      type: "critical",
      title: "Increase Crew Count",
      description: "Add 15 more crew members to maintain safety standards",
      priority: "High",
    },
    {
      type: "warning",
      title: "Modify Evacuation Routes",
      description: "Implement alternative exit strategies for better flow",
      priority: "Medium",
    },
    {
      type: "success",
      title: "Install Additional Sensors",
      description: "Deploy 5 more crowd density sensors in high-traffic areas",
      priority: "Low",
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
                placeholder="Search scenarios..."
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              sx={{ borderRadius: 2 }}
            >
              Run Simulation
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              sx={{ borderRadius: 2 }}
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{ borderRadius: 2 }}
            >
              Export Results
            </Button>
          </Box>
        </Box>

        {/* Hero Banner */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              What-If Analysis Center
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Simulate different scenarios and analyze potential outcomes for
              your crowd control operations. Make informed decisions with
              data-driven insights.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Chip
                label="AI-Powered"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                label="Real-Time"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                label="Predictive"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
            </Box>
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
        </Paper>

        <Grid container spacing={3}>
          {/* Scenario Selection */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Scenario Parameters
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Event Type</InputLabel>
                    <Select
                      value={eventType}
                      label="Event Type"
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <MenuItem value="concert">Concert</MenuItem>
                      <MenuItem value="festival">Festival</MenuItem>
                      <MenuItem value="sports">Sports Event</MenuItem>
                      <MenuItem value="conference">Conference</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Crowd Size</InputLabel>
                    <Select
                      value={crowdSize}
                      label="Crowd Size"
                      onChange={(e) => setCrowdSize(e.target.value)}
                    >
                      <MenuItem value="small">Small (1K-5K)</MenuItem>
                      <MenuItem value="medium">Medium (5K-15K)</MenuItem>
                      <MenuItem value="large">Large (15K-50K)</MenuItem>
                      <MenuItem value="mega">Mega (50K+)</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Custom Scenario"
                    multiline
                    rows={3}
                    placeholder="Describe your specific scenario..."
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Quick Scenarios
                </Typography>

                {scenarios.map((scenario) => (
                  <Paper
                    key={scenario.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: 2,
                        borderColor: scenario.color,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: scenario.color }}>
                        {scenario.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          {scenario.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {scenario.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={scenario.complexity}
                        size="small"
                        color={
                          scenario.complexity === "High"
                            ? "error"
                            : scenario.complexity === "Medium"
                            ? "warning"
                            : "success"
                        }
                      />
                    </Box>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Simulation Results */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
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
                    Simulation Results
                  </Typography>
                  <Chip
                    label="Last Run: 2 min ago"
                    color="success"
                    size="small"
                  />
                </Box>

                <Grid container spacing={2}>
                  {simulationResults.map((result, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor:
                            result.status === "critical"
                              ? "critical.main"
                              : result.status === "warning"
                              ? "warning.main"
                              : "divider",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          {result.metric}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Current: {result.current}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Simulated: {result.simulated}
                          </Typography>
                        </Box>
                        <Chip
                          label={result.change}
                          size="small"
                          color={
                            result.status === "critical" ? "error" : "warning"
                          }
                          sx={{ fontWeight: "bold" }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Recommendations
                </Typography>

                {recommendations.map((rec, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 3,
                      mb: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor:
                        rec.type === "critical"
                          ? "critical.main"
                          : rec.type === "warning"
                          ? "warning.main"
                          : "safe.main",
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
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {rec.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rec.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={rec.priority}
                        color={
                          rec.priority === "High"
                            ? "error"
                            : rec.priority === "Medium"
                            ? "warning"
                            : "success"
                        }
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WhatIfPage;
