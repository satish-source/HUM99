import { motion } from 'framer-motion';

const NeonButton = ({ children, onClick, className = '', variant = 'primary' }) => {
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-300 relative overflow-hidden flex justify-center items-center gap-2 shadow-sm";
  
  const variants = {
    primary: "bg-primary text-slate-800 hover:bg-blue-700",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
export default NeonButton;
