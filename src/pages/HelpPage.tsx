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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  Help as HelpIcon,
  ExpandMore,
  ContactSupport,
  VideoLibrary,
  Chat,
  Phone,
  Email,
  School,
  Quiz,
  SupportAgent,
  BookOnline,
  LiveHelp,
} from "@mui/icons-material";
import DashboardSidebar from "../components/DashboardSidebar";
import { useState } from "react";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      id: 1,
      title: "Getting Started",
      description: "Learn the basics of using Crowd Shield",
      icon: <School sx={{ fontSize: 30 }} />,
      color: "primary.main",
      articles: 12,
    },
    {
      id: 2,
      title: "Crew Management",
      description: "Manage your crew members and assignments",
      icon: <SupportAgent sx={{ fontSize: 30 }} />,
      color: "safe.main",
      articles: 8,
    },
    {
      id: 3,
      title: "Event Setup",
      description: "Configure events and safety protocols",
      icon: <BookOnline sx={{ fontSize: 30 }} />,
      color: "accent.main",
      articles: 15,
    },
    {
      id: 4,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      icon: <Quiz sx={{ fontSize: 30 }} />,
      color: "warning.main",
      articles: 6,
    },
  ];

  const faqData = [
    {
      question: "How do I add crew members to my event?",
      answer:
        "To add crew members, go to the Event Management section, select your event, and click 'Add Crew'. You can search for available crew members by location, skills, or availability. The system will automatically suggest the best matches based on your event requirements.",
    },
    {
      question: "What happens if a crew member doesn't show up?",
      answer:
        "If a crew member doesn't check in within 30 minutes of their scheduled time, the system will automatically send alerts and suggest backup crew members. You can also manually reassign areas using the emergency reassignment feature.",
    },
    {
      question: "How do I set up emergency protocols?",
      answer:
        "Navigate to Event Settings > Safety Protocols. Here you can configure evacuation routes, emergency contacts, communication channels, and automatic alert triggers based on crowd density thresholds.",
    },
    {
      question: "Can I customize the dashboard layout?",
      answer:
        "Yes! Click on the settings icon in the top-right corner of your dashboard. You can rearrange widgets, add or remove sections, and customize the information displayed based on your preferences.",
    },
    {
      question: "How do I export event reports?",
      answer:
        "Go to the Reports section, select your event, choose the report type (safety, attendance, incidents), set the date range, and click 'Export'. Reports are available in PDF, Excel, and CSV formats.",
    },
  ];

  const supportOptions = [
    {
      type: "Live Chat",
      description: "Get instant help from our support team",
      icon: <Chat sx={{ fontSize: 24 }} />,
      availability: "24/7",
      responseTime: "< 2 min",
    },
    {
      type: "Phone Support",
      description: "Speak directly with a support specialist",
      icon: <Phone sx={{ fontSize: 24 }} />,
      availability: "Mon-Fri 9AM-6PM",
      responseTime: "Immediate",
    },
    {
      type: "Email Support",
      description: "Send detailed questions via email",
      icon: <Email sx={{ fontSize: 24 }} />,
      availability: "24/7",
      responseTime: "< 4 hours",
    },
    {
      type: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: <VideoLibrary sx={{ fontSize: 24 }} />,
      availability: "24/7",
      responseTime: "Instant",
    },
  ];

  const quickActions = [
    "Reset my password",
    "Update crew member information",
    "Create a new event",
    "Download safety checklist",
    "Contact emergency services",
    "View system status",
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
                width: 400,
                borderRadius: 2,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search help articles, FAQs, or ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              startIcon={<LiveHelp />}
              sx={{ borderRadius: 2 }}
            >
              Live Chat
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContactSupport />}
              sx={{ borderRadius: 2 }}
            >
              Contact Support
            </Button>
          </Box>
        </Box>

        {/* Hero Banner */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Help & Support Center
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Find answers to your questions, learn how to use Crowd Shield
              effectively, and get support when you need it. We're here to help
              you succeed.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Chip
                label="24/7 Support"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                label="Expert Help"
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                label="Quick Response"
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
          {/* Help Categories */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
              Help Categories
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {helpCategories.map((category) => (
                <Grid item xs={12} sm={6} key={category.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 2,
                      cursor: "pointer",
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
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Avatar sx={{ bgcolor: category.color }}>
                          {category.icon}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {category.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {category.articles} articles
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* FAQ Section */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Frequently Asked Questions
                </Typography>

                {faqData.map((faq, index) => (
                  <Accordion
                    key={index}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      boxShadow: 1,
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Typography variant="subtitle1">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Support Options & Quick Actions */}
          <Grid item xs={12} lg={4}>
            {/* Support Options */}
            <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Get Support
                </Typography>

                {supportOptions.map((option, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: 2,
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {option.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          {option.type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.availability} • {option.responseTime}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {option.description}
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Quick Actions
                </Typography>

                <List>
                  {quickActions.map((action, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        px: 0,
                        cursor: "pointer",
                        borderRadius: 1,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <ListItemIcon>
                        <HelpIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={action}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HelpPage;
