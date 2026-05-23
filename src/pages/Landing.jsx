import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import NeonButton from '../components/NeonButton';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { Brain, Code, Shield, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const featuredCareers = [
    { title: "AI Engineer", icon: <Brain className="text-secondary" size={32} />, demand: "+45% Growth", salary: "$160k+" },
    { title: "Cybersecurity", icon: <Shield className="text-primary" size={32} />, demand: "+35% Growth", salary: "$130k+" },
    { title: "Full-Stack Dev", icon: <Code className="text-blue-500" size={32} />, demand: "+25% Growth", salary: "$120k+" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center w-full text-center relative mt-10">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-medium text-primary"
        >
          <Sparkles size={16} /> Welcome to the Next Generation Career Platform
        </motion.div>

        <h1 className="text-6xl md:text-8xl  font-extrabold mb-6 leading-tight">
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
        
        <p className="text-xl text-slate-500 max-w-2xl text-center mb-10">
          CareerVerse is an immersive AI-powered simulation platform. Don't just read about careers—step into the shoes of tomorrow's professionals and live a day in their lives.
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

      {/* Stats Section */}
      <AnimatedSection className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
        {[
          { label: "Active Simulations", value: "10,000+", icon: <Users /> },
          { label: "Career Paths", value: "50+", icon: <TrendingUp /> },
          { label: "AI Accuracy", value: "99.8%", icon: <Brain /> },
        ].map((stat, i) => (
          <GlassCard key={i} className="flex flex-col items-center text-center p-8">
            <div className="text-primary mb-4">{stat.icon}</div>
            <h3 className="text-4xl  font-bold mb-2">{stat.value}</h3>
            <p className="text-slate-500">{stat.label}</p>
          </GlassCard>
        ))}
      </AnimatedSection>

      {/* Featured Careers (3D floating effect) */}
      <AnimatedSection className="w-full my-20">
        <h2 className="text-4xl  font-bold text-center mb-12">Trending <span className="neon-text">Future-Proof</span> Careers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCareers.map((career, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotateX: 10, rotateY: -10 }}
              style={{ perspective: 1000 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GlassCard className="h-full flex flex-col items-start p-8 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  {career.icon}
                </div>
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {career.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{career.title}</h3>
                <div className="flex gap-4 w-full text-sm text-slate-600">
                  <div className="bg-slate-50 px-3 py-1 rounded-md">{career.demand}</div>
                  <div className="bg-slate-50 px-3 py-1 rounded-md">{career.salary}</div>
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
