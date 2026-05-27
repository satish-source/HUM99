import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StatBadge from '../components/StatBadge';
import AnimatedSection from '../components/AnimatedSection';
import { 
  Search, Filter, ArrowRight, Brain, Code, Shield, Cloud, Palette, Gamepad2, Database,
  UploadCloud, X, Sparkles, Loader2, BookOpen, GraduationCap, Cpu, Landmark, Brush, Monitor, Smartphone, Lock, Star, CheckCircle2,
  FileText, File, CheckCircle, AlertCircle, Clipboard
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const careers = [
  // Class 10 Foundational Skills
  { id: 'foundation-cs', title: "Foundations of Computer Science", category: "Foundation", salary: "₹1.5L - ₹3L LPA (Entry-Level)", stress: "Low", aiRisk: "Low", demand: "High", stream: "Science", cities: "Online / Local Schools", recommendedStage: "Class 10" },
  { id: 'foundation-finance', title: "Financial Literacy & Banking", category: "Foundation", salary: "₹2L - ₹4L LPA (Entry-Level)", stress: "Low", aiRisk: "Low", demand: "Medium", stream: "Commerce", cities: "Online / Local Schools", recommendedStage: "Class 10" },
  { id: 'foundation-design', title: "Introduction to Visual Design", category: "Foundation", salary: "₹2L - ₹4L LPA (Entry-Level)", stress: "Low", aiRisk: "Medium", demand: "Medium", stream: "Arts & Design", cities: "Online / Local Schools", recommendedStage: "Class 10" },

  // Class 12 Degrees & Prep
  { id: 'btech-cse', title: "B.Tech Computer Science (JEE Prep)", category: "Degree", salary: "₹6L - ₹18L LPA (Post-Degree)", stress: "High", aiRisk: "Low", demand: "Very High", stream: "Science", cities: "IITs, NITs, BITS Pilani", recommendedStage: "Class 12" },
  { id: 'bca', title: "Bachelor of Computer Applications (BCA)", category: "Degree", salary: "₹4L - ₹10L LPA (Post-Degree)", stress: "Medium", aiRisk: "Medium", demand: "High", stream: "Science", cities: "DU, Christ, Symbiosis", recommendedStage: "Class 12" },
  { id: 'bdes', title: "Bachelor of Design (B.Des / NID Prep)", category: "Degree", salary: "₹5L - ₹14L LPA (Post-Degree)", stress: "Medium", aiRisk: "Medium", demand: "High", stream: "Arts & Design", cities: "NID, IITs, NIFT", recommendedStage: "Class 12" },

  // College / Professional Careers
  { id: 'swe', title: "Software Engineer", category: "Engineering", salary: "₹8L - ₹25L LPA", stress: "High", aiRisk: "Low", demand: "High", stream: "Science", cities: "Bengaluru, Pune, Hyderabad", recommendedStage: "College Student" },
  { id: 'ai', title: "AI Engineer", category: "Engineering", salary: "₹12L - ₹38L LPA", stress: "High", aiRisk: "Very Low", demand: "Very High", stream: "Science", cities: "Bengaluru, Delhi NCR, Mumbai", recommendedStage: "College Student" },
  { id: 'cyber', title: "Cybersecurity Analyst", category: "Security", salary: "₹7L - ₹22L LPA", stress: "Extreme", aiRisk: "Low", demand: "High", stream: "Science", cities: "Bengaluru, Mumbai, Chennai", recommendedStage: "College Student" },
  { id: 'cloud', title: "Cloud Architect", category: "Infrastructure", salary: "₹10L - ₹30L LPA", stress: "Medium", aiRisk: "Low", demand: "High", stream: "Science", cities: "Bengaluru, Hyderabad, Pune", recommendedStage: "College Student" },
  { id: 'ux', title: "UI/UX Designer", category: "Design", salary: "₹6L - ₹18L LPA", stress: "Medium", aiRisk: "Medium", demand: "Medium", stream: "Arts & Design", cities: "Mumbai, Bengaluru, Delhi NCR", recommendedStage: "College Student" },
  { id: 'game', title: "Game Developer", category: "Engineering", salary: "₹5L - ₹16L LPA", stress: "High", aiRisk: "Medium", demand: "Medium", stream: "Science", cities: "Bengaluru, Hyderabad, Pune", recommendedStage: "College Student" },
  { id: 'data', title: "Data Scientist", category: "Data", salary: "₹9L - ₹28L LPA", stress: "Medium", aiRisk: "Medium", demand: "High", stream: "Science", cities: "Bengaluru, Mumbai, Gurgaon", recommendedStage: "College Student" },
];

const getCareerIcon = (id) => {
  switch (id) {
    case 'foundation-cs': return <Cpu className="text-blue-500" size={24} />;
    case 'foundation-finance': return <Landmark className="text-amber-500" size={24} />;
    case 'foundation-design': return <Brush className="text-pink-500" size={24} />;
    
    case 'btech-cse': return <Monitor className="text-blue-600" size={24} />;
    case 'bca': return <Smartphone className="text-sky-500" size={24} />;
    case 'bdes': return <Palette className="text-pink-600" size={24} />;
    
    case 'swe': return <Code className="text-blue-600" size={24} />;
    case 'ai': return <Brain className="text-violet-600" size={24} />;
    case 'cyber': return <Shield className="text-red-500" size={24} />;
    case 'cloud': return <Cloud className="text-sky-500" size={24} />;
    case 'ux': return <Palette className="text-pink-500" size={24} />;
    case 'game': return <Gamepad2 className="text-green-500" size={24} />;
    case 'data': return <Database className="text-amber-600" size={24} />;
    default: return <Sparkles className="text-blue-500" size={24} />;
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "1. Which subject or topic do you enjoy learning about the most?",
    options: [
      { text: "Math, logic puzzles, or computer algorithms", value: "logic" },
      { text: "Science, human biology, or chemistry", value: "science" },
      { text: "Drawing, visual arts, typography, or UI screens", value: "design" },
      { text: "Business, finance, investments, or writing", value: "business" }
    ]
  },
  {
    id: 2,
    question: "2. How would you describe your ideal daily task style?",
    options: [
      { text: "Writing code, configuring tools, and solving bugs", value: "coding" },
      { text: "Analyzing numbers, finding trends, and training data models", value: "data" },
      { text: "Designing layouts, matching colors, and creating graphics", value: "visuals" },
      { text: "Creating business strategies, tracking budgets, or networking", value: "finance" }
    ]
  },
  {
    id: 3,
    question: "3. What type of work environment excites you most?",
    options: [
      { text: "Fast-paced tech startup or software house", value: "tech" },
      { text: "A creative studio, design agency, or game house", value: "creative" },
      { text: "Corporate office, bank, or consulting firm", value: "corporate" },
      { text: "School, local coaching centre, or research lab", value: "academic" }
    ]
  },
  {
    id: 4,
    question: "4. When faced with a problem, what is your first instinct?",
    options: [
      { text: "Build a technical solution, script, or utility", value: "build" },
      { text: "Look at the numbers, calculate averages, and find correlations", value: "analyze" },
      { text: "Sketch out the user interface or sketch a diagram", value: "sketch" },
      { text: "Structure a plan, allocate budget, or talk to people", value: "plan" }
    ]
  },
  {
    id: 5,
    question: "5. What is your priority when looking at future careers?",
    options: [
      { text: "Maximizing salary and unlocking high-paying packages", value: "salary" },
      { text: "Low stress, good work-life balance, and low pressure", value: "balance" },
      { text: "Future-proof roles with very low automation/AI replacement risk", value: "security" },
      { text: "High creativity, passion projects, and self-expression", value: "creative" }
    ]
  },
  {
    id: 6,
    question: "6. How do you feel about coding and advanced mathematics?",
    options: [
      { text: "I love it! I want to write code or do data math all day", value: "love" },
      { text: "I like coding as a tool, but I prefer the visual design aspect", value: "visual-first" },
      { text: "I prefer business analysis, finances, and compound interest calculations", value: "finance-first" },
      { text: "I am not fond of coding; I prefer creative or human-centric roles", value: "non-tech" }
    ]
  },
  {
    id: 7,
    question: "7. What is your perspective on Artificial Intelligence (AI)?",
    options: [
      { text: "I want to build neural networks, train LLMs, and develop AI models", value: "build-ai" },
      { text: "I want to deploy AI securely or use cloud servers to run them", value: "cloud-ai" },
      { text: "I want to design the visual prompts and interfaces for AI tools", value: "design-ai" },
      { text: "I want to understand AI trends but focus on business/finance", value: "business-ai" }
    ]
  },
  {
    id: 8,
    question: "8. How long are you willing to study or prepare for your career?",
    options: [
      { text: "4 years for a comprehensive engineering degree (B.Tech)", value: "btech" },
      { text: "3 years for a practical applications degree (BCA)", value: "bca" },
      { text: "4 years for a visual arts and design specialty (B.Des)", value: "bdes" },
      { text: "Short-term certifications and jump straight into coding", value: "cert" }
    ]
  },
  {
    id: 9,
    question: "9. If you were starting a personal project, what would it be?",
    options: [
      { text: "Developing a 3D multiplayer game or web application", value: "game-web" },
      { text: "Creating a budget tracker or investing in dummy stocks", value: "finance-app" },
      { text: "Publishing a graphic novel, Figma portfolio, or branding template", value: "graphics" },
      { text: "Configuring a local server network or security firewall", value: "infrastructure" }
    ]
  },
  {
    id: 10,
    question: "10. What is your primary communication style?",
    options: [
      { text: "Writing clear technical specs or scripting logic", value: "technical" },
      { text: "Creating visual diagrams, prototypes, and slides", value: "visual" },
      { text: "Presenting numbers, charts, and financial reports", value: "analytical" },
      { text: "Collaborating with clients, mentoring, and direct talking", value: "verbal" }
    ]
  }
];

const CareerExplorer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlStage = searchParams.get('stage');
  const urlStream = searchParams.get('stream');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Resume Scanner State
  const [showModal, setShowModal] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [matchingLoading, setMatchingLoading] = useState(false);
  const [resumeMatchScores, setResumeMatchScores] = useState(null);
  const [missingSkills, setMissingSkills] = useState(null);
  const [resumeTab, setResumeTab] = useState('upload'); // 'upload' | 'paste'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileParseLoading, setFileParseLoading] = useState(false);
  const [fileParseError, setFileParseError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // AI Career Match Quiz State
  const [showCareerQuizModal, setShowCareerQuizModal] = useState(false);
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(Array(10).fill(''));
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizMatchScores, setQuizMatchScores] = useState(null);
  const [quizTopCareerId, setQuizTopCareerId] = useState(null);
  const [quizExplanation, setQuizExplanation] = useState(null);

  useEffect(() => {
    const quizParam = searchParams.get('quiz');
    if (quizParam === 'true') {
      setShowCareerQuizModal(true);
    }
  }, [searchParams]);

  // User Profile for Personalization
  const [profile, setProfile] = useState(null);
  const [selectedStageFilter, setSelectedStageFilter] = useState(urlStage || 'All');
  const [selectedStreamFilter, setSelectedStreamFilter] = useState(urlStream || 'All');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          
          // Only fall back to profile values if there's no URL param overriding it
          if (!urlStage && data.grade) {
            setSelectedStageFilter(data.grade);
            if (data.grade === 'Class 10') {
              setSelectedStreamFilter('All');
            }
          }
          if (!urlStream && data.stream && (!urlStage || urlStage !== 'Class 10') && (data.grade !== 'Class 10')) {
            setSelectedStreamFilter(data.stream);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, [urlStage, urlStream]);

  const stages = ['All', 'Class 10', 'Class 12', 'College Student'];
  const streams = ['All', 'Science', 'Commerce', 'Arts & Design'];
  const categories = ['All', ...new Set(careers.map(c => c.category))];

  const handleStageSelect = (stage) => {
    setSelectedStageFilter(stage);
    if (stage === 'Class 10') {
      setSelectedStreamFilter('All');
    }
  };

  const handleSaveCareer = async (courseTitle, courseId) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const getRes = await fetch(`${apiBaseUrl}/api/profile`);
      if (getRes.ok) {
        const currentProfile = await getRes.json();
        const currentSaved = currentProfile.savedCareers || [];
        const exists = currentSaved.some(c => c.title === courseTitle);
        if (!exists) {
          const updatedSaved = [...currentSaved, { title: courseTitle, progress: 10 }];
          const saveRes = await fetch(`${apiBaseUrl}/api/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ savedCareers: updatedSaved })
          });
          if (saveRes.ok) {
            alert(`"${courseTitle}" has been added to your dashboard!`);
            setProfile(prev => ({ ...prev, savedCareers: updatedSaved }));
          }
        } else {
          alert(`"${courseTitle}" is already saved in your dashboard.`);
        }
      }
    } catch (err) {
      console.error('Error saving career:', err);
    }
  };

  const filteredCareers = careers.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStage = selectedStageFilter === 'All' || c.recommendedStage === selectedStageFilter;
    const matchesStream = selectedStreamFilter === 'All' || c.stream === selectedStreamFilter;
    return matchesSearch && matchesCategory && matchesStage && matchesStream;
  });

  const hasMatchScore = !!resumeMatchScores || !!quizMatchScores;
  
  const displayedCareers = hasMatchScore
    ? [...filteredCareers].sort((a, b) => {
        const scoreA = resumeMatchScores ? (resumeMatchScores[a.id] || 0) : (quizMatchScores ? (quizMatchScores[a.id] || 0) : 0);
        const scoreB = resumeMatchScores ? (resumeMatchScores[b.id] || 0) : (quizMatchScores ? (quizMatchScores[b.id] || 0) : 0);
        return scoreB - scoreA;
      })
    : filteredCareers;

  // Extract text from a PDF file using pdfjs-dist
  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText.trim();
  };

  const processFile = useCallback(async (file) => {
    if (!file) return;
    const validTypes = ['application/pdf', 'text/plain'];
    const validExts = ['.pdf', '.txt'];
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
      setFileParseError('Unsupported file type. Please upload a PDF or TXT file.');
      return;
    }
    setFileParseLoading(true);
    setFileParseError(null);
    setUploadedFile(file);
    try {
      let text = '';
      if (file.type === 'application/pdf' || ext === '.pdf') {
        text = await extractPdfText(file);
      } else {
        // Plain text file
        text = await file.text();
      }
      if (!text.trim()) {
        throw new Error('Could not extract text from this file. Try copying and pasting your resume text instead.');
      }
      setResumeText(text);
    } catch (err) {
      setFileParseError(err.message || 'Failed to parse file.');
      setUploadedFile(null);
    } finally {
      setFileParseLoading(false);
    }
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFileParseError(null);
    setUploadedFile(null);
  };

  const handleScanResume = async (e) => {
    e.preventDefault();
    if (!resumeText.trim() || matchingLoading) return;

    setMatchingLoading(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/resume/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText })
      });

      if (!response.ok) {
        throw new Error('Failed to match resume.');
      }

      const data = await response.json();
      setResumeMatchScores(data.scores || null);
      setMissingSkills(data.missingSkills || null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Error scanning resume. Please make sure the backend is running.');
    } finally {
      setMatchingLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Resume Scan Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4"
            onClick={(e) => { if (e.target === e.currentTarget) handleModalClose(); }}
          >
            <motion.div 
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full relative shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                <button 
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-1.5"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-xl font-bold">AI Resume Scanner</h2>
                </div>
                <p className="text-sm text-blue-100">
                  Upload your resume to instantly match your skills against all career paths.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-100 bg-slate-50">
                <button
                  onClick={() => setResumeTab('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${
                    resumeTab === 'upload'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <UploadCloud size={15} />
                  Upload File
                </button>
                <button
                  onClick={() => setResumeTab('paste')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${
                    resumeTab === 'paste'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Clipboard size={15} />
                  Paste Text
                </button>
              </div>

              <div className="p-6">
                {resumeTab === 'upload' ? (
                  <div className="flex flex-col gap-4">
                    {/* Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                        isDragOver
                          ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                          : uploadedFile
                          ? 'border-green-400 bg-green-50'
                          : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.txt"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      {fileParseLoading ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Loader2 size={24} className="text-blue-600 animate-spin" />
                          </div>
                          <p className="text-sm font-semibold text-blue-700">Reading your resume...</p>
                          <p className="text-xs text-slate-400">Extracting text from PDF</p>
                        </div>
                      ) : uploadedFile ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-green-700">{uploadedFile.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {resumeText.length > 0 ? `${resumeText.length.toLocaleString()} characters extracted` : 'Processing...'}
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setUploadedFile(null); setResumeText(''); setFileParseError(null); }}
                            className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <X size={12} /> Remove file
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                            <FileText size={28} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">Drop your resume here</p>
                            <p className="text-xs text-slate-400 mt-0.5">or click to browse files</p>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-medium">PDF</span>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-medium">TXT</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Error display */}
                    {fileParseError && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                        <AlertCircle size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-red-600">{fileParseError}</p>
                      </div>
                    )}

                    {/* Extracted text preview */}
                    {resumeText && uploadedFile && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-28 overflow-y-auto">
                        <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wide">Extracted Preview</p>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{resumeText.slice(0, 400)}...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <textarea
                      rows={8}
                      placeholder="Paste your skills, experience history, or full resume text here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all resize-none"
                    />
                  </div>
                )}

                <form onSubmit={handleScanResume} className="mt-4">
                  <button
                    type="submit"
                    disabled={matchingLoading || !resumeText.trim()}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {matchingLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Analyzing your resume...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Calculate Career Match Scores
                      </>
                    )}
                  </button>
                  {!resumeText.trim() && (
                    <p className="text-center text-xs text-slate-400 mt-2">
                      {resumeTab === 'upload' ? 'Upload a resume file to continue' : 'Paste your resume text to continue'}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Title */}
      <AnimatedSection className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-bold mb-4">Course & Career <span className="neon-text">Explorer</span></h1>
          <p className="text-slate-500 text-lg">Browse class-appropriate foundational courses, college degrees, and professional career paths.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 text-sm"
        >
          <UploadCloud size={18} />
          Scan Resume with AI
        </button>
      </AnimatedSection>

      {/* AI Recommendation Box */}
      {missingSkills && (
        <AnimatedSection className="w-full mb-8">
          <GlassCard className="border-blue-200 bg-blue-50/50 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl -z-10" />
            <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="text-blue-600" size={18} />
              AI Skills Match Analysis
            </h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Based on your resume, we analyzed your compatibility. To make yourself more competitive for the highest matching fields, focus on adding these key skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map(skill => (
                <span key={skill} className="text-xs bg-blue-100/80 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full font-semibold">
                  + Add {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>
      )}

      {/* Unified Filters Section */}
      <AnimatedSection delay={0.1} className="flex flex-col gap-5 mb-12 relative z-20 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Row 1: Search and Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Search bar */}
          <div className="relative lg:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search courses or careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all"
            />
          </div>
          
          {/* Category Filter Row */}
          <div className="lg:col-span-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-bold text-slate-400 uppercase mr-2 whitespace-nowrap shrink-0">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  selectedCategory === cat 
                    ? 'bg-violet-100 border-violet-400 text-violet-800 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-slate-200/60" />

        {/* Row 2: Stage & Stream Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stage Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-bold text-slate-400 uppercase mr-2 whitespace-nowrap shrink-0">Academic Stage:</span>
            {stages.map(st => (
              <button
                key={st}
                onClick={() => handleStageSelect(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  selectedStageFilter === st 
                    ? 'bg-blue-100 border-blue-400 text-blue-800 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Stream Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-bold text-slate-400 uppercase mr-2 whitespace-nowrap shrink-0">Stream Interest:</span>
            {streams.map(str => (
              <button
                key={str}
                onClick={() => setSelectedStreamFilter(str)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  selectedStreamFilter === str 
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-800 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                {str}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCareers.map((career, i) => {
          const matchScore = resumeMatchScores 
            ? resumeMatchScores[career.id] 
            : (quizMatchScores ? quizMatchScores[career.id] : null);
          const isCompatible = !profile?.stream || profile.stream === 'All' || career.stream === profile.stream;
          const isSaved = profile?.savedCareers?.some(c => c.title === career.title);
          
          return (
            <AnimatedSection key={career.id} delay={0.08 * i}>
              <GlassCard className="h-full flex flex-col cursor-pointer group hover:shadow-lg transition-all" onClick={() => navigate(`/career/${career.id}`)}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-primary group-hover:bg-blue-50 transition-colors shadow-sm">
                    {getCareerIcon(career.id)}
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-2">
                      {matchScore !== null && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          matchScore >= 75 ? 'bg-green-100 text-green-700' : matchScore >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {matchScore}% Match
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-100 shadow-sm">
                        {career.recommendedStage}
                      </span>
                    </div>
                    {/* Stream Compatibility */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isCompatible ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {career.stream} Stream
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors text-slate-900">{career.title}</h3>
                <p className="text-[11px] text-slate-400 mb-6 font-semibold">Job Hubs: {career.cities}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Avg. Indian Salary</span>
                    <span className="font-bold text-green-600">{career.salary}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Stress Level</span>
                    <span className={`font-bold ${career.stress === 'High' || career.stress === 'Extreme' ? 'text-red-400' : 'text-yellow-400'}`}>{career.stress}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Automation Risk</span>
                    <span className="font-bold text-secondary">{career.aiRisk}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Job Demand Trend</span>
                    <span className={`font-bold ${
                      career.demand === 'Very High' || career.demand === 'High' ? 'text-indigo-600' : 'text-slate-600'
                    }`}>{career.demand}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveCareer(career.title, career.id);
                    }}
                    disabled={isSaved}
                    className={`text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm ${
                      isSaved 
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                        : 'bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    <Star size={13} className={isSaved ? 'fill-slate-400' : 'fill-slate-50 hover:fill-indigo-500'} /> 
                    {isSaved ? 'Saved' : 'Save Path'}
                  </button>
                  
                  <span className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 group-hover:translate-x-1 duration-200">
                    View Roadmap <ArrowRight size={14} />
                  </span>
                </div>
              </GlassCard>
            </AnimatedSection>
          );
        })}
      </div>
      
      {filteredCareers.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No courses or careers found matching your criteria.
        </div>
      )}

      {/* AI Career Match Quiz Modal */}
      <AnimatePresence>
        {showCareerQuizModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowCareerQuizModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-800">
                <Sparkles className="text-blue-600" size={24} />
                AI Career Match Quiz
              </h2>
              
              {!quizExplanation ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase font-semibold">Question {currentQuizQuestionIndex + 1} of 10</span>
                    <span className="text-xs text-slate-400 font-bold">{Math.round(((currentQuizQuestionIndex + 1) / 10) * 100)}% Complete</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${((currentQuizQuestionIndex + 1) / 10) * 100}%` }}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 min-h-[50px]">
                    {QUIZ_QUESTIONS[currentQuizQuestionIndex].question}
                  </h3>

                  <div className="flex flex-col gap-3 mb-8">
                    {QUIZ_QUESTIONS[currentQuizQuestionIndex].options.map((option, idx) => {
                      const isSelected = quizAnswers[currentQuizQuestionIndex] === option.text;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            const updated = [...quizAnswers];
                            updated[currentQuizQuestionIndex] = option.text;
                            setQuizAnswers(updated);
                          }}
                          className={`w-full py-3.5 px-5 rounded-xl border text-left text-sm font-semibold transition-all ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50/50 text-blue-800 shadow-sm' 
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {option.text}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <button
                      disabled={currentQuizQuestionIndex === 0}
                      onClick={() => setCurrentQuizQuestionIndex(prev => prev - 1)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs rounded-xl transition-all disabled:opacity-30"
                    >
                      Back
                    </button>
                    
                    {currentQuizQuestionIndex < 9 ? (
                      <button
                        disabled={!quizAnswers[currentQuizQuestionIndex]}
                        onClick={() => setCurrentQuizQuestionIndex(prev => prev + 1)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        disabled={!quizAnswers[currentQuizQuestionIndex] || quizLoading}
                        onClick={async () => {
                          setQuizLoading(true);
                          try {
                            const apiBaseUrl = import.meta.env.VITE_API_URL || '';
                            const response = await fetch(`${apiBaseUrl}/api/quiz/career-match`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ answers: quizAnswers })
                            });
                            if (response.ok) {
                              const data = await response.json();
                              setQuizMatchScores(data.scores);
                              setQuizTopCareerId(data.topCareerId);
                              setQuizExplanation(data.explanation);
                            } else {
                              alert('Failed to calculate matches. Make sure the backend is running.');
                            }
                          } catch (err) {
                            console.error(err);
                            alert('Network error. Check backend server.');
                          } finally {
                            setQuizLoading(false);
                          }
                        }}
                        className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                      >
                        {quizLoading ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            Submit Quiz 🎉
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-500 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Completed!</h3>
                  
                  {/* Explanation card */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left my-6 shadow-inner">
                    <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-sm">
                      <Sparkles size={16} className="text-blue-600" />
                      Top Recommended Fit: {careers.find(c => c.id === quizTopCareerId)?.title || quizTopCareerId}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold mt-2">
                      {quizExplanation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 font-semibold">
                    We have updated the Career Explorer cards with your personality match scores. The best matches are now highlighted!
                  </p>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setShowCareerQuizModal(false)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Browse My Matches
                    </button>
                    <button
                      onClick={() => {
                        setQuizAnswers(Array(10).fill(''));
                        setCurrentQuizQuestionIndex(0);
                        setQuizExplanation(null);
                        setQuizMatchScores(null);
                      }}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerExplorer;
