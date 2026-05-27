import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StatBadge from '../components/StatBadge';
import AnimatedSection from '../components/AnimatedSection';
import { 
  User, Zap, Star, Shield, Play, Flame, Edit2, X, UploadCloud, 
  Compass, BookOpen, Award, BarChart2, FileText, CheckCircle, Users, MessageSquare, Lock, ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_BADGES = [
  { id: "1", name: "First Explorer", desc: "Explored 1 career path", icon: <Compass size={20} />, color: "from-blue-400 to-blue-600" },
  { id: "2", name: "Roadmap Starter", desc: "Started your first learning roadmap", icon: <BookOpen size={20} />, color: "from-purple-400 to-purple-600" },
  { id: "3", name: "7-Day Streak", desc: "Maintained a 7-day learning streak", icon: <Flame size={20} />, color: "from-orange-400 to-orange-600" },
  { id: "4", name: "Career Saver", desc: "Saved 5 careers of interest", icon: <Star size={20} />, color: "from-yellow-400 to-yellow-600" },
  { id: "5", name: "Quiz Master", desc: "Answered a skill check quiz", icon: <Award size={20} />, color: "from-green-400 to-green-600" },
  { id: "6", name: "Comparison King", desc: "Compared 3 different careers", icon: <BarChart2 size={20} />, color: "from-pink-400 to-pink-600" },
  { id: "7", name: "Resume Ready", desc: "Uploaded resume for AI matching", icon: <FileText size={20} />, color: "from-teal-400 to-teal-600" },
  { id: "8", name: "Path Finder", desc: "Completed all levels of a roadmap", icon: <CheckCircle size={20} />, color: "from-emerald-400 to-emerald-600" },
  { id: "9", name: "Mentor Seeker", desc: "Booked a mentor consultation", icon: <Users size={20} />, color: "from-cyan-400 to-cyan-600" },
  { id: "10", name: "Community Voice", desc: "Participated in QA discussions", icon: <MessageSquare size={20} />, color: "from-red-400 to-red-600" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userProfile, setUserProfile] = useState({
    name: "Alex Pro",
    title: "Future Architect",
    avatar: null,
    xp: 0,
    level: 1,
    streak: 0,
    savedCareers: [],
    unlockedBadges: [],
    grade: "",
    stream: "",
    goal: ""
  });

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  // Fetch profile from backend MongoDB with retry for Render cold-starts
  const fetchProfile = async (retryCount = 0) => {
    try {
      setFetchError(null);
      setLoading(true);
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
      
      const response = await fetch(`${apiBaseUrl}/api/profile`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setEditForm(data);
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (retryCount < 2) {
        // Retry once for Render cold-start (free tier spins down after inactivity)
        setTimeout(() => fetchProfile(retryCount + 1), 3000);
        return;
      }
      setFetchError(err.name === 'AbortError' 
        ? 'Backend is taking too long to respond. It may be waking up from sleep (Render free tier).'
        : 'Could not connect to backend. Please check your deployment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const stats = {
    level: userProfile.level || 1,
    xp: userProfile.xp || 0,
    nextLevel: (userProfile.level || 1) * 500,
    streak: userProfile.streak || 0,
  };

  const savedCareers = userProfile.savedCareers || [];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setEditForm({ ...editForm, avatar: compressedDataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Loading student profile...</h3>
        <p className="text-xs text-slate-500 mt-1">Connecting to MongoDB Atlas</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full relative shadow-xl"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Edit Profile</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-2 border-primary overflow-hidden relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                    {editForm.avatar ? (
                      <img src={editForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-500">
                        <User size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud size={20} className="text-white mb-1" />
                      <span className="text-xs text-white">Upload</span>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Career Title</label>
                  <input 
                    type="text" 
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Academic Stage</label>
                  <select 
                    value={editForm.grade || ''}
                    onChange={(e) => {
                      const newGrade = e.target.value;
                      setEditForm({
                        ...editForm,
                        grade: newGrade,
                        stream: newGrade === 'Class 10' ? 'All' : (editForm.stream === 'All' ? '' : editForm.stream)
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="">Select Stage</option>
                    <option value="Class 10">Class 10 (Deciding Stream)</option>
                    <option value="Class 12">Class 12 (Preparing for College)</option>
                    <option value="College Student">College Student / Graduate</option>
                  </select>
                </div>
                <div>
                  {editForm.grade === 'Class 10' ? (
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 text-xs font-semibold leading-relaxed">
                      Stream is set to <strong className="text-indigo-900">All Streams / Deciding</strong> automatically for Class 10 students to maximize career exploration.
                    </div>
                  ) : (
                    <>
                      <label className="block text-sm text-slate-500 mb-2">Stream Interest</label>
                      <select 
                        value={editForm.stream || ''}
                        onChange={(e) => setEditForm({...editForm, stream: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-primary font-medium"
                      >
                        <option value="">Select Stream</option>
                        <option value="Science">Science (PCM / PCB)</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts & Design">Arts & Design</option>
                      </select>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Primary Goal</label>
                  <select 
                    value={editForm.goal || ''}
                    onChange={(e) => setEditForm({...editForm, goal: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="">Select Goal</option>
                    <option value="Choose Stream">Choose Stream</option>
                    <option value="Choose College">Choose College</option>
                    <option value="Choose Career">Choose Career</option>
                    <option value="Get a Job">Get a Job</option>
                  </select>
                </div>
                
                <button 
                  onClick={saveProfile}
                  className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedSection className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 shrink-0 shadow-md">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-slate-100 overflow-hidden">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-slate-500" />
            )}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <h1 className="text-4xl font-bold text-slate-900">{userProfile.name || "Alex Pro"}</h1>
            <button 
              onClick={() => {
                setEditForm(userProfile);
                setIsEditing(true);
              }} 
              className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-200 transition-all active:scale-90"
              title="Edit Profile"
            >
              <Edit2 size={16} />
            </button>
          </div>
          <p className="text-primary font-semibold mb-1">{userProfile.title || "Future Architect"} • Level {stats.level}</p>
          
          {(!userProfile.grade || !userProfile.stream) ? (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 max-w-xl text-left">
              <div>
                <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  Personalize Your Dashboard
                </h4>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  Configure your academic stage and stream interest to get custom roadmaps, package trackers, and matched courses.
                </p>
              </div>
              <button 
                onClick={() => {
                  setEditForm(userProfile);
                  setIsEditing(true);
                }} 
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 active:scale-95"
              >
                Complete Profile
              </button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm mb-4">
              Stage: <strong className="text-slate-700">{userProfile.grade}</strong> • 
              Stream: <strong className="text-slate-700">{userProfile.stream === 'All' ? 'All / Deciding' : userProfile.stream}</strong>
              {userProfile.goal && (
                <>
                  {' • Goal: '}<strong className="text-slate-700">{userProfile.goal}</strong>
                </>
              )}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <StatBadge label="Total XP" value={stats.xp} icon={<Zap size={14} />} color="primary" />
            <StatBadge label="Day Streak" value={stats.streak} icon={<Flame size={14} />} color="secondary" />
          </div>

          <div className="mt-6 max-w-md">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Level {stats.level}</span>
              <span>{stats.xp} / {stats.nextLevel} XP</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.xp / stats.nextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Saved Careers */}
        <AnimatedSection delay={0.2} className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
            <Star className="text-yellow-500 fill-yellow-500" /> 
            Saved Learning Roadmaps
          </h2>
          <div className="space-y-4">
            {savedCareers.length === 0 ? (
              <div className="flex flex-col justify-center items-center text-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl min-h-[220px]">
                <Compass size={36} className="text-slate-400 mb-3 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-700">No Enrolled Roadmaps Yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-[280px] leading-relaxed mb-4">
                  Browse and enroll in class-wise roadmaps to start tracking your syllabus and career preparation milestones.
                </p>
                <button
                  onClick={() => navigate('/roadmap')}
                  className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  Browse Roadmaps <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              savedCareers.map((c, i) => (
                <GlassCard key={i} className="flex flex-col gap-3 p-5 border-slate-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">{c.title}</h3>
                    <button 
                      onClick={() => {
                        const ids = {
                          "AI Engineer": "ai",
                          "Software Engineer": "swe",
                          "Cloud Architect": "cloud",
                          "UI/UX Designer": "ux",
                          "Cybersecurity Analyst": "cyber",
                          "Game Developer": "game",
                          "Data Scientist": "data",
                          "Foundations of Computer Science": "foundation-cs",
                          "Financial Literacy & Banking": "foundation-finance",
                          "Introduction to Visual Design": "foundation-design",
                          "B.Tech Computer Science (JEE Prep)": "btech-cse",
                          "Bachelor of Computer Applications (BCA)": "bca",
                          "Bachelor of Design (B.Des / NID Prep)": "bdes"
                        };
                        const courseId = ids[c.title] || 'swe';
                        navigate(`/career/${courseId}`);
                      }} 
                      className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      <Play size={12} fill="currentColor" /> Resume
                    </button>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 text-right font-medium">{c.progress}% Simulated</div>
                </GlassCard>
              ))
            )}
          </div>
        </AnimatedSection>

        {/* Right 1 Column: Badges */}
        <AnimatedSection delay={0.3}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
            <Shield className="text-indigo-600" /> 
            Badges Grid
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {ALL_BADGES.map((badge) => {
              const isUnlocked = userProfile.unlockedBadges?.includes(badge.id);
              
              return (
                <div 
                  key={badge.id} 
                  className={`relative rounded-2xl border p-4 flex flex-col items-center text-center transition-all ${
                    isUnlocked 
                      ? 'bg-white border-slate-200 hover:shadow-md hover:-translate-y-0.5' 
                      : 'bg-slate-50/50 border-slate-200 opacity-40 grayscale'
                  }`}
                  title={badge.desc}
                >
                  {/* Lock Indicator */}
                  {!isUnlocked && (
                    <div className="absolute top-2 right-2 text-slate-400">
                      <Lock size={10} />
                    </div>
                  )}
                  
                  {/* Badge Icon */}
                  <div className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center bg-gradient-to-tr ${
                    isUnlocked ? `${badge.color} text-white shadow-sm` : 'bg-slate-100 text-slate-400'
                  }`}>
                    {badge.icon}
                  </div>
                  
                  <span className="text-[10px] font-bold text-slate-800 leading-tight block mb-0.5">
                    {badge.name}
                  </span>
                  <span className="text-[8px] text-slate-400 font-semibold line-clamp-1">
                    {badge.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default UserDashboard;
