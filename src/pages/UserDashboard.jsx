import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StatBadge from '../components/StatBadge';
import AnimatedSection from '../components/AnimatedSection';
import { User, Zap, Star, Shield, Play, Flame, Edit2, X, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Load from local storage or use defaults
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('careerverse_user');
    return saved ? JSON.parse(saved) : {
      name: "Alex Pro",
      title: "Future Architect",
      avatar: null // Will store base64 image
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  const stats = {
    level: 14,
    xp: 4500,
    nextLevel: 5000,
    streak: 12,
  };

  const savedCareers = [
    { title: "AI Engineer", progress: 80 },
    { title: "Cloud Architect", progress: 45 },
  ];

  useEffect(() => {
    try {
      localStorage.setItem('careerverse_user', JSON.stringify(userProfile));
    } catch (e) {
      console.error("Storage error:", e);
      alert("Failed to save profile. The image might be too large.");
    }
  }, [userProfile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas to avoid localStorage limits
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

  const saveProfile = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

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
              <h2 className="text-2xl  font-bold mb-6">Edit Profile</h2>
              
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
                      <UploadCloud size={20} className="text-primary mb-1" />
                      <span className="text-xs text-slate-800">Upload</span>
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
                
                <button 
                  onClick={saveProfile}
                  className="w-full py-3 mt-4 bg-blue-100 border border-primary text-primary font-bold rounded-lg hover:bg-blue-600 hover:text-slate-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedSection className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 p-1 shrink-0">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-darkBg overflow-hidden">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-slate-500" />
            )}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <h1 className="text-4xl  font-bold">{userProfile.name}</h1>
            <button 
              onClick={() => {
                setEditForm(userProfile);
                setIsEditing(true);
              }} 
              className="p-2 bg-slate-50 rounded-full text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors"
              title="Edit Profile"
            >
              <Edit2 size={16} />
            </button>
          </div>
          <p className="text-primary mb-4">{userProfile.title} • Level {stats.level}</p>
          
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
                className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.xp / stats.nextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedSection delay={0.2}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Star className="text-yellow-400" /> Saved Careers</h2>
          <div className="space-y-4">
            {savedCareers.map((c, i) => (
              <GlassCard key={i} className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  <button onClick={() => navigate('/explorer')} className="text-primary hover:text-slate-800 transition-colors">
                    <Play size={20} />
                  </button>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.progress}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 text-right">{c.progress}% Simulated</div>
              </GlassCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Shield className="text-secondary" /> Badges Earned</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((b) => (
              <div key={b} className="aspect-square rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-2 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${b <= 3 ? 'bg-gradient-to-tr from-blue-500/20 to-blue-700/20 text-slate-800' : 'bg-slate-50 text-slate-400'}`}>
                  <Zap size={24} className={b <= 3 ? 'text-primary' : ''} />
                </div>
                <span className={`text-xs text-center font-medium ${b <= 3 ? 'text-slate-600' : 'text-slate-400'}`}>
                  {b <= 3 ? 'Bug Squasher' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default UserDashboard;
