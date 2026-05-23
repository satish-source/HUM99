import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';

const Comparison = () => {
  const salaryData = [
    { name: 'AI Eng', salary: 160, demand: 90 },
    { name: 'Cybersec', salary: 130, demand: 85 },
    { name: 'SWE', salary: 120, demand: 80 },
    { name: 'Data Sci', salary: 140, demand: 88 },
  ];

  const radarData = [
    { subject: 'Stress', SWE: 70, AI: 85, Cyber: 95 },
    { subject: 'Work-Life', SWE: 80, AI: 60, Cyber: 50 },
    { subject: 'Growth', SWE: 75, AI: 95, Cyber: 85 },
    { subject: 'AI Risk', SWE: 40, AI: 10, Cyber: 20 },
    { subject: 'Salary', SWE: 70, AI: 95, Cyber: 80 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedSection className="mb-12 text-center">
        <h1 className="text-5xl  font-bold mb-4">Career <span className="neon-text">Analytics</span></h1>
        <p className="text-slate-500">Data-driven insights to guide your future.</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <AnimatedSection>
          <GlassCard className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Salary vs Future Demand</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(0,243,255,0.3)', borderRadius: '8px' }} 
                  />
                  <Legend />
                  <Bar dataKey="salary" name="Salary (k)" fill="#00f3ff" radius={[4,4,0,0]} />
                  <Bar dataKey="demand" name="Demand (%)" fill="#bc13fe" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Radar Chart */}
        <AnimatedSection delay={0.2}>
          <GlassCard className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Lifestyle & Growth Comparison</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis dataKey="subject" stroke="#ffffff80" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#ffffff40" />
                  <Radar name="SWE" dataKey="SWE" stroke="#00f3ff" fill="#00f3ff" fillOpacity={0.3} />
                  <Radar name="AI Eng" dataKey="AI" stroke="#bc13fe" fill="#bc13fe" fillOpacity={0.3} />
                  <Radar name="Cyber" dataKey="Cyber" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Comparison;
