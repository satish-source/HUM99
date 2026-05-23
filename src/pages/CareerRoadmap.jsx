import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Circle, Lock, Briefcase, TrendingUp, DollarSign, Clock, 
  ChevronRight, X, Sparkles, Loader2, AlertCircle, PlayCircle, Quote 
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const roadmapData = {
  swe: {
    title: 'Software Engineer',
    color: 'blue',
    description: 'A structured path from beginner developer to engineering leadership in India.',
    totalYears: '8–12 years',
    avgTopSalary: '₹50L - ₹80L+ LPA',
    videoUrl: "https://www.youtube.com/embed/nryz398s85o",
    quote: {
      author: "Rohan Sharma, Tech Lead at CRED (Bengaluru)",
      text: "Master your programming foundations and system design early. Building for 10 million active users in India requires high performance, load balancing, and solid database indexing."
    },
    stages: [
      {
        level: 1,
        title: 'Junior Software Engineer',
        yearsExp: '0–2 years',
        salary: '₹6L – ₹10L LPA',
        description: 'Entry-level. You write code under supervision, fix bugs, and learn the enterprise codebase.',
        skills: ['HTML/CSS', 'JavaScript/Python', 'Git Basics', 'REST APIs', 'SQL Basics'],
      },
      {
        level: 2,
        title: 'Software Engineer (Mid-Level)',
        yearsExp: '2–5 years',
        salary: '₹10L – ₹18L LPA',
        description: 'You independently own features, participate in code reviews, and mentor interns.',
        skills: ['System Design Basics', 'Testing & CI/CD', 'Cloud Services (AWS/GCP)', 'Databases', 'Agile/Scrum'],
      },
      {
        level: 3,
        title: 'Senior Software Engineer',
        yearsExp: '5–8 years',
        salary: '₹18L – ₹32L LPA',
        description: 'You lead technical decisions, architect database models, and design microservices.',
        skills: ['Architecture Patterns', 'Performance Optimization', 'Technical Leadership', 'Cross-team Collaboration'],
      },
      {
        level: 4,
        title: 'Staff Engineer',
        yearsExp: '8–12 years',
        salary: '₹32L – ₹55L LPA',
        description: 'You define engineering strategy across multiple squads and drive tech stack decisions.',
        skills: ['Org-wide Technical Strategy', 'RFC Writing', 'Platform Thinking', 'Stakeholder Management'],
      },
      {
        level: 5,
        title: 'Principal Engineer / Engineering Director',
        yearsExp: '12+ years',
        salary: '₹50L – ₹90L+ LPA',
        description: 'Top of the technical track. You shape organizational culture, product vision, and platform scaling.',
        skills: ['People Management', 'Executive Communication', 'Vision Setting', 'P&L Understanding'],
      },
    ],
  },
  ai: {
    title: 'AI Engineer',
    color: 'violet',
    description: 'From machine learning basics to leading AI research and product development in top tech hubs.',
    totalYears: '6–10 years',
    avgTopSalary: '₹70L - ₹1.5Cr+ LPA',
    videoUrl: "https://www.youtube.com/embed/XmG2d5U2WzY",
    quote: {
      author: "Dr. Ananya Iyer, Principal AI Scientist at Ola Electric",
      text: "AI is moving at lightning speed. Don't just learn how to import models; understand the mathematics behind neural networks, fine-tuning techniques, and cost-efficient MLOps deployment."
    },
    stages: [
      {
        level: 1,
        title: 'Junior ML Engineer / AI Developer',
        yearsExp: '0–2 years',
        salary: '₹8L – ₹14L LPA',
        description: 'Build and fine-tune basic ML models, deploy HuggingFace transformers, and test algorithms.',
        skills: ['Python', 'NumPy/Pandas', 'Scikit-learn', 'TensorFlow/PyTorch', 'Jupyter Notebooks'],
      },
      {
        level: 2,
        title: 'ML Engineer / AI Engineer',
        yearsExp: '2–5 years',
        salary: '₹14L – ₹24L LPA',
        description: 'Train, evaluate, deploy, and scale production ML models and NLP systems.',
        skills: ['Deep Learning', 'MLOps & Pipelines', 'NLP Basics', 'Cloud ML (SageMaker/Vertex)', 'A/B Testing'],
      },
      {
        level: 3,
        title: 'Senior AI Engineer / LLM Specialist',
        yearsExp: '5–8 years',
        salary: '₹24L – ₹45L LPA',
        description: 'Design complex deep learning frameworks, optimize inference costs, and deploy custom GenAI models.',
        skills: ['LLMs & Fine-tuning', 'Reinforcement Learning', 'AI Ethics', 'Vector DBs (Pinecone/Milvus)'],
      },
      {
        level: 4,
        title: 'Lead AI Engineer / AI Architect',
        yearsExp: '8–12 years',
        salary: '₹45L – ₹75L LPA',
        description: 'Architect scalable AI platforms, guide ML engineering best practices, and direct product AI pipelines.',
        skills: ['AI Platform Architecture', 'Team Leadership', 'Product Strategy', 'ML System Design'],
      },
      {
        level: 5,
        title: 'Chief AI Officer / VP of AI',
        yearsExp: '12+ years',
        salary: '₹75L – ₹1.5Cr+ LPA',
        description: 'Executive level. Drive the company\'s overall AI product pipeline, data monetization, and AI security compliance.',
        skills: ['Executive Leadership', 'AI Governance', 'Business Strategy', 'Board Communication'],
      },
    ],
  },
  cyber: {
    title: 'Cybersecurity',
    color: 'red',
    description: 'Defend digital infrastructure at startup and enterprise scales.',
    totalYears: '8–12 years',
    avgTopSalary: '₹40L - ₹75L LPA',
    videoUrl: "https://www.youtube.com/embed/3yZzEaW9Wz0",
    quote: {
      author: "Vikram Sen, Director of Security at Paytm",
      text: "With India's digital payment ecosystem growing exponentially, cybersecurity is a national priority. Learn how to think like a hacker to prevent exploits before they compromise live wallets."
    },
    stages: [
      { level: 1, title: 'Security Analyst (Tier 1)', yearsExp: '0–2 years', salary: '₹5L – ₹8L LPA', description: 'Monitor alerts in the SOC, audit user permissions, and assist in incident reporting.', skills: ['SIEM Tools', 'Network Basics', 'Log Analysis', 'Incident Response', 'CompTIA Security+'] },
      { level: 2, title: 'Security Engineer / Penetration Tester', yearsExp: '2–5 years', salary: '₹8L – ₹15L LPA', description: 'Conduct pen tests, discover vulnerabilities, and secure APIs and servers.', skills: ['Ethical Hacking', 'Metasploit', 'Web App Security (OWASP)', 'Scripting (Python/Bash)', 'CEH'] },
      { level: 3, title: 'Senior Security Engineer', yearsExp: '5–8 years', salary: '₹15L – ₹28L LPA', description: 'Design threat modeling security frameworks and oversee red/blue team simulations.', skills: ['Zero Trust Architecture', 'Cloud Security', 'Threat Modeling', 'SOC Leadership'] },
      { level: 4, title: 'Security Architect', yearsExp: '8–12 years', salary: '₹28L – ₹45L LPA', description: 'Build enterprise risk frameworks, audit compliance, and design security policies.', skills: ['Enterprise Security Design', 'Risk Management', 'Compliance (SOC2, ISO27001)', 'Vendor Auditing'] },
      { level: 5, title: 'CISO / VP of Security', yearsExp: '12+ years', salary: '₹45L – ₹80L+ LPA', description: 'Executive level. Own the entire organization\'s security architecture, breach response, and security budget.', skills: ['Board Reporting', 'Crisis Leadership', 'Compliance', 'Budget Management'] },
    ],
  },
  cloud: {
    title: 'Cloud Architect',
    color: 'sky',
    description: 'Build robust, highly scalable cloud architectures for enterprise web systems.',
    totalYears: '8–12 years',
    avgTopSalary: '₹45L - ₹80L LPA',
    videoUrl: "https://www.youtube.com/embed/l5A3C8Q84-M",
    quote: {
      author: "Sneha Patel, Cloud Lead at Tata Consultancy Services",
      text: "Everything is migrating to the cloud. Focus on Infrastructure as Code (IaC) tools like Terraform and containerization with Kubernetes to stand out in the Indian job market."
    },
    stages: [
      { level: 1, title: 'Cloud Support Engineer', yearsExp: '0–2 years', salary: '₹5L – ₹8L LPA', description: 'Manage accounts, provision simple virtual machines, and audit billing metrics.', skills: ['AWS/Azure/GCP Basics', 'Linux Command Line', 'Terraform Basics', 'Networking Fundamentals'] },
      { level: 2, title: 'Cloud Engineer / DevOps Associate', yearsExp: '2–5 years', salary: '₹8L – ₹15L LPA', description: 'Configure Docker files, set up CI/CD pipelines, and scale databases.', skills: ['Infrastructure as Code', 'Docker & Kubernetes', 'CI/CD Pipelines', 'AWS / Azure'] },
      { level: 3, title: 'Senior DevOps / SRE Engineer', yearsExp: '5–8 years', salary: '₹15L – ₹28L LPA', description: 'Lead automation scripts, optimize infrastructure costs, and manage server uptimes.', skills: ['Multi-cloud Strategy', 'Site Reliability Engineering', 'Platform Engineering', 'Cloud Security'] },
      { level: 4, title: 'Cloud Architect', yearsExp: '8–12 years', salary: '₹28L – ₹48L LPA', description: 'Design secure, scalable cloud architectures across the organization.', skills: ['Enterprise Architecture', 'FinOps (Cost Mgmt)', 'Disaster Recovery', 'Governance'] },
      { level: 5, title: 'Director of Infrastructure / Cloud VP', yearsExp: '12+ years', salary: '₹48L – ₹85L+ LPA', description: 'Head of global infrastructure, cloud migrations, vendor contract negotiations, and DevOps culture.', skills: ['C-Suite Communication', 'Infrastructure Strategy', 'Global Scale Design', 'Vendor Negotiation'] },
    ],
  },
  ux: {
    title: 'UI/UX Designer',
    color: 'pink',
    description: 'Design beautiful, user-centered product experiences for global audiences.',
    totalYears: '6–10 years',
    avgTopSalary: '₹30L - ₹55L LPA',
    videoUrl: "https://www.youtube.com/embed/5Hl3y63V7vA",
    quote: {
      author: "Pooja Mehta, Design Director at Razorpay",
      text: "Design isn't just how it looks; it's how it works. Talk to your users, build wireframes, iterate constantly, and map out clean user journeys to design apps people love."
    },
    stages: [
      { level: 1, title: 'Junior UI/UX Designer', yearsExp: '0–2 years', salary: '₹4.5L – ₹7L LPA', description: 'Create simple icons, wireframes, style guides, and assist in user testing.', skills: ['Figma / Sketch', 'Wireframing', 'User Research Basics', 'Visual Design'] },
      { level: 2, title: 'UI/UX Designer', yearsExp: '2–5 years', salary: '₹7L – ₹14L LPA', description: 'Own product features, coordinate design systems, and run usability tests.', skills: ['Design Systems', 'Prototyping', 'A/B Testing', 'WCAG Accessibility'] },
      { level: 3, title: 'Senior UX Designer', yearsExp: '5–8 years', salary: '₹14L – ₹25L LPA', description: 'Define the product design framework, lead user journeys, and mentor juniors.', skills: ['Product Strategy', 'UX Writing', 'Interaction Design', 'Stakeholder Pitching'] },
      { level: 4, title: 'Principal Designer / Lead Researcher', yearsExp: '8–12 years', salary: '₹25L – ₹42L LPA', description: 'Set design directions across multiple teams, build design-thinking cultures.', skills: ['Design Systems at Scale', 'User Research Methodologies', 'Executive Alignment'] },
      { level: 5, title: 'VP of Design / Chief Design Officer', yearsExp: '12+ years', salary: '₹42L – ₹65L+ LPA', description: 'Shape product brand strategy, direct design organization, and influence company vision.', skills: ['Creative Direction', 'Brand Strategy', 'Design Org Building', 'C-Suite Communication'] },
    ],
  },
  game: {
    title: 'Game Developer',
    color: 'green',
    description: 'Create interactive 2D/3D games using modern engine technologies.',
    totalYears: '8–12 years',
    avgTopSalary: '₹25L - ₹45L LPA',
    videoUrl: "https://www.youtube.com/embed/e_yW6rZ_KzY",
    quote: {
      author: "Amit Kumar, Lead Gameplay Programmer at Ubisoft Pune",
      text: "Game development is highly challenging but deeply rewarding. Build small games in Unity or Unreal Engine, upload them to itch.io, and showcase your physics and scripting math skills."
    },
    stages: [
      { level: 1, title: 'Junior Game Programmer', yearsExp: '0–2 years', salary: '₹4L – ₹7L LPA', description: 'Program simple gameplay triggers, fix UI bugs, and code basic assets.', skills: ['Unity / Unreal Engine', 'C# / C++', 'Game Physics Basics', 'Version Control'] },
      { level: 2, title: 'Gameplay Developer', yearsExp: '2–5 years', salary: '₹7L – ₹12L LPA', description: 'Write gameplay scripts, customize lighting/shaders, and manage multiplayer states.', skills: ['Gameplay Programming', 'Shader Writing (GLSL)', 'AI Pathfinding', 'Multiplayer Basics'] },
      { level: 3, title: 'Senior Game Engineer', yearsExp: '5–8 years', salary: '₹12L – ₹22L LPA', description: 'Optimize engine performance, profile memory usage, and build core game loops.', skills: ['Engine Architecture', 'Performance Profiling', 'Console SDKs (PlayStation/Xbox)'] },
      { level: 4, title: 'Lead Developer / Tech Lead', yearsExp: '8–12 years', salary: '₹22L – ₹35L LPA', description: 'Coordinate engineering squads, handle publisher submissions, and guide coding styles.', skills: ['Team Leadership', 'Project Management', 'Tech Stack Design'] },
      { level: 5, title: 'Technical Director', yearsExp: '12+ years', salary: '₹35L – ₹55L+ LPA', description: 'Define the studio\'s game engines, lead multi-year title architecture, and budget tech resources.', skills: ['Studio Strategy', 'Technology Selection', 'Publisher Relations', 'Creative Direction'] },
    ],
  },
  data: {
    title: 'Data Scientist',
    color: 'amber',
    description: 'Drive data-informed product decisions, analytical frameworks, and ML pipelines.',
    totalYears: '7–11 years',
    avgTopSalary: '₹45L - ₹75L LPA',
    videoUrl: "https://www.youtube.com/embed/KxTLaK41h2I",
    quote: {
      author: "Rashmi Nair, Analytics Director at Swiggy",
      text: "Data science is about solving business problems, not just running code. Learn how to tell a story with data, run clean A/B experiments, and master SQL alongside Python."
    },
    stages: [
      { level: 1, title: 'Junior Data Analyst', yearsExp: '0–2 years', salary: '₹5.5L – ₹9L LPA', description: 'Clean data, build dashboard trackers, write SQL queries, and make charts.', skills: ['Python / R', 'SQL', 'Tableau / PowerBI', 'Basic Statistics'] },
      { level: 2, title: 'Data Scientist', yearsExp: '2–5 years', salary: '₹9L – ₹16L LPA', description: 'Train predictive models, run A/B test experiments, and perform feature engineering.', skills: ['Machine Learning', 'A/B Testing', 'Feature Engineering', 'Big Data (Spark)'] },
      { level: 3, title: 'Senior Data Scientist', yearsExp: '5–8 years', salary: '₹16L – ₹28L LPA', description: 'Lead ML models, perform advanced causal inference, and audit analytics pipelines.', skills: ['Advanced ML', 'Causal Inference', 'MLOps', 'Business Acumen'] },
      { level: 4, title: 'Analytics Lead / Staff Scientist', yearsExp: '8–12 years', salary: '₹28L – ₹48L LPA', description: 'Set business metrics frameworks, direct org-wide data projects, and mentor junior analysts.', skills: ['Metrics Design', 'Data Governance', 'Executive Presentation'] },
      { level: 5, title: 'VP of Data Science / CDO', yearsExp: '12+ years', salary: '₹48L – ₹80L+ LPA', description: 'Executive head of data products, privacy compliance, AI monetization, and global data strategy.', skills: ['Data Product Strategy', 'Data Privacy Compliance', 'Board Reporting', 'Business Scaling'] },
    ],
  },
};

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-600',   dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',   bar: 'from-blue-400 to-blue-600' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', bar: 'from-violet-400 to-violet-600' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-600',    dot: 'bg-red-500',    badge: 'bg-red-100 text-red-700',       bar: 'from-red-400 to-red-600' },
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-200',    text: 'text-sky-600',    dot: 'bg-sky-500',    badge: 'bg-sky-100 text-sky-700',       bar: 'from-sky-400 to-sky-600' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   text: 'text-pink-600',   dot: 'bg-pink-500',   badge: 'bg-pink-100 text-pink-700',     bar: 'from-pink-400 to-pink-600' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-600',  dot: 'bg-green-500',  badge: 'bg-green-100 text-green-700',   bar: 'from-green-400 to-green-600' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  dot: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700',   bar: 'from-amber-400 to-amber-600' },
};

const CareerRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = roadmapData[id];

  // Quiz States
  const [activeSkill, setActiveSkill] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizState, setQuizState] = useState('quiz'); // 'quiz', 'success', 'fail'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Career not found</h2>
        <button onClick={() => navigate('/explorer')} className="text-blue-600 underline">← Back to Explorer</button>
      </div>
    );
  }

  const handleStartQuiz = async (skill) => {
    setActiveSkill(skill);
    setShowQuizModal(true);
    setQuizLoading(true);
    setQuizState('quiz');
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill })
      });
      if (response.ok) {
        const quizData = await response.json();
        setQuizQuestions(quizData);
      } else {
        alert("Failed to load quiz. Make sure the backend is running.");
        setShowQuizModal(false);
      }
    } catch (err) {
      console.error('Quiz fetch error:', err);
      alert("Error generating quiz.");
      setShowQuizModal(false);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSubmit = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    
    const correctIndex = quizQuestions[currentQuizQuestion].answer;
    if (optionIndex === correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
    } else {
      // Final grading
      const finalScore = quizScore;
      if (finalScore >= 2) {
        setQuizState('success');
        handleAwardXP(100);
      } else {
        setQuizState('fail');
      }
    }
  };

  const handleAwardXP = async (amount) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const getRes = await fetch(`${apiBaseUrl}/api/profile`);
      if (getRes.ok) {
        const profile = await getRes.json();
        let newXp = (profile.xp || 0) + amount;
        let newLevel = profile.level || 1;
        const nextLevelThreshold = newLevel * 500;
        
        if (newXp >= nextLevelThreshold) {
          newXp -= nextLevelThreshold;
          newLevel += 1;
        }
        
        await fetch(`${apiBaseUrl}/api/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ xp: newXp, level: newLevel })
        });
      }
    } catch (err) {
      console.error('Error awarding XP:', err);
    }
  };

  const c = colorMap[data.color];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && (
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
              className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowQuizModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={24} />
              </button>
              
              {quizLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                  <h3 className="text-xl font-bold text-slate-800">Generating AI Quiz...</h3>
                  <p className="text-sm text-slate-500">Preparing questions for "{activeSkill}"</p>
                </div>
              ) : quizState === 'quiz' && quizQuestions.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">AI Skill Test: {activeSkill}</span>
                    <span className="text-xs text-slate-400 font-mono">Q: {currentQuizQuestion + 1} / {quizQuestions.length}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-6">{quizQuestions[currentQuizQuestion].question}</h3>
                  
                  <div className="flex flex-col gap-3">
                    {quizQuestions[currentQuizQuestion].options.map((option, idx) => {
                      let btnStyle = "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100";
                      if (isAnswered) {
                        const correctIndex = quizQuestions[currentQuizQuestion].answer;
                        if (idx === correctIndex) {
                          btnStyle = "border-green-300 bg-green-50 text-green-700 font-semibold";
                        } else if (idx === selectedAnswer) {
                          btnStyle = "border-red-300 bg-red-50 text-red-700";
                        } else {
                          btnStyle = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
                        }
                      }
                      
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSubmit(idx)}
                          className={`w-full py-3.5 px-5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  
                  {isAnswered && (
                    <button
                      onClick={handleNextQuestion}
                      className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md"
                    >
                      {currentQuizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  )}
                </div>
              ) : quizState === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Passed! 🎉</h3>
                  <p className="text-slate-500 mb-6">
                    Awesome job! You answered the questions correctly and verified your understanding of **{activeSkill}**.
                  </p>
                  <div className="bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl font-bold mb-6">
                    +100 XP Awarded
                  </div>
                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                  >
                    Continue Journey
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Failed</h3>
                  <p className="text-slate-500 mb-6">
                    You got {quizScore} out of 3 questions correct. You need at least 2 correct answers to pass the skill check.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleStartQuiz(activeSkill)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                    >
                      Retry Quiz
                    </button>
                    <button
                      onClick={() => setShowQuizModal(false)}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <button
        onClick={() => navigate('/explorer')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Career Explorer
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          <span className={c.text}>{data.title}</span> Career Roadmap
        </h1>
        <p className="text-slate-500 text-lg mb-6">{data.description}</p>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { icon: <Clock size={16} />, label: 'Journey Duration', value: data.totalYears },
            { icon: <TrendingUp size={16} />, label: 'Top Indian Salary', value: data.avgTopSalary },
            { icon: <Briefcase size={16} />, label: 'Stages', value: `${data.stages.length} levels` },
          ].map((stat) => (
            <div key={stat.label} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${c.border} ${c.bg}`}>
              <span className={c.text}>{stat.icon}</span>
              <div>
                <div className="text-xs text-slate-400">{stat.label}</div>
                <div className={`text-sm font-bold ${c.text}`}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Media & Community Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Day in the Life Video */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
            <PlayCircle className="text-blue-600" size={20} />
            Day in the Life of a {data.title}
          </h3>
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner">
            <iframe 
              width="100%" 
              height="100%" 
              src={data.videoUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </GlassCard>

        {/* Professional Story */}
        <GlassCard className="p-6 flex flex-col justify-between relative overflow-hidden bg-slate-50">
          <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-20 -z-10">
            <Quote size={100} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
              <Quote className="text-blue-600" size={20} />
              Professional Journey Advice
            </h3>
            <p className="text-sm italic text-slate-600 leading-relaxed mb-6">
              "{data.quote.text}"
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              {data.quote.author.split(' ')[0][0]}{data.quote.author.split(' ')[1] ? data.quote.author.split(' ')[1][0] : ''}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">{data.quote.author}</div>
              <div className="text-[10px] text-slate-400 font-medium">Verified Contributor via LinkedIn</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Roadmap Steps */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 z-0" />

        <div className="space-y-6">
          {data.stages.map((stage, idx) => (
            <motion.div
              key={stage.level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-16"
            >
              {/* Level dot */}
              <div className={`absolute left-0 w-12 h-12 rounded-full ${c.dot} flex items-center justify-center text-white font-bold text-lg shadow-md z-10`}>
                {stage.level}
              </div>

              <GlassCard className={`border ${c.border} hover:shadow-md transition-shadow`}>
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${c.bar} rounded-t-xl -mt-6 -mx-6 mb-4`} style={{width: 'calc(100% + 3rem)', marginLeft: '-1.5rem', marginTop: '-1.5rem', marginBottom: '1rem', borderRadius: '0.75rem 0.75rem 0 0'}} />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>Level {stage.level}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">{stage.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleStartQuiz(skill)}
                          className="text-xs bg-slate-50 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 font-medium active:scale-95"
                          title="Click to take an AI Skill Test!"
                        >
                          <Sparkles size={11} className="text-blue-500 animate-pulse" />
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stats sidebar */}
                  <div className="flex flex-row md:flex-col gap-3 md:gap-2 md:min-w-[160px] shrink-0">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${c.bg} border ${c.border}`}>
                      <Clock size={14} className={c.text} />
                      <div>
                        <div className="text-xs text-slate-400">Experience</div>
                        <div className={`text-xs font-bold ${c.text}`}>{stage.yearsExp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                      <DollarSign size={14} className="text-green-600" />
                      <div>
                        <div className="text-xs text-slate-400">Salary Package</div>
                        <div className="text-xs font-bold text-green-700">{stage.salary}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress arrow to next */}
                {idx < data.stages.length - 1 && (
                  <div className={`flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs ${c.text} font-medium`}>
                    <ChevronRight size={14} />
                    Next: {data.stages[idx + 1].title}
                  </div>
                )}
                {idx === data.stages.length - 1 && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-green-600 font-medium">
                    <CheckCircle2 size={14} />
                    Top of the career ladder! 🎉
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
