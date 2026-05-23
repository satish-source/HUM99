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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});