const StatBadge = ({ label, value, icon, color = 'primary' }) => {
  // Map old neon colors to new standard ones just in case props are passed
  const colors = {
    primary: 'text-primary border-primary/20 bg-blue-50',
    secondary: 'text-slate-700 border-slate-200 bg-slate-50',
    'blue-500': 'text-blue-600 border-blue-200 bg-blue-50',
    red: 'text-red-600 border-red-200 bg-red-50'
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors[color] || colors.secondary} text-sm font-medium`}>
      {icon}
      <span>{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};
export default StatBadge;
