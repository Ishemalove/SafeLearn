import React, { useEffect, useRef, useState } from "react"

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [playing])

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} loop src="/background-music.mp3" />
      <button
        onClick={() => setPlaying(!playing)}
        className={`px-3 py-1 rounded font-comic ${playing ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
      >
        {playing ? "Pause Music" : "Play Music"}
      </button>
    </div>
  )
} 