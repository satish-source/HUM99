require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini
let aiModel;
try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  aiModel = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: "You are Nova AI Mentor, a helpful AI assistant for programming and career guidance. Respond conversationally like ChatGPT. For programming questions, provide code solutions and explanations."
  });
} catch (err) {
  console.warn('Gemini initialization warning:', err.message);
}

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hum99';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// Define a schema and model
const dataSchema = new mongoose.Schema({
  message: String,
  data: [Number],
  createdAt: { type: Date, default: Date.now }
});
const Data = mongoose.model('Data', dataSchema);

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Alex Pro" },
  title: { type: String, default: "Future Architect" },
  avatar: { type: String, default: null },
  xp: { type: Number, default: 4500 },
  level: { type: Number, default: 14 },
  streak: { type: Number, default: 12 },
  savedCareers: { 
    type: [
      {
        title: String,
        progress: Number
      }
    ],
    default: [
      { title: "AI Engineer", progress: 80 },
      { title: "Cloud Architect", progress: 45 }
    ]
  },
  unlockedBadges: { type: [String], default: ["1", "2", "3"] },
  grade: { type: String, default: "" },
  stream: { type: String, default: "" }
});
const Profile = mongoose.model('Profile', profileSchema);



// Basic route
app.get('/', (req, res) => {
  res.send('Hello from HUM99 Backend!');
});

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save new data
app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Call Google Gemini
    let response = "I'm sorry, I couldn't process your request at this time.";
    
    if (aiModel) {
      try {
        const geminiResponse = await aiModel.generateContent(message);
        response = geminiResponse.response.text();
      } catch (geminiErr) {
        console.error('Gemini API Error:', geminiErr.message);
        response = "Sorry, I'm having trouble connecting to my AI brain right now. " + geminiErr.message;
      }
    } else {
      response = "AI is not initialized properly. Please check your API key.";
    }
    
    res.json({ response });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'AI service error: ' + err.message });
  }
});

// AI Simulation Generator endpoint
app.post('/api/simulation/generate', async (req, res) => {
  try {
    const { career } = req.body;
    
    if (!career || career.trim() === '') {
      return res.status(400).json({ error: 'Career name is required.' });
    }

    const prompt = `You are a career simulation engine. Generate a realistic "Day in the Life" simulation for a professional working as a "${career}". 
    Create exactly 4 sequential event scenarios representing key parts of their day:
    1. Morning (approx 09:00 AM)
    2. Mid-day (approx 11:30 AM)
    3. Afternoon (approx 02:15 PM)
    4. End of Day (approx 05:00 PM)

    For each event, specify:
    - time: string (e.g. "09:00 AM")
    - title: string (short, engaging event title)
    - desc: string (description of the situation, the task, or problem faced)
    - choices: array of exactly 2 strings (different ways the user can respond)
    - stressMod: integer (stress change if they choose option 1, e.g. -10 to +30)
    - stressModAlt: integer (stress change if they choose option 2, e.g. -10 to +30)
    - xpMod: integer (XP earned if they choose option 1, e.g. +10 to +50)
    - xpModAlt: integer (XP earned if they choose option 2, e.g. +10 to +50)

    Ensure the challenges are highly realistic and specific to a ${career}'s actual job duties, tools, and workplace issues.
    
    Return ONLY a raw JSON array of 4 objects matching the description. No markdown wrappers, no explanations. Example format:
    [
      {
        "time": "09:00 AM",
        "title": "Daily Sync",
        "desc": "The engineering team is asking for your design files...",
        "choices": ["Share files", "Ask for extension"],
        "stressMod": 5,
        "stressModAlt": 15,
        "xpMod": 10,
        "xpModAlt": 5
      }
    ]`;

    let responseJson = [];
    
    if (aiModel) {
      try {
        const geminiResponse = await aiModel.generateContent(prompt);
        let rawText = geminiResponse.response.text();
        
        // Strip out code block ticks if Gemini accidentally adds them
        rawText = rawText.replace(/```json|```/g, '').trim();
        
        responseJson = JSON.parse(rawText);
      } catch (geminiErr) {
        console.error('Gemini Simulation API Error:', geminiErr.message);
        throw new Error('Failed to generate simulation via Gemini: ' + geminiErr.message);
      }
    } else {
      throw new Error('AI Model is not initialized.');
    }
    
    res.json(responseJson);
  } catch (err) {
    console.error('Simulation generation error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get User Profile
app.get('/api/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User Profile
app.post('/api/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AI Resume Matcher endpoint
app.post('/api/resume/match', async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    if (!resumeText || resumeText.trim() === '') {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    const prompt = `You are a career matcher. Analyze the following candidate's resume and calculate match scores (from 0 to 100) for these 7 careers:
    - swe (Software Engineer)
    - ai (AI Engineer)
    - cyber (Cybersecurity)
    - cloud (Cloud Architect)
    - ux (UI/UX Designer)
    - game (Game Developer)
    - data (Data Scientist)

    Candidate Resume:
    "${resumeText}"

    Also, identify the career path with the highest score, and list exactly 3 critical missing skills or technologies they should learn to be fully competitive for that top career.
    
    Return ONLY a raw JSON object. No markdown wrappers, no descriptions. Example format:
    {
      "scores": {
        "swe": 75,
        "ai": 60,
        "cyber": 45,
        "cloud": 50,
        "ux": 30,
        "game": 40,
        "data": 55
      },
      "topCareer": "swe",
      "missingSkills": ["Docker & Kubernetes", "System Design", "AWS Services"]
    }`;

    if (aiModel) {
      try {
        const geminiResponse = await aiModel.generateContent(prompt);
        let rawText = geminiResponse.response.text();
        rawText = rawText.replace(/```json|```/g, '').trim();
        const responseJson = JSON.parse(rawText);
        res.json(responseJson);
      } catch (geminiErr) {
        console.error('Gemini Resume Matcher Error:', geminiErr.message);
        throw new Error('Failed to match resume via Gemini: ' + geminiErr.message);
      }
    } else {
      throw new Error('AI Model is not initialized.');
    }
  } catch (err) {
    console.error('Resume matching error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// AI Skill Quiz Generator endpoint
app.post('/api/quiz/generate', async (req, res) => {
  try {
    const { skill } = req.body;
    
    if (!skill || skill.trim() === '') {
      return res.status(400).json({ error: 'Skill name is required.' });
    }

    const prompt = `You are an educational tutor. Generate a 3-question multiple-choice quiz to test the user's knowledge on the skill/technology: "${skill}".
    Each question must have 4 options and exactly one correct answer (indicated by the 0-indexed integer of the correct option).
    The questions should be appropriate for an IT professional or software student.

    Return ONLY a raw JSON array of 3 objects. No markdown wrappers, no extra notes. Example format:
    [
      {
        "question": "What is the primary command to stage all files in Git?",
        "options": ["git commit", "git push", "git add .", "git init"],
        "answer": 2
      }
    ]`;

    if (aiModel) {
      try {
        const geminiResponse = await aiModel.generateContent(prompt);
        let rawText = geminiResponse.response.text();
        rawText = rawText.replace(/```json|```/g, '').trim();
        const responseJson = JSON.parse(rawText);
        res.json(responseJson);
      } catch (geminiErr) {
        console.error('Gemini Quiz Generator Error:', geminiErr.message);
        throw new Error('Failed to generate quiz via Gemini: ' + geminiErr.message);
      }
    } else {
      throw new Error('AI Model is not initialized.');
    }
  } catch (err) {
    console.error('Quiz generation error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});