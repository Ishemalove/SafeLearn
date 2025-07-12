"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Zap } from "lucide-react"
import Confetti from "@/components/ui/confetti"

interface TypingGameProps {
  progress: any
  onProgressUpdate: (progress: any) => void
  onBack: () => void
}

interface FallingWord {
  id: number
  word: string
  x: number
  y: number
  speed: number
}

const WORDS = [
  "cat",
  "dog",
  "sun",
  "moon",
  "tree",
  "book",
  "car",
  "fish",
  "bird",
  "star",
  "house",
  "apple",
  "water",
  "happy",
  "smile",
  "jump",
  "play",
  "learn",
  "fun",
  "game",
]

export default function TypingGame({ progress, onProgressUpdate, onBack }: TypingGameProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameOver">("menu")
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(progress.level || 1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [wordsTyped, setWordsTyped] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [showConfetti, setShowConfetti] = useState(false)
  const [shake, setShake] = useState(false)

  const spawnWord = useCallback(() => {
    const newWord: FallingWord = {
      id: Date.now() + Math.random(),
      word: WORDS[Math.floor(Math.random() * WORDS.length)],
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: 0,
      speed: 1 + level * 0.3,
    }
    setFallingWords((prev) => [...prev, newWord])
  }, [level])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = setInterval(() => {
      setFallingWords((prev) => {
        const updated = prev
          .map((word) => ({
            ...word,
            y: word.y + word.speed,
          }))
          .filter((word) => {
            if (word.y > 100) {
              setLives((l) => l - 1)
              return false
            }
            return true
          })
        return updated
      })

      // Spawn new words
      if (Math.random() < 0.3 + level * 0.1) {
        spawnWord()
      }

      // Update timer
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("gameOver")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(gameLoop)
  }, [gameState, level, spawnWord])

  // Check for game over
  useEffect(() => {
    if (lives <= 0) {
      setGameState("gameOver")
    }
  }, [lives])

  const playSound = (type: 'correct' | 'wrong') => {
    const audio = new Audio(type === 'correct' ? '/correct.mp3' : '/wrong.mp3')
    audio.play()
  }

  const handleWordTyped = (typedWord: string) => {
    const matchedWord = fallingWords.find((word) => word.word.toLowerCase() === typedWord.toLowerCase())

    if (matchedWord) {
      setFallingWords((prev) => prev.filter((word) => word.id !== matchedWord.id))
      setScore((prev) => prev + matchedWord.word.length * 10)
      setWordsTyped((prev) => prev + 1)
      setCurrentInput("")
      playSound('correct')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1200)
      // Play success sound (visual feedback)
      const element = document.getElementById("success-feedback")
      if (element) {
        element.classList.add("animate-ping")
        setTimeout(() => element.classList.remove("animate-ping"), 500)
      }
    } else {
      playSound('wrong')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setLives(3)
    setTimeLeft(60)
    setWordsTyped(0)
    setAccuracy(100)
    setFallingWords([])
    setCurrentInput("")
  }

  const endGame = () => {
    const newProgress = {
      ...progress,
      level: Math.max(progress.level, level),
      score: Math.max(progress.score, score),
      badges: [...progress.badges],
    }

    // Award badges
    if (score > 500 && !progress.badges.includes("typing-master")) {
      newProgress.badges.push("typing-master")
    }
    if (wordsTyped > 20 && !progress.badges.includes("speed-demon")) {
      newProgress.badges.push("speed-demon")
    }

    onProgressUpdate(newProgress)
    setGameState("menu")
  }

  if (gameState === "menu") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button onClick={onBack} variant="outline" className="mr-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-blue-600 font-comic">⌨️ Typing Adventure</h1>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4 font-comic">Catch the Falling Words!</h2>
            <p className="text-xl text-gray-600 font-comic">Type the words before they hit the ground!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
              <h3 className="font-bold text-lg font-comic">Best Score</h3>
              <p className="text-2xl text-blue-600 font-bold">{progress.score}</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-bold text-lg font-comic">Level</h3>
              <p className="text-2xl text-purple-600 font-bold">{progress.level}</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-bold text-lg font-comic">Badges</h3>
              <p className="text-2xl text-green-600 font-bold">{progress.badges.length}</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={startGame}
              className="text-2xl px-12 py-6 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-comic"
            >
              🚀 Start Game!
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "gameOver") {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-8xl mb-4">{score > progress.score ? "🎉" : "😊"}</div>
          <h2 className="text-4xl font-bold text-purple-600 mb-4 font-comic">
            {score > progress.score ? "New High Score!" : "Great Job!"}
          </h2>

          <div className="bg-white/50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-comic text-gray-600">Final Score</p>
                <p className="text-3xl font-bold text-blue-600">{score}</p>
              </div>
              <div>
                <p className="text-lg font-comic text-gray-600">Words Typed</p>
                <p className="text-3xl font-bold text-green-600">{wordsTyped}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={startGame}
              className="text-xl px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full font-comic mr-4"
            >
              🔄 Play Again
            </Button>
            <Button
              onClick={endGame}
              className="text-xl px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full font-comic"
            >
              📊 View Progress
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-8 ${shake ? 'animate-shake' : ''}`}>
      <Confetti show={showConfetti} />
      {/* Game Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <Button onClick={() => setGameState("menu")} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Menu
        </Button>

        <div className="flex gap-4 text-center">
          <div className="bg-white/80 rounded-lg px-3 py-1">
            <p className="text-sm font-comic">Score</p>
            <p className="text-xl font-bold text-blue-600">{score}</p>
          </div>
          <div className="bg-white/80 rounded-lg px-3 py-1">
            <p className="text-sm font-comic">Lives</p>
            <p className="text-xl">{"❤️".repeat(lives)}</p>
          </div>
          <div className="bg-white/80 rounded-lg px-3 py-1">
            <p className="text-sm font-comic">Time</p>
            <p className="text-xl font-bold text-red-600">{timeLeft}s</p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl border-4 border-white shadow-lg overflow-hidden">
        {/* Falling Words */}
        {fallingWords.map((word) => (
          <div
            key={word.id}
            className="absolute bg-white rounded-lg px-3 py-2 shadow-lg border-2 border-purple-300 transform transition-all duration-1000"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              transform: "translateX(-50%)",
            }}
          >
            <span className="font-bold text-lg text-purple-600 font-comic">{word.word}</span>
          </div>
        ))}

        {/* Success Feedback */}
        <div id="success-feedback" className="absolute top-4 right-4 text-4xl">
          ⭐
        </div>
      </div>

      {/* Input Area */}
      <div className="mt-6 text-center">
        <Input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleWordTyped(currentInput)
            }
          }}
          placeholder="Type the falling words here..."
          className="text-2xl p-4 text-center rounded-full border-4 border-purple-300 focus:border-purple-500 font-comic max-w-md mx-auto"
          autoFocus
        />
        <p className="mt-2 text-gray-600 font-comic">Press Enter after typing each word!</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 max-w-md mx-auto">
        <div className="flex justify-between text-sm font-comic mb-1">
          <span>Level Progress</span>
          <span>{wordsTyped}/20 words</span>
        </div>
        <Progress value={(wordsTyped / 20) * 100} className="h-3" />
      </div>
    </div>
  )
}
