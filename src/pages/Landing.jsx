import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import NeonButton from '../components/NeonButton';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { Brain, Code, Shield, Sparkles, TrendingUp, Users, ArrowRight, UserCheck, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [savingOnboarding, setSavingOnboarding] = useState(false);

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
      }
    } catch (err) {
      console.error('Error saving onboarding:', err);
    } finally {
      setSavingOnboarding(false);
    }
  };

  const featuredCareers = [
    { title: "AI Engineer", icon: <Brain className="text-secondary" size={32} />, demand: "+45% Growth", salary: "₹15L - ₹35L LPA" },
    { title: "Cybersecurity", icon: <Shield className="text-primary" size={32} />, demand: "+35% Growth", salary: "₹10L - ₹28L LPA" },
    { title: "Full-Stack Dev", icon: <Code className="text-blue-500" size={32} />, demand: "+25% Growth", salary: "₹8L - ₹22L LPA" },
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
            onClick={() => navigate('/explorer')}
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
                Tell us your current academic stage and stream to get customized salary ranges, entrance exam trackers, and roadmap matching for the Indian context.
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
                        onClick={() => setSelectedGrade(item.key)}
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
            { title: "Class 10 Student", desc: "Which stream should you choose next? Learn about Science, Commerce, and Arts career pathways.", path: "/explorer", stream: "All" },
            { title: "Class 12 Student", desc: "Find college entrance exams (JEE, NEET, CUET, CLAT), average packages, and degree requirements.", path: "/explorer", stream: "All" },
            { title: "College / Graduate", desc: "Match your resume with AI, take skill quizzes to earn XP, and practice career simulations.", path: "/explorer", stream: "All" }
          ].map((entry, idx) => (
            <GlassCard key={idx} className="hover:shadow-md transition-shadow flex flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{entry.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{entry.desc}</p>
              </div>
              <button 
                onClick={() => navigate(entry.path)}
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

      {/* Featured Careers */}
      <AnimatedSection className="w-full my-16 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-12">Trending <span className="neon-text">High-Demand</span> Careers (India)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCareers.map((career, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GlassCard className="h-full flex flex-col items-start p-8 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  {career.icon}
                </div>
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {career.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{career.title}</h3>
                <div className="flex gap-4 w-full text-xs font-semibold text-slate-600">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">{career.demand}</div>
                  <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg">{career.salary}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Landing;
