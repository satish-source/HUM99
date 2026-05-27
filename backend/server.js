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
    systemInstruction: "You are Nova AI Mentor, a helpful AI career counselor tailored for Indian students (ages 14 to 25). Respond conversationally and warmly. Focus on competitive exams (like JEE, NEET, UPSC, CAT, CLAT, CUET, GATE, NDA), top Indian institutions (IITs, NITs, BITS, IIMs, NLUs, central universities), career paths in India, and average salary packages in Rupees (LPA). Provide clear, actionable advice, and explain technical programming concepts or code when asked."
  });
} catch (err) {
  console.warn('Gemini initialization warning:', err.message);
}

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hum99';

// Ensure the Atlas URI includes a database name (append 'hum99' before query params if missing)
if (mongoURI.includes('mongodb+srv://') || mongoURI.includes('mongodb://')) {
  try {
    const url = new URL(mongoURI);
    // If pathname is just '/' (no database specified), add 'hum99'
    if (!url.pathname || url.pathname === '/') {
      url.pathname = '/hum99';
      mongoURI = url.toString();
    }
  } catch (e) {
    console.warn('Could not parse MongoDB URI to inject db name:', e.message);
  }
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Full error:', err);
    console.error('\nTroubleshooting tips:');
    console.error('  1. Ensure your MongoDB Atlas cluster is running');
    console.error('  2. Whitelist your current IP address in Atlas: Network Access > Add IP Address > Add Current IP');
    console.error('  3. Verify your username and password in the .env file');
    console.error('  4. Check that the connection string is correctly formatted');
  });

mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Attempting to reconnect...');
});


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
  stream: { type: String, default: "" },
  goal: { type: String, default: "" }
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
// AI Career Match Quiz endpoint
app.post('/api/quiz/career-match', async (req, res) => {
  try {
    const { answers } = req.body;
    
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Answers array is required.' });
    }

    const prompt = `You are an expert career counselor. Analyze the student's responses to a 10-question career assessment quiz and calculate a match score (from 0 to 100) for each of these 13 career path IDs:
    - foundation-cs (Foundations of Computer Science)
    - foundation-finance (Financial Literacy & Banking)
    - foundation-design (Introduction to Visual Design)
    - btech-cse (B.Tech Computer Science)
    - bca (Bachelor of Computer Applications)
    - bdes (Bachelor of Design)
    - swe (Software Engineer)
    - ai (AI Engineer)
    - cyber (Cybersecurity Analyst)
    - cloud (Cloud Architect)
    - ux (UI/UX Designer)
    - game (Game Developer)
    - data (Data Scientist)

    Student Quiz Responses:
    ${JSON.stringify(answers, null, 2)}

    Provide a percentage match score (0-100) for each of the 13 paths. Also identify the single top career match ID and write a 2-sentence personalized explanation of why it fits their profile.

    Return ONLY a raw JSON object. No markdown formatting, no code blocks, no trailing comments. Example structure:
    {
      "scores": {
        "foundation-cs": 60,
        "foundation-finance": 40,
        "foundation-design": 30,
        "btech-cse": 75,
        "bca": 65,
        "bdes": 40,
        "swe": 85,
        "ai": 90,
        "cyber": 50,
        "cloud": 70,
        "ux": 35,
        "game": 55,
        "data": 80
      },
      "topCareerId": "ai",
      "explanation": "Your strong programming affinity, combined with your fascination for generative models and automation, makes AI Engineering your ideal career pathway. You will excel in designing neural networks and working on cutting-edge machine learning solutions."
    }`;

    if (aiModel) {
      try {
        const geminiResponse = await aiModel.generateContent(prompt);
        let rawText = geminiResponse.response.text();
        rawText = rawText.replace(/```json|```/g, '').trim();
        const responseJson = JSON.parse(rawText);
        res.json(responseJson);
      } catch (geminiErr) {
        console.error('Gemini Career Matcher Error:', geminiErr.message);
        throw new Error('Failed to compute career matches via Gemini: ' + geminiErr.message);
      }
    } else {
      throw new Error('AI Model is not initialized.');
    }
  } catch (err) {
    console.error('Career match error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});