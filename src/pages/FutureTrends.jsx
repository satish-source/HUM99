import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, Calendar, BookOpen, GraduationCap, Award, HelpCircle } from 'lucide-react';

const FutureTrends = () => {
  const [activeTab, setActiveTab] = useState('projections'); // 'projections', 'exams', 'streams'

  const trendData = [
    { year: 2025, SWE: 100, AI: 30, AutoRisk: 20 },
    { year: 2028, SWE: 110, AI: 60, AutoRisk: 40 },
    { year: 2030, SWE: 105, AI: 90, AutoRisk: 65 },
    { year: 2032, SWE: 95, AI: 120, AutoRisk: 80 },
    { year: 2035, SWE: 80, AI: 160, AutoRisk: 95 },
  ];

  const exams = [
    { name: "JEE (Joint Entrance Exam)", stream: "Science (PCM)", unlock: "Engineering (IITs, NITs, IIITs, BITS)", timeline: "January & April", prep: "Physics, Chemistry, Mathematics" },
    { name: "NEET (National Eligibility Entrance Test)", stream: "Science (PCB)", unlock: "Medical & Dental (AIIMS, Govt Colleges)", timeline: "May", prep: "Physics, Chemistry, Biology" },
    { name: "UPSC Civil Services Exam", stream: "Any Stream", unlock: "IAS, IPS, IFS Officers (Govt Executive Leadership)", timeline: "Prelims in June, Mains in September", prep: "General Studies, History, Polity, Economics, Optional Subject" },
    { name: "CAT (Common Admission Test)", stream: "Any Stream", unlock: "MBA (IIMs, FMS, Top B-Schools)", timeline: "November", prep: "Quantitative Ability, Data Interpretation, Verbal Ability" },
    { name: "CLAT (Common Law Admission Test)", stream: "Any Stream", unlock: "Integrated LLB/LLM (National Law Universities)", timeline: "December", prep: "English, General Knowledge, Logical & Legal Reasoning" },
    { name: "CUET (Common University Entrance Test)", stream: "Any Stream", unlock: "Undergrad in Central Universities (DU, BHU, JNU)", timeline: "May/June", prep: "Class 12 Domain Subjects, General Aptitude" }
  ];

  const streamsGuide = [
    {
      name: "Science (PCM / PCB)",
      pros: "High career flexibility, unlocks engineering, medical research, artificial intelligence, and aerospace engineering.",
      cons: "Extremely high academic load, intense competition, and demanding entrance examinations (JEE/NEET).",
      careers: "AI Engineer, Software Engineer, Doctor, Cloud Architect, Game Developer"
    },
    {
      name: "Commerce",
      pros: "Outstanding business acumen, direct routes to high-earning financial services, management consulting, and entrepreneurship.",
      cons: "Requires high analytical precision and mathematical affinity for premium roles (Investment Banking, Actuarial).",
      careers: "Chartered Accountant (CA), Product Manager, Investment Banker, Financial Analyst"
    },
    {
      name: "Arts & Humanities / Design",
      pros: "High creative freedom, booming visual UI/UX fields, and the best preparation foundation for civil services exams (UPSC).",
      cons: "Requires portfolio building and networking for design; lacks standard on-campus placement models in conventional courses.",
      careers: "UI/UX Designer, Civil Servant (IAS/IPS), Content Architect, Animator, Corporate Lawyer"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <AnimatedSection className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Future Trends & <span className="neon-text">Student Insights</span></h1>
        <p className="text-slate-500">Predictive job analytics, Indian entrance exam trackers, and stream selection guides.</p>
      </AnimatedSection>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-12 border-b border-slate-200 pb-4">
        {[
          { id: 'projections', label: 'Job Projections', icon: <TrendingUp size={16} /> },
          { id: 'exams', label: 'Indian Exams Tracker', icon: <Calendar size={16} /> },
          { id: 'streams', label: 'Class 10 Stream Guide', icon: <BookOpen size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
              activeTab === tab.id 
                ? 'bg-blue-100 border-blue-400 text-blue-800 shadow-sm' 
                : 'bg-transparent border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'projections' && (
          <motion.div
            key="projections"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Chart */}
            <div className="lg:col-span-2">
              <GlassCard className="h-full flex flex-col">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900"><TrendingUp className="text-primary" /> Job Demand Projection (2025–2035)</h3>
                <div className="flex-1 min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="year" stroke="#475569" />
                      <YAxis stroke="#475569" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(0,243,255,0.3)', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="SWE" stroke="#00f3ff" strokeWidth={3} dot={{ r: 4 }} name="Traditional SWE" />
                      <Line type="monotone" dataKey="AI" stroke="#bc13fe" strokeWidth={3} dot={{ r: 4 }} name="AI Specialists" />
                      <Line type="monotone" dataKey="AutoRisk" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Automation Risk (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>

            {/* Sidebar info */}
            <div className="flex flex-col gap-6">
              <GlassCard className="bg-red-500/5 border-red-500/20">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-red-500"><AlertCircle /> High Automation Risk</h3>
                <ul className="space-y-3 text-sm text-slate-600 font-medium">
                  <li className="flex justify-between"><span>Manual QA Testing</span> <span className="text-red-500">95%</span></li>
                  <li className="flex justify-between"><span>Basic Data Entry</span> <span className="text-red-500">99%</span></li>
                  <li className="flex justify-between"><span>Template Frontends</span> <span className="text-red-500">75%</span></li>
                </ul>
              </GlassCard>
              
              <GlassCard className="bg-primary/5 border-primary/20">
                <h3 className="font-bold flex items-center gap-2 mb-4 text-primary"><TrendingUp /> Future proof Careers</h3>
                <ul className="space-y-3 text-sm text-slate-600 font-medium">
                  <li className="flex justify-between"><span>AI MLOps Integration</span> <span className="text-primary">+400%</span></li>
                  <li className="flex justify-between"><span>Cybersecurity Architect</span> <span className="text-primary">+250%</span></li>
                  <li className="flex justify-between"><span>Neural Interfaces Dev</span> <span className="text-primary">+600%</span></li>
                </ul>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === 'exams' && (
          <motion.div
            key="exams"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {exams.map((exam, idx) => (
              <GlassCard key={idx} className="hover:shadow-md transition-shadow relative overflow-hidden p-6 border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{exam.name}</h3>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                    {exam.stream}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4 text-sm text-slate-600">
                  <div>
                    <strong className="text-slate-800">Unlocks:</strong> {exam.unlock}
                  </div>
                  <div>
                    <strong className="text-slate-800">General Timeline:</strong> {exam.timeline}
                  </div>
                  <div>
                    <strong className="text-slate-800">Key Subjects:</strong> {exam.prep}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-indigo-600">
                  <Award size={14} /> Recommended start: 11th Grade / early 12th Grade
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}

        {activeTab === 'streams' && (
          <motion.div
            key="streams"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {streamsGuide.map((guide, idx) => (
              <GlassCard key={idx} className="p-8 border-slate-200 relative">
                <h3 className="text-2xl font-bold mb-4 text-indigo-900 flex items-center gap-2">
                  <GraduationCap size={24} className="text-indigo-600" />
                  {guide.name} Path
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-green-600 mb-2 flex items-center gap-1.5">
                      <Award size={16} /> Major Strengths & Opportunities
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{guide.pros}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-500 mb-2 flex items-center gap-1.5">
                      <AlertCircle size={16} /> Challenges & Hurdles
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{guide.cons}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2.5">Example High-Demand Careers</h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.careers.split(', ').map(c => (
                      <span key={c} className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FutureTrends;
