import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ExternalLink, Clock, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "../store.js";

export default function Preview(){
const { Endtracks } = useStore();
const { id } = useParams();
const navigate = useNavigate();

const Track = Endtracks.find(s => s.id === id);
const song = `${Track.artists[0].name} ${Track.name}`;
const query = encodeURIComponent(song);
const url = `https://www.youtube.com/results?search_query=${query}`;

 useEffect(() => {
    if (!Track || Track === undefined) {
      navigate("/songs");
    }
  }, [])

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



return (
<>
<motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-4xl w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/songs")}
          className="mb-8 inline-flex items-center text-sm md:text-base space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowDown className="w-4 h-4 rotate-90" />
          <span>Back to Songs</span>
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <img
              src={Track.album.images[0].url}
              alt={`${Track.name} album art`}
              className="w-80 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl mx-auto md:mx-0 mb-6 shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-xl sm:text-2xl xl:text-3xl font-bold mb-2">{Track.name}</h1>
              <p className="md:text-xl text-base sm:text-lg text-gray-400 mb-4">{Track.artists[0].name}</p>
              <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm">
                {Track.album.album_type}
              </span>
            </div>

           
           
            {/* Song Details */}
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur space-y-4">
              <h3 className="text-lg font-semibold mb-3 text-green-400">Song Details</h3>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm">Duration: {`${Math.floor(Track.duration_ms/60000)}:${(Track.duration_ms%60000).toString().slice(0, 2)} Mins`}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-sm">Released: {formatDate(Track.album.release_date)}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <User className="w-4 h-4 text-green-400" />
                <button
                 onClick={() => window.open(Track.artists[0].external_urls.spotify, "_blank")}
                  className="text-sm hover:text-green-400 transition-colors underline"
                >
                  {Track.artists[0].name} on Spotify
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
             

              <div className="flex space-x-4">
                <button
                  className="flex-1 relative p-2 bg-white rounded-md border-green-400 text-green-400 transition-all duration-200 hover:bg-green-400 hover:text-gray-900"
                  onClick={() => window.open(Track.external_urls.spotify, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 absolute left-[15%] sm:left-[25%] top-[30%] mr-2" />
                  Spotify
                </button>
                <button
                  className="flex-1 relative p-2 bg-white rounded-md border-green-400 text-green-400 transition-all duration-200 hover:bg-green-400 hover:text-gray-900"
                  onClick={() => window.open(url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 absolute left-[15%] sm:left-[25%] top-[30%] mr-2" />
                  YouTube
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
</>
)
};