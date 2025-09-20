import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  ContentCopy as CopyIcon,
  Edit as EditIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Description as DocumentIcon,
  GraphicEq as EqualizerIcon,
  Star as StarIcon,
  Chat as ChatIcon,
  Bolt as BoltIcon,
} from "@mui/icons-material";

interface IMessage {
  id: string;
  message: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AiBotProps {
  onClose: () => void;
}

const AiBot = ({ onClose }: AiBotProps) => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: "1",
      message:
        "Hello! I'm your AI assistant for Crowd Shield. I can help you with event management, crew coordination, safety protocols, and any questions about our platform. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatHistory = [
    "How do I add crew members to my event?",
    "What safety protocols should I follow?",
    "How does auto-assignment work?",
    "Can I customize event settings?",
    "What if scenarios for crowd management",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: IMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: IMessage = {
        id: (Date.now() + 1).toString(),
        message:
          "I understand you're asking about: " +
          inputMessage +
          ". Let me help you with that. This is a simulated response - in the real implementation, this would connect to your AI service.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const copyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        message:
          "Hello! I'm your AI assistant for Crowd Shield. I can help you with event management, crew coordination, safety protocols, and any questions about our platform. What would you like to know?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <BoltIcon />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Super Chat
          </Typography>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  borderRadius: 3,
                  bgcolor:
                    message.sender === "user" ? "primary.main" : "grey.100",
                  color: message.sender === "user" ? "white" : "text.primary",
                  position: "relative",
                }}
              >
                <Typography variant="body1" sx={{ mb: 1, color: "light" }}>
                  {message.message}
                </Typography>

                {message.sender === "ai" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => copyMessage(message.message)}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Paper>
            </Box>
          ))}

          {isTyping && (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Paper sx={{ p: 2, borderRadius: 3, bgcolor: "grey.100" }}>
                <Typography variant="body2" color="text.secondary">
                  AI is typing...
                </Typography>
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask or search anything"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            <IconButton
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "&:disabled": {
                  bgcolor: "grey.300",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AiBot;
