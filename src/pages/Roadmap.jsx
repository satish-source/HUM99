import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { Award, BookOpen, Code2, Cpu, Rocket, Lock, CheckCircle, Sparkles, RefreshCw, X, AlertCircle } from 'lucide-react';

const ROADMAP_DATA = [
  { 
    id: 1, title: "Foundations", desc: "HTML, CSS, JS Basics", icon: BookOpen,
    challenge: {
      lesson: "Welcome to the web! HTML provides the structure, CSS adds the styling, and JavaScript gives life and logic to your page. Mastering these three is the very first step to becoming a great engineer.",
      question: "Which of the following is NOT a core web technology?",
      options: ["HTML", "Python", "JavaScript", "CSS"],
      correctAnswer: 1
    }
  },
  { 
    id: 2, title: "Frontend Frameworks", desc: "React, Vite, State Management", icon: Code2,
    challenge: {
      lesson: "React lets you build UIs from reusable components. State management allows you to track data changes over time without manually manipulating the DOM.",
      question: "Which hook is used to manage local state in a functional React component?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: 1
    }
  },
  { 
    id: 3, title: "Backend Systems", desc: "Node.js, Databases, APIs", icon: Cpu,
    challenge: {
      lesson: "Backend systems handle business logic, database operations, and secure API endpoints. Without a backend, your app is just a static interface.",
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Instance", "Applied Protocol Interface"],
      correctAnswer: 0
    }
  },
  { 
    id: 4, title: "Security & Auth", desc: "JWT, OAuth, Best Practices", icon: Lock,
    challenge: {
      lesson: "Security is paramount. JWT (JSON Web Tokens) allow stateless authentication between client and server, meaning the server doesn't need to store session data.",
      question: "Where is the safest place to store a JWT on the client side to prevent XSS attacks?",
      options: ["localStorage", "sessionStorage", "HttpOnly Cookies", "Redux Store"],
      correctAnswer: 2
    }
  },
  { 
    id: 5, title: "Full Stack Mastery", desc: "System Design, Architecture", icon: Rocket,
    challenge: {
      lesson: "System design involves scaling applications to handle millions of users using load balancers, caching layers, and microservices.",
      question: "Which technique is used to distribute incoming network traffic across multiple servers?",
      options: ["Database Indexing", "Load Balancing", "Data Sharding", "Memcached"],
      correctAnswer: 1
    }
  },
];

