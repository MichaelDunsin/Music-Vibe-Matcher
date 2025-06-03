import {  AnimatePresence, motion } from "motion/react";
import { useStore } from "../store.js";
import { useState, useEffect } from "react";

export default function LoadingScreen(){
  const { EndTracks } = useStore();
   const texts = ['Analyzing emotions...', 'Generating tracks...', 'Almost there...', 'Enjoy 🎧'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < texts.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 7000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <AnimatePresence>
 <div 
  key={EndTracks}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            duration: 1
        }}
 className="fixed inset-0 bg-gray-900 px-4 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360, }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-20 md:w-32 h-20 md:h-32 border-4 border-gray-600 border-t-green-400 rounded-full mx-auto mb-8"
        />
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-3xl font-bold mb-4"
        >
          Finding your perfect songs...
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 md:text-lg text-base"
        >
          {texts[index]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
    </AnimatePresence>
   
  );
};
