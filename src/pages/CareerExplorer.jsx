import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StatBadge from '../components/StatBadge';
import AnimatedSection from '../components/AnimatedSection';
import { 
  Search, Filter, ArrowRight, Brain, Code, Shield, Cloud, Palette, Gamepad2, Database,
  UploadCloud, X, Sparkles, Loader2, BookOpen, GraduationCap, Cpu, Landmark, Brush, Monitor, Smartphone, Lock, Star 
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    case 'bdes': return <Palette className="text-pink-650" size={24} />;
    
    case 'swe': return <Code className="text-blue-650" size={24} />;
    case 'ai': return <Brain className="text-violet-600" size={24} />;
    case 'cyber': return <Shield className="text-red-500" size={24} />;
    case 'cloud': return <Cloud className="text-sky-500" size={24} />;
    case 'ux': return <Palette className="text-pink-500" size={24} />;
    case 'game': return <Gamepad2 className="text-green-500" size={24} />;
    case 'data': return <Database className="text-amber-600" size={24} />;
    default: return <Sparkles className="text-blue-500" size={24} />;
  }
};

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                <Sparkles className="text-blue-600" size={24} />
                Scan Resume with AI
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Paste your resume text or experience details. Our AI will analyze your skill profile against all career paths to calculate your match compatibility.
              </p>
              
              <form onSubmit={handleScanResume} className="flex flex-col gap-4">
                <textarea
                  rows={8}
                  placeholder="Paste your skills, experience history, or full resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all resize-none"
                />
                
                <button
                  type="submit"
                  disabled={matchingLoading || !resumeText.trim()}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {matchingLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={18} />
                      Calculate Match Scores
                    </>
                  )}
                </button>
              </form>
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
                    ? 'bg-violet-100 border-violet-400 text-violet-850 shadow-sm' 
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
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-850 shadow-sm' 
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
        {filteredCareers.map((career, i) => {
          const matchScore = resumeMatchScores ? resumeMatchScores[career.id] : null;
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
                        ? 'bg-slate-100 text-slate-400 border border-slate-150 cursor-not-allowed' 
                        : 'bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    <Star size={13} className={isSaved ? 'fill-slate-400' : 'fill-slate-50 hover:fill-indigo-500'} /> 
                    {isSaved ? 'Saved' : 'Save Path'}
                  </button>
                  
                  <span className="text-xs text-blue-650 hover:text-blue-800 font-bold flex items-center gap-1 group-hover:translate-x-1 duration-200">
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
    </div>
  );
};

export default CareerExplorer;
