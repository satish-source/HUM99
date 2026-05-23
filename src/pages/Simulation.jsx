import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Clock, AlertTriangle, MessageSquare, CheckCircle, ArrowLeft, Activity } from 'lucide-react';

const Simulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [time, setTime] = useState('09:00 AM');
  const [stressLevel, setStressLevel] = useState(20);
  const [xp, setXp] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Mock Day progression
  const events = [
    { time: '09:00 AM', title: 'Daily Standup', desc: 'Team is waiting for your update.', stressMod: +5, xpMod: +10, choices: ['Report normal progress', 'Mention a blocker you are facing'] },
    { time: '11:30 AM', title: 'Code Review', desc: 'Senior dev left 15 comments on your PR.', stressMod: +20, xpMod: +30, choices: ['Fix them systematically', 'Argue about styling'] },
    { time: '02:15 PM', title: 'Production Bug!', desc: 'Payment gateway is failing for 5% of users.', stressMod: +40, xpMod: +50, choices: ['Rollback deployment immediately', 'Debug the live logs'] },
    { time: '05:00 PM', title: 'End of Day', desc: 'You survived the day.', stressMod: -30, xpMod: +100, choices: ['Log off', 'Work late'] }
  ];

  const handleChoice = (choiceIndex) => {
    const event = events[currentEvent];
    let newStress = stressLevel + event.stressMod;
    if (choiceIndex === 1 && currentEvent === 2) newStress += 20; // Debugging live is stressful!
    if (newStress > 100) newStress = 100;
    if (newStress < 0) newStress = 0;

    setStressLevel(newStress);
    setXp(xp + event.xpMod);

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

  return (
    <div className="flex flex-col min-h-[80vh]">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/explorer')} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl  font-bold capitalize">Simulating: <span className="neon-text">{id}</span></h1>
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
                <h2 className="text-4xl  font-bold mb-4">{events[currentEvent].title}</h2>
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
