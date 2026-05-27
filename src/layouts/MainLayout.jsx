import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Compass, BarChart2, User, TrendingUp, MessageSquare } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="min-h-screen relative text-slate-800">
      {/* Realistic Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
      ></div>
      <div className="fixed inset-0 z-0 bg-slate-50/90 backdrop-blur-sm"></div>
      
      {/* Floating Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 glass-panel px-6 py-4 flex justify-between items-center bg-white shadow-sm border border-slate-200 rounded-full">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          CareerVerse
        </Link>
        <div className="hidden md:flex gap-5 items-center font-medium text-slate-600 text-sm">
          <Link to="/explorer" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Compass size={17} /> Explorer
          </Link>
          <Link to="/roadmap" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <BarChart2 size={17} /> Roadmap
          </Link>
          <Link to="/comparison" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <TrendingUp size={17} /> Compare
          </Link>
          <Link to="/mentor" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <MessageSquare size={17} /> AI Mentor
          </Link>
          <Link to="/trends" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <TrendingUp size={17} /> Insights
          </Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <User size={17} /> Profile
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;
