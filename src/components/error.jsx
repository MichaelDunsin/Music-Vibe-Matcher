import { useNavigate } from "react-router-dom";
import { useStore } from "../store.js";
import { AnimatePresence, motion } from "motion/react";

export default function Error(){
const { error } = useStore();
 const navigate = useNavigate();

return (
<>
<AnimatePresence>
 <motion.div
  key={error}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            duration: 1
        }}
 className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">500</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Server Error</p>
           <button
           onClick={() => {navigate(-1)}}
            className="w-full h-14 sm:text-lg font-semibold bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 rounded-full transition-all duration-200"
          >
              Pls try again 😓
          </button>
      </div>
    </motion.div>
</AnimatePresence>
</>
)
};