import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { 
  Award, BookOpen, GraduationCap, Briefcase, Sparkles, 
  ArrowRight, Compass, Flame, PlayCircle, Star, Target, RefreshCw
} from 'lucide-react';

const roadmapList = [
  // Class 10 Foundation
  { id: 'foundation-cs', title: "Foundations of Computer Science", stage: "Class 10", category: "Foundation", desc: "Learn logic, binary arithmetic, block programming, and basic Python syntax.", duration: "1 Year", icon: <BookOpen size={22} />, color: "blue", reward: "Skill Certificate" },
  { id: 'foundation-finance', title: "Financial Literacy & Banking", stage: "Class 10", category: "Foundation", desc: "Understand compound interest, banking statements, UPI safety, and stock market basics.", duration: "1 Year", icon: <BookOpen size={22} />, color: "amber", reward: "Skill Certificate" },
  { id: 'foundation-design', title: "Introduction to Visual Design", stage: "Class 10", category: "Foundation", desc: "Explore color theory, rule of thirds, typography, and basic layouts in Figma.", duration: "1 Year", icon: <BookOpen size={22} />, color: "pink", reward: "Skill Certificate" },

  // Class 12 Prep & Degrees
  { id: 'btech-cse', title: "B.Tech Computer Science (JEE Prep)", stage: "Class 12", category: "Degree", desc: "Prepare for JEE Main/Advanced and study OOPs, relational databases, and data structures.", duration: "4 Years", icon: <GraduationCap size={22} />, color: "blue", reward: "B.Tech Degree" },
  { id: 'bca', title: "Bachelor of Computer Applications (BCA)", stage: "Class 12", category: "Degree", desc: "Practical software dev pathways, web scripting languages, Java, and MERN projects.", duration: "3 Years", icon: <GraduationCap size={22} />, color: "sky", reward: "BCA Degree" },
  { id: 'bdes', title: "Bachelor of Design (B.Des / NID Prep)", stage: "Class 12", category: "Degree", desc: "Prepare for NID/NIFT and master UX wireframing, physical materials, and page layouts.", duration: "4 Years", icon: <GraduationCap size={22} />, color: "pink", reward: "B.Des Degree" },

  // College / Professional Careers
  { id: 'swe', title: "Software Engineer", stage: "College Student", category: "Engineering", desc: "A detailed engineering pathway from junior programmer to Staff Engineer / Tech Director.", duration: "8-12 Years", icon: <Briefcase size={22} />, color: "blue", reward: "₹50L - ₹80L+ LPA" },
  { id: 'ai', title: "AI Engineer", stage: "College Student", category: "Engineering", desc: "Deep neural networks, HuggingFace transformers, QLoRA fine-tuning, and scalable MLOps architectures.", duration: "6-10 Years", icon: <Briefcase size={22} />, color: "violet", reward: "₹70L - ₹1.5Cr+ LPA" },
  { id: 'cyber', title: "Cybersecurity Analyst", stage: "College Student", category: "Security", desc: "SOC logs, Wireshark filters, penetration test models, ethical hacking, and CISO governance.", duration: "8-12 Years", icon: <Briefcase size={22} />, color: "red", reward: "₹40L - ₹75L LPA" },
  { id: 'cloud', title: "Cloud Architect", stage: "College Student", category: "Infrastructure", desc: "VPC networking, Docker containers, Kubernetes scheduling, Terraform configurations, and FinOps.", duration: "8-12 Years", icon: <Briefcase size={22} />, color: "sky", reward: "₹45L - ₹80L LPA" },
  { id: 'ux', title: "UI/UX Designer", stage: "College Student", category: "Design", desc: "Design high-fidelity interactive prototypes, user journey diagrams, systems, and accessibility audits.", duration: "6-10 Years", icon: <Briefcase size={22} />, color: "pink", reward: "₹30L - ₹55L LPA" },
  { id: 'game', title: "Game Developer", stage: "College Student", category: "Engineering", desc: "Script physics and animations in Unity/Unreal Engine, program gameplay loops, and publish games.", duration: "8-12 Years", icon: <Briefcase size={22} />, color: "green", reward: "₹25L - ₹45L LPA" },
  { id: 'data', title: "Data Scientist", stage: "College Student", category: "Data", desc: "Run regressions, configure feature engineering matrices, conduct A/B testing models, and lead big data pipelines.", duration: "7-11 Years", icon: <Briefcase size={22} />, color: "amber", reward: "₹45L - ₹75L LPA" },
];

const colorClasses = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-600',   dot: 'bg-blue-500' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', dot: 'bg-violet-500' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-600',    dot: 'bg-red-500' },
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-200',    text: 'text-sky-600',    dot: 'bg-sky-500' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   text: 'text-pink-600',   dot: 'bg-pink-500' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-600',  dot: 'bg-green-500' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  dot: 'bg-amber-500' },
};

