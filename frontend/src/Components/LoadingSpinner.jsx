import { motion as Motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    
      <Motion.div
        className="w-16 h-16 border-4 border-t-4 
                   border-t-sky-400 border-blue-200/40 
                   rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    
  );
};

export default LoadingSpinner;
