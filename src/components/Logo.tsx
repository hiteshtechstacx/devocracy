
import { motion } from "framer-motion";

const Logo = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <motion.div 
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-70 blur-lg rounded-lg"></div>
      <div className="relative flex items-center justify-center w-full h-full">
        <img 
          src="/lovable-uploads/8dbb34b5-a4ed-4118-8092-57d1d4557f2b.png" 
          alt="BlockAuth Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Logo;
