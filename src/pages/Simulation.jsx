import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Clock, AlertTriangle, MessageSquare, CheckCircle, ArrowLeft, Activity, Loader2 } from 'lucide-react';

const careerNames = {
  swe: "Software Engineer",
  ai: "AI Engineer",
  cyber: "Cybersecurity Analyst",
  cloud: "Cloud Architect",
  ux: "UI/UX Designer",
  game: "Game Developer",
  data: "Data Scientist"
};

const Simulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  
  const [time, setTime] = useState('09:00 AM');
  const [stressLevel, setStressLevel] = useState(20);
  const [xp, setXp] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const careerName = careerNames[id] || id;

  // Fetch dynamic simulation from Gemini API backend
  useEffect(() => {
    const fetchSimulation = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/simulation/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ career: careerName })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate simulation. Make sure the backend is running.');
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid simulation data received.');
        }
        
        setEvents(data);
        setTime(data[0].time);
      } catch (err) {
        console.error('Simulation generation error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSimulation();
  }, [id, careerName]);

  const handleChoice = (choiceIndex) => {
    const event = events[currentEvent];
    if (!event) return;

    // Use choice-specific modifiers if they exist, otherwise fallback
    const stressMod = choiceIndex === 0 ? event.stressMod : (event.stressModAlt !== undefined ? event.stressModAlt : event.stressMod);
    const xpMod = choiceIndex === 0 ? event.xpMod : (event.xpModAlt !== undefined ? event.xpModAlt : event.xpMod);

    let newStress = stressLevel + stressMod;
    if (newStress > 100) newStress = 100;
    if (newStress < 0) newStress = 0;

    setStressLevel(newStress);
    setXp(xp + xpMod);

    addNotification(`Action taken: ${event.choices[choiceIndex]}`);

    if (currentEvent < events.length - 1) {
      setTimeout(() => {
        setCurrentEvent(prev => prev + 1);
        setTime(events[currentEvent + 1].time);
      }, 1000);
    }
  };

  const addNotification = (text) => {
    const newNotif = { id: Date.now(), text };
    setNotifications(prev => [newNotif, ...prev].slice(0, 4));
  };

  // Stress color indicator
  const getStressColor = () => {
    if (stressLevel < 40) return 'bg-green-500 shadow-[0_0_10px_#22c55e]';
    if (stressLevel < 70) return 'bg-yellow-500 shadow-[0_0_10px_#eab308]';
    return 'bg-red-500 shadow-[0_0_10px_#ef4444] text-slate-800 animate-pulse';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Generating AI Simulation...</h2>
        <p className="text-slate-500">Nova AI is crafting your customized simulation for {careerName}.</p>
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulation Generation Failed</h2>
        <p className="text-slate-500 mb-6">{error || 'Could not fetch simulation data.'}</p>
        <button onClick={() => navigate('/explorer')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
          Back to Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[80vh]">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/explorer')} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold capitalize">Simulating: <span className="neon-text">{careerName}</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Simulation Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard className="flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: 0 }} 
                animate={{ width: `${((currentEvent + 1) / events.length) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center mb-8 mt-4">
              <div className="flex items-center gap-2 text-2xl font-mono font-bold text-secondary">
                <Clock /> {time}
              </div>
              <div className="flex items-center gap-2 font-bold">
                XP: <span className="text-primary">{xp}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-center items-center text-center p-8"
              >
                <div className={`p-4 rounded-full mb-6 ${currentEvent === 2 ? 'bg-red-500/20 text-red-500' : 'bg-blue-50 text-primary'}`}>
                  {currentEvent === 2 ? <AlertTriangle size={48} /> : <CheckCircle size={48} />}
                </div>
                <h2 className="text-4xl font-bold mb-4">{events[currentEvent].title}</h2>
                <p className="text-xl text-slate-500 mb-12">{events[currentEvent].desc}</p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  {events[currentEvent].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(idx)}
                      className="flex-1 py-4 px-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-100 hover:border-primary transition-all font-semibold"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Sidebar / Dashboard */}
        <div className="flex flex-col gap-6">
          {/* Vitals */}
          <GlassCard>
            <h3 className="font-bold flex items-center gap-2 mb-6"><Activity size={18} /> Vitals</h3>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">Stress Level</span>
              <span className="font-bold">{stressLevel}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full transition-colors duration-500 ${getStressColor()}`} 
                animate={{ width: `${stressLevel}%` }}
              />
            </div>
          </GlassCard>

          {/* Notifications */}
          <GlassCard className="flex-1 flex flex-col">
            <h3 className="font-bold flex items-center gap-2 mb-6"><MessageSquare size={18} /> Live Feed</h3>
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
              <AnimatePresence>
                {notifications.map(n => (
                  <motion.div 
                    key={n.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm flex gap-3 items-start"
                  >
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
                    <p className="text-slate-600">{n.text}</p>
                  </motion.div>
                ))}
                {notifications.length === 0 && (
                  <div className="text-gray-500 text-sm text-center py-4">No recent activity.</div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
