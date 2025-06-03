import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function About(){
const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen py-24 sm:py-32 flex items-center justify-center px-4 relative"
    >
      {/* Close button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 p-1 sm:p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <X className="w-6 h-6 text-green-400" />
      </motion.button>

      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            About Music Vibe Matcher
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur"
          >
            <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">What It Does</h2>
            <p className="text-gray-300 sm:text-base text-sm leading-relaxed">
              Music Vibe Matcher uses advanced emotion analysis to understand how you're feeling 
              and recommends the perfect songs to match your mood. Whether you're happy, sad, 
              energetic, or contemplative, we'll find music that resonates with your current vibe.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur"
          >
            <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">How It Works</h2>
            <ul className="text-gray-300 sm:text-base text-sm space-y-2">
              <li>• Express how you feel in natural language</li>
              <li>• AI analyzes your emotional state</li>
              <li>• Get personalized song recommendations</li>
              <li>• View tracks and discover new favorites</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gray-800/50 p-8 rounded-2xl backdrop-blur text-center"
        >
          <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">About the Developer</h2>
          <p className="text-gray-300 sm:text-base text-sm leading-relaxed">
            Built with passion by a music and technology enthusiast. This software engineering student combined
            the power of emotion recognition with music discovery, creating a 
            unique and personal listening experience for every user.
          </p>
         
        </motion.div>
      </div>
    </motion.div>
  );
};