import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Lock, Briefcase, TrendingUp, DollarSign, Clock, ChevronRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const roadmapData = {
  swe: {
    title: 'Software Engineer',
    color: 'blue',
    description: 'A structured path from beginner developer to engineering leadership.',
    totalYears: '10–15 years',
    avgTopSalary: '$200k+',
    stages: [
      {
        level: 1,
        title: 'Junior Software Engineer',
        yearsExp: '0–2 years',
        salary: '$70k – $95k',
        description: 'Entry-level. You write code under supervision, fix bugs, and learn the codebase.',
        skills: ['HTML/CSS', 'JavaScript/Python', 'Git Basics', 'REST APIs', 'SQL Basics'],
      },
      {
        level: 2,
        title: 'Software Engineer (Mid-Level)',
        yearsExp: '2–5 years',
        salary: '$95k – $130k',
        description: 'You independently own features, participate in code reviews, and mentor juniors.',
        skills: ['System Design Basics', 'Testing & CI/CD', 'Cloud Services (AWS/GCP)', 'Databases', 'Agile/Scrum'],
      },
      {
        level: 3,
        title: 'Senior Software Engineer',
        yearsExp: '5–8 years',
        salary: '$130k – $180k',
        description: 'You lead technical decisions, architect solutions, and mentor the entire team.',
        skills: ['Architecture Patterns', 'Performance Optimization', 'Technical Leadership', 'Cross-team Collaboration'],
      },
      {
        level: 4,
        title: 'Staff Engineer',
        yearsExp: '8–12 years',
        salary: '$180k – $250k',
        description: 'You define engineering strategy across multiple teams and drive large-scale technical initiatives.',
        skills: ['Org-wide Technical Strategy', 'RFC Writing', 'Platform Thinking', 'Stakeholder Management'],
      },
      {
        level: 5,
        title: 'Principal Engineer / Engineering Manager',
        yearsExp: '12+ years',
        salary: '$230k – $350k+',
        description: 'Top of the IC or management track. You shape company-level engineering culture and roadmap.',
        skills: ['People Management', 'Executive Communication', 'Vision Setting', 'P&L Understanding'],
      },
    ],
  },
  ai: {
    title: 'AI Engineer',
    color: 'violet',
    description: 'From machine learning basics to leading AI research and product development.',
    totalYears: '8–12 years',
    avgTopSalary: '$300k+',
    stages: [
      {
        level: 1,
        title: 'Junior ML Engineer / AI Developer',
        yearsExp: '0–2 years',
        salary: '$85k – $120k',
        description: 'Build and fine-tune basic ML models, work with existing AI frameworks.',
        skills: ['Python', 'NumPy/Pandas', 'Scikit-learn', 'TensorFlow/PyTorch', 'Jupyter Notebooks'],
      },
      {
        level: 2,
        title: 'ML Engineer / AI Engineer',
        yearsExp: '2–5 years',
        salary: '$120k – $170k',
        description: 'Train, evaluate, and deploy production ML/AI models end-to-end.',
        skills: ['Deep Learning', 'MLOps & Pipelines', 'NLP Basics', 'Cloud ML (SageMaker/Vertex)', 'A/B Testing'],
      },
      {
        level: 3,
        title: 'Senior AI Engineer / Research Engineer',
        yearsExp: '5–8 years',
        salary: '$170k – $240k',
        description: 'Design novel AI architectures, publish research, and lead AI product teams.',
        skills: ['LLMs & Fine-tuning', 'Reinforcement Learning', 'AI Ethics', 'Research Methodology'],
      },
      {
        level: 4,
        title: 'Lead AI Engineer / AI Architect',
        yearsExp: '8–12 years',
        salary: '$240k – $350k',
        description: 'Architect AI platforms, lead research teams, and guide product AI strategy.',
        skills: ['AI Platform Architecture', 'Team Leadership', 'Product Strategy', 'Grant Writing / Fundraising'],
      },
      {
        level: 5,
        title: 'Head of AI / VP of AI / Chief AI Officer',
        yearsExp: '12+ years',
        salary: '$350k – $600k+',
        description: 'Executive level. Drive the company\'s entire AI vision and strategy.',
        skills: ['Executive Leadership', 'AI Governance', 'Business Strategy', 'Board Communication'],
      },
    ],
  },
  cyber: {
    title: 'Cybersecurity',
    color: 'red',
    description: 'From security analyst to CISO — defending systems at every scale.',
    totalYears: '10–15 years',
    avgTopSalary: '$250k+',
    stages: [
      { level: 1, title: 'Security Analyst (Tier 1)', yearsExp: '0–2 years', salary: '$55k – $80k', description: 'Monitor alerts, respond to incidents, and learn the security tooling.', skills: ['SIEM Tools', 'Network Basics', 'Log Analysis', 'Incident Response', 'CompTIA Security+'] },
      { level: 2, title: 'Security Engineer / Penetration Tester', yearsExp: '2–5 years', salary: '$80k – $130k', description: 'Conduct pen tests, build security tools, and harden infrastructure.', skills: ['Ethical Hacking', 'Metasploit', 'Web App Security (OWASP)', 'Scripting (Python/Bash)', 'CISSP'] },
      { level: 3, title: 'Senior Security Engineer', yearsExp: '5–8 years', salary: '$130k – $180k', description: 'Design security architecture, lead red/blue team exercises.', skills: ['Zero Trust Architecture', 'Cloud Security', 'Threat Modeling', 'SOC Leadership'] },
      { level: 4, title: 'Security Architect / Threat Intelligence Lead', yearsExp: '8–12 years', salary: '$180k – $230k', description: 'Build enterprise security frameworks and guide organizational security posture.', skills: ['Enterprise Security Design', 'Risk Management', 'Compliance (SOC2, ISO27001)', 'Vendor Management'] },
      { level: 5, title: 'CISO / VP of Security', yearsExp: '12+ years', salary: '$220k – $400k+', description: 'Executive level. Own the company\'s entire security posture and regulatory compliance.', skills: ['Board Reporting', 'Budget Management', 'Crisis Leadership', 'Regulatory Compliance'] },
    ],
  },
  cloud: {
    title: 'Cloud Architect',
    color: 'sky',
    description: 'From cloud support to designing global-scale infrastructure.',
    totalYears: '10–14 years',
    avgTopSalary: '$280k+',
    stages: [
      { level: 1, title: 'Cloud Support / Junior Cloud Engineer', yearsExp: '0–2 years', salary: '$65k – $90k', description: 'Help manage cloud accounts, provision resources, and learn core cloud services.', skills: ['AWS/Azure/GCP Basics', 'Linux', 'Terraform Basics', 'Networking Fundamentals', 'Cloud Certifications (AWS SAA)'] },
      { level: 2, title: 'Cloud Engineer', yearsExp: '2–5 years', salary: '$90k – $135k', description: 'Design, implement, and manage cloud infrastructure for applications.', skills: ['Infrastructure as Code', 'Kubernetes / Docker', 'CI/CD Pipelines', 'Cost Optimization'] },
      { level: 3, title: 'Senior Cloud Engineer / DevOps Engineer', yearsExp: '5–8 years', salary: '$135k – $180k', description: 'Lead multi-cloud strategies, automate platform operations, mentor teams.', skills: ['Multi-cloud Strategy', 'Site Reliability Engineering', 'Platform Engineering', 'Security in Cloud'] },
      { level: 4, title: 'Cloud Architect', yearsExp: '8–12 years', salary: '$180k – $250k', description: 'Design organization-wide cloud strategy, governance, and reference architectures.', skills: ['Enterprise Architecture', 'FinOps', 'Disaster Recovery Design', 'Stakeholder Alignment'] },
      { level: 5, title: 'Principal Architect / VP of Infrastructure', yearsExp: '12+ years', salary: '$250k – $380k+', description: 'Drive the company\'s infrastructure vision across all engineering verticals.', skills: ['C-Level Communication', 'Infrastructure Strategy', 'Global Scale Design', 'Vendor Negotiation'] },
    ],
  },
  ux: {
    title: 'UI/UX Designer',
    color: 'pink',
    description: 'From wireframes to design leadership at top product companies.',
    totalYears: '8–12 years',
    avgTopSalary: '$200k+',
    stages: [
      { level: 1, title: 'Junior UI/UX Designer', yearsExp: '0–2 years', salary: '$55k – $80k', description: 'Create wireframes and prototypes under guidance, assist in usability testing.', skills: ['Figma / Sketch', 'Wireframing', 'User Research Basics', 'Usability Testing', 'Design Principles'] },
      { level: 2, title: 'UI/UX Designer', yearsExp: '2–5 years', salary: '$80k – $115k', description: 'Own product features end-to-end, run user research, and iterate on designs.', skills: ['Design Systems', 'Prototyping', 'A/B Testing', 'Accessibility (WCAG)', 'Stakeholder Presentation'] },
      { level: 3, title: 'Senior UX Designer', yearsExp: '5–8 years', salary: '$115k – $160k', description: 'Shape product strategy, drive complex design problems, and mentor junior designers.', skills: ['Product Strategy', 'Cross-functional Leadership', 'Service Design', 'Data-driven Design'] },
      { level: 4, title: 'Staff / Principal UX Designer', yearsExp: '8–12 years', salary: '$160k – $220k', description: 'Define design craft and culture across the organization.', skills: ['Design Vision', 'Org-wide Design Standards', 'Executive Presentation', 'Design Thinking Facilitation'] },
      { level: 5, title: 'VP of Design / Chief Design Officer', yearsExp: '12+ years', salary: '$210k – $350k+', description: 'Executive leader for the design org, shaping brand and product experience at scale.', skills: ['P&L Ownership', 'Brand Strategy', 'Design Org Building', 'C-Suite Communication'] },
    ],
  },
  game: {
    title: 'Game Developer',
    color: 'green',
    description: 'From first scripts to shipping AAA titles as a lead developer.',
    totalYears: '10–15 years',
    avgTopSalary: '$200k+',
    stages: [
      { level: 1, title: 'Junior Game Developer', yearsExp: '0–2 years', salary: '$50k – $75k', description: 'Implement gameplay features and fix bugs under a senior lead.', skills: ['Unity / Unreal Engine', 'C# / C++', 'Game Physics Basics', 'Version Control (Git)', '2D/3D Basics'] },
      { level: 2, title: 'Game Developer (Mid-Level)', yearsExp: '2–5 years', salary: '$75k – $105k', description: 'Independently build gameplay systems and collaborate with artists and designers.', skills: ['Gameplay Programming', 'Shader Writing', 'AI/Pathfinding', 'Multiplayer Basics', 'Optimization'] },
      { level: 3, title: 'Senior Game Developer', yearsExp: '5–8 years', salary: '$105k – $145k', description: 'Own entire gameplay systems, mentor juniors, and guide technical direction.', skills: ['Engine Architecture', 'Platform Shipping (PS5/Xbox/PC)', 'Technical Design', 'Performance Profiling'] },
      { level: 4, title: 'Lead Developer / Tech Lead', yearsExp: '8–12 years', salary: '$145k – $190k', description: 'Lead entire engineering teams on major game projects.', skills: ['Team Leadership', 'Project Management', 'Cross-discipline Communication', 'Release Management'] },
      { level: 5, title: 'Technical Director / Studio Head', yearsExp: '12+ years', salary: '$190k – $300k+', description: 'Define the technical vision for the entire studio or franchise.', skills: ['Studio Strategy', 'Technology Selection', 'Publisher Relations', 'Creative Direction'] },
    ],
  },
  data: {
    title: 'Data Scientist',
    color: 'amber',
    description: 'From data analysis to leading data strategy at enterprise scale.',
    totalYears: '10–14 years',
    avgTopSalary: '$260k+',
    stages: [
      { level: 1, title: 'Junior Data Analyst / Data Scientist', yearsExp: '0–2 years', salary: '$65k – $90k', description: 'Clean, analyze, and visualize data to extract insights.', skills: ['Python / R', 'SQL', 'Excel / Tableau', 'Statistics Basics', 'Data Visualization'] },
      { level: 2, title: 'Data Scientist', yearsExp: '2–5 years', salary: '$90k – $140k', description: 'Build predictive models and A/B test features to drive product and business decisions.', skills: ['Machine Learning', 'Feature Engineering', 'Experimentation (A/B)', 'Big Data Tools (Spark)', 'Communication'] },
      { level: 3, title: 'Senior Data Scientist', yearsExp: '5–8 years', salary: '$140k – $190k', description: 'Own complex modeling projects, define data strategy, and mentor teams.', skills: ['Advanced ML / Deep Learning', 'Causal Inference', 'MLOps', 'Business Acumen', 'Stakeholder Management'] },
      { level: 4, title: 'Staff Data Scientist / Analytics Lead', yearsExp: '8–12 years', salary: '$190k – $260k', description: 'Drive org-wide data initiatives, define metrics frameworks and data culture.', skills: ['Org Metrics Strategy', 'Data Governance', 'Executive Communication', 'Cross-functional Leadership'] },
      { level: 5, title: 'Chief Data Officer / VP of Data', yearsExp: '12+ years', salary: '$260k – $450k+', description: 'Executive owner of all data assets, strategy, and monetization.', skills: ['Data Monetization', 'Privacy & Compliance', 'Data Product Strategy', 'Board Reporting'] },
    ],
  },
};

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-600',   dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',   bar: 'from-blue-400 to-blue-600' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', bar: 'from-violet-400 to-violet-600' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-600',    dot: 'bg-red-500',    badge: 'bg-red-100 text-red-700',       bar: 'from-red-400 to-red-600' },
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-200',    text: 'text-sky-600',    dot: 'bg-sky-500',    badge: 'bg-sky-100 text-sky-700',       bar: 'from-sky-400 to-sky-600' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   text: 'text-pink-600',   dot: 'bg-pink-500',   badge: 'bg-pink-100 text-pink-700',     bar: 'from-pink-400 to-pink-600' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-600',  dot: 'bg-green-500',  badge: 'bg-green-100 text-green-700',   bar: 'from-green-400 to-green-600' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  dot: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700',   bar: 'from-amber-400 to-amber-600' },
};

const CareerRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = roadmapData[id];

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Career not found</h2>
        <button onClick={() => navigate('/explorer')} className="text-blue-600 underline">← Back to Explorer</button>
      </div>
    );
  }

  const c = colorMap[data.color];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/explorer')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Career Explorer
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          <span className={c.text}>{data.title}</span> Career Roadmap
        </h1>
        <p className="text-slate-500 text-lg mb-6">{data.description}</p>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { icon: <Clock size={16} />, label: 'Total Journey', value: data.totalYears },
            { icon: <TrendingUp size={16} />, label: 'Top Salary', value: data.avgTopSalary },
            { icon: <Briefcase size={16} />, label: 'Levels', value: `${data.stages.length} career stages` },
          ].map((stat) => (
            <div key={stat.label} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${c.border} ${c.bg}`}>
              <span className={c.text}>{stat.icon}</span>
              <div>
                <div className="text-xs text-slate-400">{stat.label}</div>
                <div className={`text-sm font-bold ${c.text}`}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Roadmap Steps */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 z-0" />

        <div className="space-y-6">
          {data.stages.map((stage, idx) => (
            <motion.div
              key={stage.level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-16"
            >
              {/* Level dot */}
              <div className={`absolute left-0 w-12 h-12 rounded-full ${c.dot} flex items-center justify-center text-white font-bold text-lg shadow-md z-10`}>
                {stage.level}
              </div>

              <GlassCard className={`border ${c.border} hover:shadow-md transition-shadow`}>
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${c.bar} rounded-t-xl -mt-6 -mx-6 mb-4`} style={{width: 'calc(100% + 3rem)', marginLeft: '-1.5rem', marginTop: '-1.5rem', marginBottom: '1rem', borderRadius: '0.75rem 0.75rem 0 0'}} />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>Level {stage.level}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">{stage.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map(skill => (
                        <span key={skill} className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats sidebar */}
                  <div className="flex flex-row md:flex-col gap-3 md:gap-2 md:min-w-[160px] shrink-0">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${c.bg} border ${c.border}`}>
                      <Clock size={14} className={c.text} />
                      <div>
                        <div className="text-xs text-slate-400">Experience</div>
                        <div className={`text-xs font-bold ${c.text}`}>{stage.yearsExp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                      <DollarSign size={14} className="text-green-600" />
                      <div>
                        <div className="text-xs text-slate-400">Salary Range</div>
                        <div className="text-xs font-bold text-green-700">{stage.salary}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress arrow to next */}
                {idx < data.stages.length - 1 && (
                  <div className={`flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs ${c.text} font-medium`}>
                    <ChevronRight size={14} />
                    Next: {data.stages[idx + 1].title}
                  </div>
                )}
                {idx === data.stages.length - 1 && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-green-600 font-medium">
                    <CheckCircle2 size={14} />
                    Top of the career ladder! 🎉
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
