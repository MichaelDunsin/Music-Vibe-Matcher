
import { useNavigate, useLocation } from "react-router-dom";
import { Info } from "lucide-react";
import { motion } from "motion/react";
import { useStore } from "../store.js";
import AnimatedBackground from "../components/animatedbackground.jsx";
import { useEffect } from "react";

export default function Home(){
  const navigate = useNavigate();
const location = useLocation();
  const basePath = "/" + location.pathname.split("/")[1];
const { emotion, setEmotion, setEndTracks, setError } = useStore();

const HandleSubmit = async (text) => {
  const response = await fetch('https://music-vibe-matcher.vercel.app/api/mood', { // note that during production, this url would change to the url of my project https://my-backend.onrender.com/api/mood and in development, it would be the url of my localhost/api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
    sentence: text
  }),
  });

  if (!response.ok) {
    setError(true)
    throw new Error('Mood API error');
  }

  const data = await response.json();
  // data.emotions is an array of {label, score}
fetchSongs(data.emotions.labels)
}

const fetchSongs = async (text) => {
  const res = await fetch('https://music-vibe-matcher.vercel.app/api/spotify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emotions: text }),
  });

  if (!res.ok) {
     setError(true)
    throw new Error('Spotify API error');
  }

  const data = await res.json();
  const tracks = data.EndTracks
  console.log(tracks);
  setEndTracks(tracks) // Use this to display songs
};


 useEffect(() => {
    if (basePath === '/') {
      setEmotion('')
        setEndTracks(false)
      setError(false)
      // Put your logic here (analytics, data fetch, etc.)
    }
  }, [])

return (
<>
  <AnimatedBackground/>
<div className="relative z-10">
 <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 relative"
    >
      {/* Info button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/about")}
        className="absolute top-6 right-6 p-1 sm:p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
         <Info className="w-6 h-6 text-green-400" />
      </motion.button>

      <div className="max-w-2xl w-full text-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent" //piece of code you need for tailwind text gradient
        >
          Music Vibe Matcher
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg lg:text-2xl text-gray-300 mb-12"
        >
          Tell us how you feel, we'll find your perfect soundtrack
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="I feel..."
              value={emotion}
               onChange={(e) => setEmotion(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter' && emotion.trim()) {
                  HandleSubmit(emotion);
                  navigate("/songs");
                }
                }}
              className="w-full h-14 text-sm sm:text-base px-6 bg-gray-800 border-[2px] border-transparent rounded-full focus:border-green-900 focus:outline-none placeholder-gray-400"
            />
          </div>
          
          <button
             disabled={!emotion.trim()}
             onClick={() => { 
              HandleSubmit(emotion)
            navigate("/songs")
            }}
            className="w-full h-14 sm:text-lg font-semibold disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 rounded-full transition-all duration-200"
          >
            Find My Music
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-xs sm:text-sm text-gray-400"
        >
          <p>Try: "I feel nostalgic", "I'm excited", "I need motivation"</p>
        </motion.div>
      </div>
    </motion.div>
</div>
</>
)
};

