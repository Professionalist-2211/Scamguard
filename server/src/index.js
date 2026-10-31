
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Backend health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ScamGuard server is running!",
  });
});

// Basic message analysis
app.post("/api/analyze", (req, res) => {
  const { message, category = "message", language = "en" } = req.body;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Please enter a message to analyze.",
    });
  }

  if (message.length > 10000) {
    return res.status(400).json({
      error: "Message is too long. Maximum 10,000 characters.",
    });
  }

  const text = message.toLowerCase();
  const flags = [];

  const suspiciousPatterns = [
    {
      pattern: /urgent|immediately|act now|within 24 hours/i,
      flag: "Urgent or pressure-based language",
    },
    {
      pattern: /otp|one.?time password|verification code/i,
      flag: "Requests or mentions of verification codes",
    },
    {
      pattern: /password|login details|bank details|account details/i,
      flag: "Sensitive account information mentioned",
    },
    {
      pattern: /send money|transfer money|pay now|payment required/i,
      flag: "Payment request detected",
    },
    {
      pattern: /prize|winner|lottery|congratulations/i,
      flag: "Prize or lottery-related wording",
    },
    {
      pattern: /click here|verify your account|suspended account/i,
      flag: "Suspicious link or account-verification wording",
    },
  ];

  for (const item of suspiciousPatterns) {
    if (item.pattern.test(text)) {
      flags.push(item.flag);
    }
  }

  const risk = flags.length >= 3
    ? "High"
    : flags.length >= 1
      ? "Medium"
      : "Low";

  const actions = risk === "High"
    ? [
        "Do not share personal or financial information.",
        "Avoid clicking suspicious links.",
        "Verify the sender through an official channel.",
      ]
    : risk === "Medium"
      ? [
          "Check the sender carefully.",
          "Do not share OTPs or passwords.",
          "Verify any payment request independently.",
        ]
      : [
          "No common suspicious patterns were detected.",
          "Still verify unexpected messages independently.",
        ];

  res.json({
    category,
    language,
    risk,
    level: risk,
    flags,
    actions,
    summary:
      flags.length > 0
        ? "Some suspicious patterns were detected. Review the warning signs before taking action."
        : "No common suspicious patterns were detected. This does not guarantee the message is safe.",
  });
});

// Unknown route
app.use((req, res) => {
  res.status(404).json({
    error: "API route not found.",
  });
});

// Server error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    error: "Something went wrong on the server.",
  });
});

app.listen(PORT, () => {
  console.log(`ScamGuard server running at http://localhost:${PORT}`);
});
