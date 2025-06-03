import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  emotion : '',
  setEmotion: (newEmotion) => set(() => ({emotion: newEmotion})),
   Endtracks : false,
  setEndTracks: (newData) => set(() => ({Endtracks: newData})),
   error : false,
  setError: (newError) => set(() => ({error: newError})),
})

export const useStore = create(persist(devtools(store), {name: "music-vibe-matcher"}))

/* 

*/