import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StatBadge from '../components/StatBadge';
import AnimatedSection from '../components/AnimatedSection';
import { Search, Filter, ArrowRight, Brain, Code, Shield, Cloud, Palette, Gamepad2, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const careers = [
  { id: 'swe', title: "Software Engineer", category: "Engineering", icon: <Code />, salary: "$120k", stress: "High", aiRisk: "Low", demand: "High" },
  { id: 'ai', title: "AI Engineer", category: "Engineering", icon: <Brain />, salary: "$160k", stress: "High", aiRisk: "Very Low", demand: "Very High" },
  { id: 'cyber', title: "Cybersecurity", category: "Security", icon: <Shield />, salary: "$130k", stress: "Extreme", aiRisk: "Low", demand: "High" },
  { id: 'cloud', title: "Cloud Architect", category: "Infrastructure", icon: <Cloud />, salary: "$150k", stress: "Medium", aiRisk: "Low", demand: "High" },
  { id: 'ux', title: "UI/UX Designer", category: "Design", icon: <Palette />, salary: "$105k", stress: "Medium", aiRisk: "Medium", demand: "Medium" },
  { id: 'game', title: "Game Developer", category: "Engineering", icon: <Gamepad2 />, salary: "$95k", stress: "High", aiRisk: "Medium", demand: "Medium" },
  { id: 'data', title: "Data Scientist", category: "Data", icon: <Database />, salary: "$140k", stress: "Medium", aiRisk: "Medium", demand: "High" },
];

const CareerExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...new Set(careers.map(c => c.category))];

  const filteredCareers = careers.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedSection className="mb-12">
        <h1 className="text-5xl  font-bold mb-4">Career <span className="neon-text">Explorer</span></h1>
        <p className="text-slate-500 text-lg">Discover careers, compare stats, and launch your future simulation.</p>
      </AnimatedSection>

      {/* Filters and Search */}
      <AnimatedSection delay={0.2} className="flex flex-col md:flex-row justify-between gap-6 mb-12 relative z-20">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-primary focus:shadow-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
          <Filter className="text-slate-500" size={20} />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${selectedCategory === cat ? 'bg-blue-100 border-primary text-primary' : 'bg-transparent border-slate-200 text-slate-500 hover:text-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCareers.map((career, i) => (
          <AnimatedSection key={career.id} delay={0.1 * i}>
            <GlassCard className="h-full flex flex-col cursor-pointer group" onClick={() => navigate(`/career/${career.id}`)}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-primary group-hover:bg-blue-50 transition-colors">
                  {career.icon}
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 text-slate-600">
                  {career.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors">{career.title}</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Avg. Salary</span>
                  <span className="font-bold text-green-400">{career.salary}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Stress Level</span>
                  <span className={`font-bold ${career.stress === 'High' || career.stress === 'Extreme' ? 'text-red-400' : 'text-yellow-400'}`}>{career.stress}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">AI Risk</span>
                  <span className="font-bold text-secondary">{career.aiRisk}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Career Roadmap <ArrowRight size={18} />
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
      
      {filteredCareers.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No careers found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default CareerExplorer;
