import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import NeonButton from '../components/NeonButton';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { Brain, Code, Shield, Sparkles, TrendingUp, Users, ArrowRight, UserCheck, BookOpen, GraduationCap, Cloud, Palette, X, Layers, Clock, Briefcase, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [savingOnboarding, setSavingOnboarding] = useState(false);
  const [activeTrendingCourse, setActiveTrendingCourse] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          if (!data.grade || !data.stream) {
            setShowOnboarding(true);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveOnboarding = async () => {
    if (!selectedGrade || !selectedStream) return;
    setSavingOnboarding(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade: selectedGrade, stream: selectedStream })
      });
      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        setShowOnboarding(false);
        // Direct route to explorer based on onboarding selection
        navigate(`/explorer?stage=${encodeURIComponent(selectedGrade)}`);
      }
    } catch (err) {
      console.error('Error saving onboarding:', err);
    } finally {
      setSavingOnboarding(false);
    }
  };

  const trendingCourses = [
    {
      id: "ai",
      title: "Generative AI & LLM Engineering",
      icon: <Brain className="text-violet-500" size={32} />,
      demand: "+45% Growth",
      salary: "₹12L - ₹38L LPA",
      duration: "6 Months",
      difficulty: "Advanced",
      tools: ["PyTorch", "Transformers", "LangChain", "Pinecone", "vLLM"],
      unlockedRoles: ["AI Engineer", "MLOps Expert", "Prompt Architect"],
      modules: [
        { name: "Module 1: Foundations of Deep Learning", details: "Neural networks, gradient descent, optimization, and PyTorch syntax basics." },
        { name: "Module 2: Transformers & LLMs", details: "Self-attention mechanics, transformer architecture, BERT, and GPT configurations." },
        { name: "Module 3: Retrieval Augmented Generation (RAG)", details: "Vector database indexing (Pinecone, Chroma), semantic search, and document chunking." },
        { name: "Module 4: Fine-Tuning & MLOps", details: "QLoRA parameter-efficient training, model quantization, LLM safety guardrails, and hosting APIs with FastAPI & Docker." }
      ],
      project: "A real-time enterprise contract analyzer parsing 100k+ documents with RAG and LLM agents.",
      careerId: "ai"
    },
    {
      id: "cloud",
      title: "Cloud Native & DevOps SRE",
      icon: <Cloud className="text-sky-500" size={32} />,
      demand: "+35% Growth",
      salary: "₹10L - ₹30L LPA",
      duration: "5 Months",
      difficulty: "Intermediate",
      tools: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "AWS"],
      unlockedRoles: ["Cloud Architect", "Site Reliability Engineer (SRE)", "DevOps Engineer"],
      modules: [
        { name: "Module 1: Virtualization & Linux Command Line", details: "Linux file system permissions, SSH configurations, bash scripting, and networks." },
        { name: "Module 2: Containerization with Docker", details: "Writing multi-stage Dockerfiles, building container images, registry management, and Docker Compose orchestration." },
        { name: "Module 3: Infrastructure as Code (IaC)", details: "Writing declarative Cloud resources in AWS/GCP using HashiCorp Terraform templates." },
        { name: "Module 4: Kubernetes & GitOps Pipelines", details: "Pod scheduling, ingress routing, Helm charts, and continuous deployments using ArgoCD." }
      ],
      project: "Design and deploy a zero-downtime, multi-region Kubernetes cluster hosting a MERN app with active monitoring.",
      careerId: "cloud"
    },
    {
      id: "ux",
      title: "UI/UX Product Design & Prototyping",
      icon: <Palette className="text-pink-500" size={32} />,
      demand: "+25% Growth",
      salary: "₹6L - ₹18L LPA",
      duration: "4 Months",
      difficulty: "Beginner-Friendly",
      tools: ["Figma", "Adobe Illustrator", "Prototyping", "User Interviews", "WCAG"],
      unlockedRoles: ["UI/UX Designer", "Product Designer", "Design Systems Engineer"],
      modules: [
        { name: "Module 1: Design Heuristics & Research", details: "Understanding user goals, conducting interviews, creating user personas, and heuristic evaluation audits." },
        { name: "Module 2: Typography & Grids", details: "Visual hierarchies, grid layout systems, rule of thirds, and color theory physics." },
        { name: "Module 3: Figma Design Systems", details: "Creating reusable component variants, auto-layout constraints, and design tokens." },
        { name: "Module 4: High-Fidelity Interactive Prototypes", details: "Creating realistic micro-interactions, spring animations, transitions, and user testing logs." }
      ],
      project: "Design and research an accessible healthcare mobile application tailored specifically for elderly citizens in India.",
      careerId: "ux"
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Personalized Recommendation Banner */}
      {profile && profile.grade && profile.stream && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl mt-6 px-6 py-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium"
        >
          <div className="flex items-center gap-2.5 text-blue-900">
            <Sparkles size={16} className="text-blue-600 animate-pulse" />
            <span>
              Welcome back, <strong>{profile.name}</strong>! Customized paths for <strong>{profile.grade} ({profile.stream})</strong> are ready.
            </span>
          </div>
          <button 
            onClick={() => navigate(`/explorer?stage=${encodeURIComponent(profile.grade)}&stream=${encodeURIComponent(profile.stream)}`)}
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 font-bold group"
          >
            Explore Curated Careers <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}

      {/* Onboarding Dialog */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mt-8"
          >
            <GlassCard className="border-blue-200 bg-blue-50/50 p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl -z-10" />
              
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900">
                <UserCheck className="text-blue-600" size={24} />
                Personalize Your Career Journey
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Tell us your current academic stage to unlock custom salary ranges, entrance exam trackers, and roadmap matching for the Indian context.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Academic Stage */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-600" />
                    1. What is your current academic stage?
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { key: 'Class 10', label: 'Class 10 (Deciding Stream)' },
                      { key: 'Class 12', label: 'Class 12 (Preparing for College)' },
                      { key: 'College Student', label: 'College Student / Graduate' }
                    ].map(item => (
                      <button
                        key={item.key}
                        onClick={() => {
                          setSelectedGrade(item.key);
                          if (item.key === 'Class 10') {
                            setSelectedStream('All');
                          } else if (selectedStream === 'All') {
                            setSelectedStream('');
                          }
                        }}
                        className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                          selectedGrade === item.key 
                            ? 'bg-blue-100 border-blue-500 text-blue-800' 
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stream Interest */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-600" />
                    2. Select your stream / field of interest:
                  </label>
                  {selectedGrade === 'Class 10' ? (
                    <div className="flex flex-col justify-center items-center h-full text-center p-6 bg-indigo-50 border border-dashed border-indigo-200 rounded-xl min-h-[160px]">
                      <Sparkles className="text-indigo-600 mb-2 animate-pulse" size={28} />
                      <span className="text-sm font-bold text-indigo-900">Explore All Streams</span>
                      <p className="text-xs text-indigo-600/80 mt-1 max-w-[280px]">
                        Class 10 students explore Science, Commerce, and Arts paths together to make the best stream choice.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {[
                        { key: 'Science', label: 'Science (PCM / PCB)' },
                        { key: 'Commerce', label: 'Commerce (Finance / Business)' },
                        { key: 'Arts & Design', label: 'Arts & Humanities / Design' }
                      ].map(item => (
                        <button
                          key={item.key}
                          onClick={() => setSelectedStream(item.key)}
                          className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                            selectedStream === item.key 
                              ? 'bg-blue-100 border-blue-500 text-blue-800' 
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveOnboarding}
                  disabled={!selectedGrade || !selectedStream || savingOnboarding}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md disabled:opacity-50 text-sm"
                >
                  {savingOnboarding ? 'Saving Preference...' : 'Apply Personalization'}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center w-full text-center relative mt-10">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-medium text-primary border border-slate-200 bg-white"
        >
          <Sparkles size={16} /> Welcome to the Next Generation Career Platform
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
          Experience Your <br />
          <span className="neon-text">
            <TypeAnimation
              sequence={[
                'Future', 2000,
                'Career', 2000,
                'Destiny', 2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </span> <br />
          Before Choosing It.
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl text-center mb-10 leading-relaxed">
          CareerVerse is an immersive AI-powered career counselor. Walk step-by-step through interactive paths, scan your resume, and experience a day-in-the-life before deciding.
        </p>
        
        <div className="flex gap-6">
          <NeonButton variant="primary" onClick={() => navigate('/explorer')}>
            Start Exploring
          </NeonButton>
          <NeonButton variant="secondary" onClick={() => navigate('/mentor')}>
            Ask AI Mentor
          </NeonButton>
        </div>
      </section>

      {/* Entry Point Grid */}
      <AnimatedSection className="w-full my-10 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">Curated entry points for your <span className="neon-text">current stage</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Class 10 Student", desc: "Which stream should you choose next? Learn about Science, Commerce, and Arts career pathways.", path: "/explorer", stage: "Class 10" },
            { title: "Class 12 Student", desc: "Find college entrance exams (JEE, NEET, CUET, CLAT), average packages, and degree requirements.", path: "/explorer", stage: "Class 12" },
            { title: "College / Graduate", desc: "Match your resume with AI, take skill quizzes to earn XP, and practice career simulations.", path: "/explorer", stage: "College Student" }
          ].map((entry, idx) => (
            <GlassCard key={idx} className="hover:shadow-md transition-shadow flex flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{entry.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{entry.desc}</p>
              </div>
              <button 
                onClick={() => navigate(`${entry.path}?stage=${encodeURIComponent(entry.stage)}`)}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 self-start group"
              >
                Start Exploring <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </GlassCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 my-16 max-w-5xl">
        {[
          { label: "Active Simulations", value: "10,000+", icon: <Users size={28} /> },
          { label: "Curated Careers", value: "7 Major Paths", icon: <TrendingUp size={28} /> },
          { label: "AI Guidance Accuracy", value: "99.8%", icon: <Brain size={28} /> },
        ].map((stat, i) => (
          <GlassCard key={i} className="flex flex-col items-center text-center p-8">
            <div className="text-primary mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-bold mb-2 text-slate-900">{stat.value}</h3>
            <p className="text-slate-500">{stat.label}</p>
          </GlassCard>
        ))}
      </AnimatedSection>

      {/* Trending Skills In High Demand Section */}
      <AnimatedSection className="w-full my-16 max-w-5xl relative">
        <h2 className="text-4xl font-bold text-center mb-4">Trending <span className="neon-text">High-Demand</span> Courses (India)</h2>
        <p className="text-center text-slate-500 mb-12">Click a course card below to explore its exact module curriculum, tools, capstones, and average packages.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {trendingCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setActiveTrendingCourse(activeTrendingCourse?.id === course.id ? null : course)}
              className="cursor-pointer"
            >
              <GlassCard className={`h-full flex flex-col items-start p-8 relative overflow-hidden group transition-all ${activeTrendingCourse?.id === course.id ? 'border-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-slate-50' : 'border-slate-200'}`}>
                <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  {course.icon}
                </div>
                <div className="mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{course.title}</h3>
                
                <div className="flex flex-wrap gap-2.5 w-full text-xs font-semibold text-slate-600 mb-6">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <TrendingUp size={12} /> {course.demand}
                  </div>
                  <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">
                    {course.salary}
                  </div>
                </div>

                <div className="mt-auto text-xs font-bold text-blue-600 flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                  {activeTrendingCourse?.id === course.id ? 'Close Details' : 'View Course Curriculum'} <ArrowRight size={14} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Detailed Curriculum Expandable Area */}
        <AnimatePresence>
          {activeTrendingCourse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full overflow-hidden mt-6"
            >
              <GlassCard className="border-blue-200 bg-blue-50/30 p-8 relative">
                <button 
                  onClick={() => setActiveTrendingCourse(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column: Summary Info */}
                  <div className="lg:w-1/3 border-r border-slate-200/50 pr-0 lg:pr-8">
                    <div className="flex items-center gap-3 mb-4">
                      {activeTrendingCourse.icon}
                      <h3 className="text-2xl font-bold text-slate-900">{activeTrendingCourse.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">
                      Explore this high-demand Indian career pathway. Follow the structured step-by-step curriculum to unlock top opportunities.
                    </p>

                    <div className="space-y-4 mb-6 text-sm font-semibold">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-500">Duration</span>
                        <span className="text-slate-800">{activeTrendingCourse.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-500">Difficulty</span>
                        <span className="text-slate-800">{activeTrendingCourse.difficulty}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-500">Avg Package</span>
                        <span className="text-green-600 font-bold">{activeTrendingCourse.salary}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Key Tools Taught</span>
                      <div className="flex flex-wrap gap-2">
                        {activeTrendingCourse.tools.map(tool => (
                          <span key={tool} className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Unlocked Roles</span>
                      <div className="flex flex-wrap gap-2">
                        {activeTrendingCourse.unlockedRoles.map(role => (
                          <span key={role} className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md font-semibold">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Curriculum Modules & Projects */}
                  <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-blue-600" />
                        Course Curriculum & Modules
                      </h4>
                      <div className="space-y-4 mb-6">
                        {activeTrendingCourse.modules.map((mod, index) => (
                          <div key={index} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex items-start gap-3.5">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 text-sm mb-1">{mod.name}</h5>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">{mod.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-green-50/50 border border-green-150 rounded-xl mb-6">
                        <h5 className="font-bold text-green-800 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Code size={14} /> Real-World Capstone Project
                        </h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {activeTrendingCourse.project}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200/50">
                      <NeonButton 
                        variant="primary" 
                        onClick={() => navigate(`/career/${activeTrendingCourse.careerId}`)}
                        className="flex items-center gap-2"
                      >
                        Enroll & View Full Interactive Roadmap <ArrowRight size={16} />
                      </NeonButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedSection>
    </div>
  );
};

export default Landing;

