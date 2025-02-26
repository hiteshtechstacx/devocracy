
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
          src="/lovable-uploads/5dd4d263-9086-4784-bc8d-48bd0bdfcc4f.png" 
          alt="DevoCracy Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Logo;
