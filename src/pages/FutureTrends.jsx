import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp } from 'lucide-react';

const FutureTrends = () => {
  const trendData = [
    { year: 2025, SWE: 100, AI: 30, AutoRisk: 20 },
    { year: 2028, SWE: 110, AI: 60, AutoRisk: 40 },
    { year: 2030, SWE: 105, AI: 90, AutoRisk: 65 },
    { year: 2032, SWE: 95, AI: 120, AutoRisk: 80 },
    { year: 2035, SWE: 80, AI: 160, AutoRisk: 95 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedSection className="mb-12 text-center">
        <h1 className="text-5xl  font-bold mb-4">2035 <span className="neon-text">Future Trends</span></h1>
        <p className="text-slate-500">Predictive analytics on the future of work.</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnimatedSection className="lg:col-span-2">
          <GlassCard className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-primary" /> Job Demand Projection</h3>
            <div className="flex-1 min-h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="year" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(0,243,255,0.3)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="SWE" stroke="#00f3ff" strokeWidth={3} dot={{ r: 4 }} name="Traditional SWE" />
                  <Line type="monotone" dataKey="AI" stroke="#bc13fe" strokeWidth={3} dot={{ r: 4 }} name="AI Specialists" />
                  <Line type="monotone" dataKey="AutoRisk" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Automation Risk (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          <AnimatedSection delay={0.2}>
            <GlassCard className="bg-red-500/5 border-red-500/20">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-red-400"><AlertCircle /> High Risk Careers</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex justify-between"><span>Manual QA</span> <span className="text-red-400">95%</span></li>
                <li className="flex justify-between"><span>Basic Data Entry</span> <span className="text-red-400">99%</span></li>
                <li className="flex justify-between"><span>Entry-Level Coders</span> <span className="text-red-400">75%</span></li>
              </ul>
            </GlassCard>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4}>
            <GlassCard className="bg-primary/5 border-primary/20">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-primary"><TrendingUp /> Exponential Growth</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex justify-between"><span>AI Integration Eng.</span> <span className="text-primary">+400%</span></li>
                <li className="flex justify-between"><span>Prompt Architect</span> <span className="text-primary">+250%</span></li>
                <li className="flex justify-between"><span>Neuro-Tech Dev</span> <span className="text-primary">+600%</span></li>
              </ul>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default FutureTrends;
