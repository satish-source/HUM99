import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';
import { Sparkles, TrendingUp, ShieldAlert, Zap, Globe, Layers, ArrowRightLeft } from 'lucide-react';

const careersList = [
  { id: 'swe', title: "Software Engineer", salaryVal: 16.5, salaryStr: "₹8L - ₹25L LPA", stressVal: 80, stressStr: "High", aiRiskVal: 30, aiRiskStr: "Low", demandVal: 80, demandStr: "High", cities: "Bengaluru, Pune, Hyderabad" },
  { id: 'ai', title: "AI Engineer", salaryVal: 25.0, salaryStr: "₹12L - ₹38L LPA", stressVal: 85, stressStr: "High", aiRiskVal: 10, aiRiskStr: "Very Low", demandVal: 98, demandStr: "Very High", cities: "Bengaluru, Delhi NCR, Mumbai" },
  { id: 'cyber', title: "Cybersecurity Analyst", salaryVal: 14.5, salaryStr: "₹7L - ₹22L LPA", stressVal: 95, stressStr: "Extreme", aiRiskVal: 20, aiRiskStr: "Low", demandVal: 82, demandStr: "High", cities: "Bengaluru, Mumbai, Chennai" },
  { id: 'cloud', title: "Cloud Architect", salaryVal: 20.0, salaryStr: "₹10L - ₹30L LPA", stressVal: 65, stressStr: "Medium", aiRiskVal: 25, aiRiskStr: "Low", demandVal: 85, demandStr: "High", cities: "Bengaluru, Hyderabad, Pune" },
  { id: 'ux', title: "UI/UX Designer", salaryVal: 12.0, salaryStr: "₹6L - ₹18L LPA", stressVal: 55, stressStr: "Medium", aiRiskVal: 50, aiRiskStr: "Medium", demandVal: 70, demandStr: "Medium", cities: "Mumbai, Bengaluru, Delhi NCR" },
  { id: 'game', title: "Game Developer", salaryVal: 10.5, salaryStr: "₹5L - ₹16L LPA", stressVal: 75, stressStr: "High", aiRiskVal: 45, aiRiskStr: "Medium", demandVal: 65, demandStr: "Medium", cities: "Bengaluru, Hyderabad, Pune" },
  { id: 'data', title: "Data Scientist", salaryVal: 18.5, salaryStr: "₹9L - ₹28L LPA", stressVal: 60, stressStr: "Medium", aiRiskVal: 40, aiRiskStr: "Medium", demandVal: 88, demandStr: "High", cities: "Bengaluru, Mumbai, Gurgaon" }
];