const Roadmap = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Class 10', 'Class 12', 'College Student'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          if (data.grade) {
            setActiveTab(data.grade);
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEnroll = async (courseTitle, courseId) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      
      // Fetch profile to get current list
      const getRes = await fetch(`${apiBaseUrl}/api/profile`);
      if (getRes.ok) {
        const currentProfile = await getRes.json();
        const currentSaved = currentProfile.savedCareers || [];
        
        // Check if already enrolled
        const exists = currentSaved.some(c => c.title === courseTitle);
        if (!exists) {
          const updatedSaved = [...currentSaved, { title: courseTitle, progress: 10 }];
          
          await fetch(`${apiBaseUrl}/api/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ savedCareers: updatedSaved })
          });
        }
      }
      
      // Navigate to detailed roadmap
      navigate(`/career/${courseId}`);
    } catch (err) {
      console.error('Enrollment error:', err);
      navigate(`/career/${courseId}`);
    }
  };

  const activeRoadmaps = profile?.savedCareers || [];

  const filteredRoadmaps = roadmapList.filter(roadmap => {
    return activeTab === 'All' || roadmap.stage === activeTab;
  });

  return (
    <div className="flex flex-col max-w-5xl mx-auto relative pb-20">
      <AnimatedSection className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Course & Career <span className="neon-text">Roadmaps</span></h1>
        <p className="text-slate-500">Structured academic degree guides, exam schedules, and professional career ladders.</p>
      </AnimatedSection>

      {/* User's Enrolled Roadmaps Section */}
      {activeRoadmaps.length > 0 && (
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="text-blue-600" />
            Your Active Enrolled Roadmaps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeRoadmaps.map((enrolled, index) => {
              // Find local data for this enrolled title
              const localData = roadmapList.find(r => r.title === enrolled.title);
              const c = localData ? colorClasses[localData.color] : colorClasses.blue;
              const courseId = localData ? localData.id : 'swe';

              return (
                <GlassCard key={index} className={`border ${c.border} p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    {localData?.icon || <Star size={24} />}
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${c.text} ${c.bg}`}>
                        {localData?.stage || 'Professional'}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">{enrolled.progress}% Done</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{enrolled.title}</h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{localData?.desc}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                        initial={{ width: 0 }}
                        animate={{ width: `${enrolled.progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/career/${courseId}`)}
                    className="w-full py-2.5 bg-blue-100 hover:bg-blue-600 hover:text-slate-800 text-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-primary/20"
                  >
                    <PlayCircle size={16} /> Continue Learning Path
                  </button>
                </GlassCard>
              );
            })}
          </div>
        </AnimatedSection>
      )}

      {/* Stage Selector Tabs */}
      <AnimatedSection className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Compass className="text-indigo-600" />
          Explore Class-Specific Career Roadmaps
        </h2>
        <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
          {[
            { id: 'All', label: 'All Roadmaps', count: roadmapList.length },
            { id: 'Class 10', label: 'Class 10 Foundations', count: 3 },
            { id: 'Class 12', label: 'Class 12 Degrees & Prep', count: 3 },
            { id: 'College Student', label: 'College & Professional', count: 7 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                activeTab === tab.id 
                  ? 'bg-blue-100 border-blue-400 text-blue-800 shadow-sm' 
                  : 'bg-transparent border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60 font-semibold bg-white border border-slate-200 rounded px-1 text-slate-600">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map((roadmap, index) => {
          const c = colorClasses[roadmap.color] || colorClasses.blue;
          
          return (
            <AnimatedSection key={roadmap.id} delay={index * 0.05}>
              <GlassCard className="h-full flex flex-col justify-between hover:shadow-md transition-shadow border-slate-200 relative group">
                <div className="absolute top-4 right-4 text-slate-350 opacity-20 group-hover:opacity-40 transition-opacity">
                  {roadmap.icon}
                </div>
                <div>
                  <div className="flex gap-2 items-center mb-4">
                    <div className={`p-2 rounded-lg ${c.bg} ${c.text} border ${c.border}`}>
                      {roadmap.icon}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-500 uppercase">
                      {roadmap.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {roadmap.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed line-clamp-3">
                    {roadmap.desc}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Stage</span>
                      <span className="text-slate-800">{roadmap.stage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Est. Duration</span>
                      <span className="text-slate-800">{roadmap.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Package / Reward</span>
                      <span className="text-green-600 font-bold">{roadmap.reward}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleEnroll(roadmap.title, roadmap.id)}
                  className="w-full py-2.5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-slate-800 text-slate-600 font-bold rounded-xl border border-slate-200 group-hover:border-primary transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                >
                  View Roadmaps & Tools <ArrowRight size={14} />
                </button>
              </GlassCard>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
