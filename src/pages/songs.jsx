import { useStore } from "../store.js";
import LoadingScreen from "../components/loadingscreen.jsx";
import Error from "../components/error.jsx";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";

export default function Songs(){
const { Endtracks, error, emotion } = useStore();
 const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);


return (
<>
<AnimatePresence>
{(Endtracks) ? (<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Songs that match
            <span className="text-green-400"> "{emotion}"</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-2xl text-gray-300 mb-12">
            We found {Endtracks.length} perfect matches for your vibe
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="m-auto grid max-w-[350px] grid-cols-1 items-center gap-3 pt-1 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 *:"
        >
          {Endtracks.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="max-w-[360px]"
            >
          <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800/70"
     
    >
      <motion.div 
       id={song.id}
       onClick={()=> navigate(`/preview/${song.id}`)}
      onHoverStart={(e) => setIsHovered(e.target.id)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative mb-4">
        <img
          src={song.album.images[1].url}
          alt={`${song.name} track cover`}
          className="w-full aspect-square rounded-xl object-cover"
        />
        
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered === song.id ? 1 : 0, 
            opacity: isHovered === song.id ? 1 : 0 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-[40%] left-[40%] right-[40%] bottom-[40%] transform w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <Info className="w-6 h-6 text-white" />
        </motion.button>

        <span className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-green-400 text-xs rounded-full">
          {song.album.album_type}
        </span>
      </motion.div>

      <div className="space-y-3">
        <div>
          <h3 className="font-bold sm:text-lg truncate">{song.name}</h3>
          <p className="text-gray-400 sm:text-base text-sm truncate">{song.artists[0].name}</p>
        </div>

        <button
          onClick={()=> navigate(`/preview/${song.id}`)}
          className="w-full rounded-md relative bg-gray-900 transition-all duration-300 p-2 border-green-400 text-green-400 hover:bg-green-500 hover:text-gray-900"
        >
          More Info
        </button>
      </div>

      
    </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            <span>Try Another Emotion</span>
            <ArrowDown className="w-4 h-4 rotate-180" />
          </button>
        </motion.div>
      </div>
    </motion.div>) : (error ? <Error/> : <LoadingScreen/>)}
</AnimatePresence>


</>
)
};