const Comparison = () => {
  const [selectedIds, setSelectedIds] = useState(['swe', 'ai', 'ux']);

  const handleSelectChange = (index, value) => {
    const updated = [...selectedIds];
    updated[index] = value;
    setSelectedIds(updated);
  };

  // Filter selected careers, ignoring duplicates
  const activeCareers = selectedIds
    .map(id => careersList.find(c => c.id === id))
    .filter((c, idx, self) => c && self.findIndex(t => t.id === c.id) === idx);

  // Recharts Salary Data
  const salaryChartData = activeCareers.map(c => ({
    name: c.title,
    midpointSalary: c.salaryVal,
    demand: c.demandVal
  }));

  // Recharts Radar Data (Structure: { subject: 'Stress', CareerA: 80, CareerB: 60 })
  const lifestyleRadarData = [
    { subject: 'Stress Level', ...activeCareers.reduce((acc, c) => ({ ...acc, [c.title]: c.stressVal }), {}) },
    { subject: 'AI Automation Risk', ...activeCareers.reduce((acc, c) => ({ ...acc, [c.title]: c.aiRiskVal }), {}) },
    { subject: 'Future Demand', ...activeCareers.reduce((acc, c) => ({ ...acc, [c.title]: c.demandVal }), {}) },
    { subject: 'Relative Growth', ...activeCareers.reduce((acc, c) => ({ ...acc, [c.title]: Math.round(c.salaryVal * 3) }), {}) },
  ];

  // Radar colors
  const radarColors = ['#3b82f6', '#ec4899', '#10b981'];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <AnimatedSection className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Career <span className="neon-text">Comparison</span> Dashboard</h1>
        <p className="text-slate-500">Pick up to 3 career paths to compare packages, stress indices, and future outlook side-by-side.</p>
      </AnimatedSection>

      {/* Select Selectors Grid */}
      <AnimatedSection className="mb-8 p-6 bg-white/40 border border-slate-200 rounded-3xl backdrop-blur-md shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <ArrowRightLeft size={16} /> Choose Careers to Compare
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map(idx => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500">Career Slot {idx + 1}</label>
              <select
                value={selectedIds[idx] || ''}
                onChange={(e) => handleSelectChange(idx, e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-blue-400 font-semibold shadow-sm text-sm"
              >
                <option value="">None / Hide Slot</option>
                {careersList.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {activeCareers.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
          Please select at least one career path in the slots above to begin comparison.
        </div>
      ) : (
        <>
          {/* Side by side comparison table */}
          <AnimatedSection className="mb-12">
            <GlassCard className="p-0 border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-wider w-[250px]">Metric</th>
                      {activeCareers.map((c, index) => (
                        <th key={c.id} className="p-4 font-bold text-slate-800 text-base border-l border-slate-200 min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: radarColors[index] }} />
                            {c.title}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-700 flex items-center gap-1.5"><Sparkles size={14} className="text-green-500" /> Avg. Salary Package</td>
                      {activeCareers.map(c => (
                        <td key={c.id} className="p-4 font-bold text-green-600 border-l border-slate-200">{c.salaryStr}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-700 flex items-center gap-1.5"><TrendingUp size={14} className="text-blue-500" /> Job Demand Trend</td>
                      {activeCareers.map(c => (
                        <td key={c.id} className="p-4 font-bold text-indigo-700 border-l border-slate-200">{c.demandStr}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-700 flex items-center gap-1.5"><ShieldAlert size={14} className="text-red-500" /> Stress Index</td>
                      {activeCareers.map(c => (
                        <td key={c.id} className="p-4 border-l border-slate-200">
                          <span className={`font-bold ${c.stressStr === 'High' || c.stressStr === 'Extreme' ? 'text-red-500' : 'text-amber-500'}`}>
                            {c.stressStr}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-700 flex items-center gap-1.5"><Zap size={14} className="text-purple-500" /> AI Automation Risk</td>
                      {activeCareers.map(c => (
                        <td key={c.id} className="p-4 font-bold text-purple-700 border-l border-slate-200">{c.aiRiskStr}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-700 flex items-center gap-1.5"><Globe size={14} className="text-slate-500" /> Top Indian Hubs</td>
                      {activeCareers.map(c => (
                        <td key={c.id} className="p-4 font-medium text-slate-600 border-l border-slate-200">{c.cities}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart comparing Salaries */}
            <AnimatedSection>
              <GlassCard className="h-full flex flex-col p-6 border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={20} />
                  Salary vs Job Demand Percentage
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Comparing average midpoint salary (₹ LPA) and estimated market demand percent.</p>
                
                <div className="flex-1 min-h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontWeight={600} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                      <Legend />
                      <Bar dataKey="midpointSalary" name="Avg Midpoint Salary (₹ LPA)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="demand" name="Market Demand Index (%)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Radar Chart comparing lifestyle attributes */}
            <AnimatedSection delay={0.2}>
              <GlassCard className="h-full flex flex-col p-6 border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Layers className="text-pink-500" size={20} />
                  Lifestyle Metrics Comparison
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Polar mapping of relative stress index, AI risk, and future scale (higher is more extreme/riskier).</p>
                
                <div className="flex-1 min-h-[320px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={lifestyleRadarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} fontWeight={600} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                      {activeCareers.map((c, index) => (
                        <Radar 
                          key={c.id} 
                          name={c.title} 
                          dataKey={c.title} 
                          stroke={radarColors[index]} 
                          fill={radarColors[index]} 
                          fillOpacity={0.25} 
                        />
                      ))}
                      <Legend />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </>
      )}
    </div>
  );
};

export default Comparison;