const Roadmap = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('careerverse_progress');
    return saved ? parseInt(saved, 10) : 0; 
  });

  const [justUnlocked, setJustUnlocked] = useState(null);
  
  // Challenge State
  const [activeChallenge, setActiveChallenge] = useState(null); // index of roadmap
  const [selectedOption, setSelectedOption] = useState(null);
  const [challengeState, setChallengeState] = useState('idle'); // 'idle', 'error', 'success'

  useEffect(() => {
    localStorage.setItem('careerverse_progress', progress.toString());
  }, [progress]);

  const handleUnlock = (index) => {
    if (index === progress) {
      setJustUnlocked(index);
      setProgress(prev => prev + 1);
      setTimeout(() => setJustUnlocked(null), 2000);
    }
  };

  const resetProgress = () => {
    setProgress(0);
  };

  const openChallenge = (index) => {
    setActiveChallenge(index);
    setSelectedOption(null);
    setChallengeState('idle');
  };

  const closeChallenge = () => {
    setActiveChallenge(null);
    setTimeout(() => {
      setSelectedOption(null);
      setChallengeState('idle');
    }, 300); // wait for exit animation
  };

  const submitAnswer = () => {
    if (selectedOption === null) return;
    
    const correctIndex = ROADMAP_DATA[activeChallenge].challenge.correctAnswer;
    if (selectedOption === correctIndex) {
      setChallengeState('success');
      setTimeout(() => {
        handleUnlock(activeChallenge);
        closeChallenge();
      }, 1500);
    } else {
      setChallengeState('error');
      setTimeout(() => setChallengeState('idle'), 600);
    }
  };

  const progressPercentage = (progress / ROADMAP_DATA.length) * 100;

  return (
    <div className="flex flex-col max-w-4xl mx-auto relative pb-20">
      
      {/* Challenge Modal Overlay */}
      <AnimatePresence>
        {activeChallenge !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={
                challengeState === 'error' 
                  ? { x: [-10, 10, -10, 10, 0], scale: 1, y: 0 } 
                  : { scale: 1, y: 0 }
              }
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: challengeState === 'error' ? 0.4 : 0.3 }}
              className={`bg-white border rounded-2xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl ${
                challengeState === 'error' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' :
                challengeState === 'success' ? 'border-primary shadow-[0_0_30px_rgba(0,243,255,0.2)]' :
                'border-secondary/50 shadow-[0_0_30px_rgba(188,19,254,0.1)]'
              }`}
            >
              {challengeState !== 'success' && (
                <button onClick={closeChallenge} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
                  <X size={24} />
                </button>
              )}

              {challengeState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h2 className="text-3xl  font-bold mb-2 text-slate-800">Module Passed!</h2>
                  <p className="text-primary">You have successfully mastered this skill.</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-slate-200 text-secondary rounded-xl">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold ">{ROADMAP_DATA[activeChallenge].title} Class</h2>
                      <p className="text-sm text-slate-500">Read the lesson and solve the problem to advance.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 text-slate-600 leading-relaxed text-lg">
                    {ROADMAP_DATA[activeChallenge].challenge.lesson}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <AlertCircle className="text-primary" size={20} />
                      Knowledge Check:
                    </h3>
                    <p className="mb-4 text-lg">{ROADMAP_DATA[activeChallenge].challenge.question}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ROADMAP_DATA[activeChallenge].challenge.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedOption(idx)}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            selectedOption === idx 
                              ? 'bg-slate-200 border-secondary text-slate-800 shadow-[0_0_15px_rgba(188,19,254,0.3)]' 
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:border-white/20 hover:text-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2 text-sm opacity-50">{String.fromCharCode(65 + idx)}.</span> 
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={submitAnswer}
                      disabled={selectedOption === null}
                      className={`px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                        selectedOption === null 
                          ? 'bg-slate-100 text-gray-500 cursor-not-allowed' 
                          : 'bg-blue-100 text-primary border border-primary hover:bg-blue-600 hover:text-slate-800'
                      }`}
                    >
                      Submit Answer <CheckCircle size={18} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedSection className="mb-8 text-center">
        <h1 className="text-5xl  font-bold mb-4">Skill <span className="neon-text">Roadmap</span></h1>
        <p className="text-slate-500">Attend classes and solve problems to unlock your potential.</p>
      </AnimatedSection>

      {/* Global Progress Bar */}
      <AnimatedSection delay={0.1} className="mb-12">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Overall Mastery</span>
          <span className="font-bold text-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-200 p-0.5">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          </motion.div>
        </div>
        {progress === ROADMAP_DATA.length && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-secondary font-bold flex items-center justify-center gap-2"
          >
            <Sparkles /> You have mastered all skills! <Sparkles />
          </motion.div>
        )}
      </AnimatedSection>

      <div className="relative border-l-2 border-slate-200 ml-6 md:ml-12 pl-8 space-y-12 py-4">
        {ROADMAP_DATA.map((m, i) => {
          const isCompleted = i < progress;
          const isActive = i === progress;
          const isLocked = i > progress;
          const IconComponent = m.icon;

          return (
            <AnimatedSection key={m.id} delay={i * 0.1} className="relative">
              {/* Timeline dot */}
              <motion.div 
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                  boxShadow: isActive ? ['0 0 0px #bc13fe', '0 0 20px #bc13fe', '0 0 0px #bc13fe'] : 'none'
                }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                className={`absolute -left-[42px] w-6 h-6 rounded-full border-4 border-darkBg z-10 ${
                  isCompleted ? 'bg-primary shadow-md' : 
                  isActive ? 'bg-secondary' : 'bg-gray-700'
                }`} 
              />

              {/* Vertical line fill effect */}
              {isCompleted && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute -left-[34px] top-6 w-[2px] bg-primary z-0 hidden md:block" 
                  style={{ height: 'calc(100% + 48px)' }}
                />
              )}

              <GlassCard className={`flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-500 ${
                isLocked ? 'opacity-40 grayscale blur-[1px]' : 
                isActive ? 'border-secondary/50 shadow-[0_0_30px_rgba(188,19,254,0.15)] scale-[1.02]' : 
                'border-primary/30 bg-slate-50'
              }`}>
                
                <div className={`p-5 rounded-2xl shrink-0 ${
                  isCompleted ? 'bg-blue-100 text-primary' : 
                  isActive ? 'bg-slate-200 text-secondary' : 'bg-slate-50 text-gray-500'
                }`}>
                  <IconComponent size={32} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{m.title}</h3>
                    {justUnlocked === i && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-secondary flex items-center gap-1 text-sm font-bold bg-slate-200 px-2 py-1 rounded-full"
                      >
                        <Sparkles size={14} /> Unlocked!
                      </motion.span>
                    )}
                  </div>
                  <p className="text-slate-500 mb-4">{m.desc}</p>
                  
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                          <motion.div 
                            initial={{ width: '0%' }} 
                            animate={{ width: '20%' }} // Initial tiny progress to show it's active
                            transition={{ duration: 1 }}
                            className="h-full bg-secondary animate-pulse"
                          />
                        </div>
                        <button 
                          onClick={() => openChallenge(i)}
                          className="px-6 py-2 bg-slate-200 border border-secondary text-secondary font-bold rounded-lg hover:bg-slate-600 hover:text-slate-800 transition-all flex items-center gap-2"
                        >
                          <BookOpen size={18} /> Start Lesson & Challenge
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isCompleted && (
                    <div className="text-primary text-sm font-bold flex items-center gap-2 bg-blue-50 w-max px-4 py-2 rounded-lg">
                      <Award size={18} /> Mastery Achieved
                    </div>
                  )}
                  {isLocked && (
                    <div className="text-gray-500 text-sm font-bold flex items-center gap-2">
                      <Lock size={16} /> Locked (Complete previous modules)
                    </div>
                  )}
                </div>
              </GlassCard>
            </AnimatedSection>
          );
        })}
      </div>

      <div className="flex justify-center mt-16">
        <button 
          onClick={resetProgress}
          className="text-gray-500 hover:text-slate-800 flex items-center gap-2 text-sm transition-colors px-4 py-2 rounded-full hover:bg-slate-50"
        >
          <RefreshCw size={14} /> Reset Roadmap Progress
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
