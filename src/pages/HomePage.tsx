import Layout from "../Layout";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import {
  Security,
  AutoAwesome,
  Groups,
  Assignment,
  ExpandMore,
  TrendingUp,
  Shield,
  Speed,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const faqData = [
    {
      question: "How does automatic job assignment work?",
      answer:
        "Our AI-powered system analyzes crowd density, location, and crew availability to automatically assign the most suitable crew members to specific areas, ensuring optimal coverage and response times.",
    },
    {
      question: "What types of events can the platform handle?",
      answer:
        "Crowd Shield supports concerts, festivals, sports events, conferences, and any large gatherings requiring crowd management and safety oversight.",
    },
    {
      question: "How do I get started as a crew member?",
      answer:
        "Simply sign up, complete your profile with your experience and availability, and our system will automatically assign you to relevant events based on your skills and location.",
    },
    {
      question: "Is there real-time monitoring available?",
      answer:
        "Yes! Our platform provides real-time crowd density monitoring, incident tracking, and instant communication tools for all crew members.",
    },
    {
      question: "What safety features are included?",
      answer:
        "We include emergency protocols, instant alerts, GPS tracking, communication channels, and integration with local emergency services for maximum safety.",
    },
  ];

  const features = [
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Smart Auto-Assignment",
      description:
        "AI-powered job distribution ensures optimal crew placement based on skills, location, and crowd density.",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "safe.main" }} />,
      title: "Real-Time Safety Monitoring",
      description:
        "Continuous crowd density tracking with instant alerts for potential safety concerns.",
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: "accent.main" }} />,
      title: "Crew Management",
      description:
        "Efficiently manage your crew with scheduling, communication tools, and performance tracking.",
    },
    {
      icon: <Assignment sx={{ fontSize: 40, color: "warning.main" }} />,
      title: "Event Coordination",
      description:
        "Seamless event setup with customizable protocols and real-time incident management.",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Events Managed Successfully",
      icon: <TrendingUp sx={{ fontSize: 30 }} />,
      color: "safe.main",
    },
    {
      number: "10K+",
      label: "Crew Members Registered",
      icon: <Groups sx={{ fontSize: 30 }} />,
      color: "primary.main",
    },
    {
      number: "99.8%",
      label: "Safety Record Maintained",
      icon: <Shield sx={{ fontSize: 30 }} />,
      color: "critical.main",
    },
    {
      number: "24/7",
      label: "Platform Availability",
      icon: <Speed sx={{ fontSize: 30 }} />,
      color: "accent.main",
    },
  ];

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 3,
                background: "linear-gradient(45deg, #1E3A8A, #3B82F6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Simply The Best Crowd Control Platform For Events
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Start your event management inspired. Look, we made it easy. Smart
              auto-assignment gives your crew a blueprint for managing crowds.
              The modern platform that event organizers love.
            </Typography>

            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 6 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/dashboard")}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                Get Started as Crew
              </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 8 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      height: "100%",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <CardContent>
                      <Avatar sx={{ bgcolor: stat.color, mx: "auto", mb: 2 }}>
                        {stat.icon}
                      </Avatar>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: stat.color, mb: 1 }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
              How Crowd Control Works With Our Platform
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Say goodbye to manual crew coordination and precious hours wasted
              managing assignments. Smart auto-assignment gives your team a
              blueprint for success.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard")}
              sx={{ borderRadius: 3 }}
            >
              Learn More
            </Button>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 2,
                    "&:hover": {
                      boxShadow: 4,
                      transform: "translateY(-2px)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
                Bring The Power Of AI To Your Crowd Management Process
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle sx={{ color: "safe.main", mr: 2 }} />
                  <Typography variant="body1">
                    Browse millions of crowd patterns and safety protocols
                    library
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle sx={{ color: "safe.main", mr: 2 }} />
                  <Typography variant="body1">
                    Intuitive assignment options and smart crew coordination
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle sx={{ color: "safe.main", mr: 2 }} />
                  <Typography variant="body1">
                    Make events safer with real-time data and analytics
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/dashboard")}
                sx={{ borderRadius: 3 }}
              >
                Start Managing Events
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  AI strikes the perfect balance between safety protocols and
                  operational flexibility
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our intelligent system adapts to different event types while
                  maintaining the highest safety standards.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* FAQ Section */}
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Everything you need to know about our crowd control platform
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
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
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
              color: "white",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
              Events Extraordinary. No Manual Coordination Needed.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of event organizers who trust Crowd Shield for
              their crowd management needs.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard")}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 2,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default HomePage;
