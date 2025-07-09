"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star } from "lucide-react"

interface MathZoneProps {
  progress: any
  onProgressUpdate: (progress: any) => void
  onBack: () => void
}

interface MathProblem {
  question: string
  answer: number
  options?: number[]
}

export default function MathZone({ progress, onProgressUpdate, onBack }: MathZoneProps) {
  const [gameMode, setGameMode] = useState<"menu" | "addition" | "subtraction" | "shapes" | "counting">("menu")
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lives, setLives] = useState(3)
  const [problemCount, setProblemCount] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)

  const generateAdditionProblem = (): MathProblem => {
    const a = Math.floor(Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 10) + 1
    return {
      question: `${a} + ${b} = ?`,
      answer: a + b,
    }
  }

  const generateSubtractionProblem = (): MathProblem => {
    const a = Math.floor(Math.random() * 10) + 5
    const b = Math.floor(Math.random() * a) + 1
    return {
      question: `${a} - ${b} = ?`,
      answer: a - b,
    }
  }

  const generateShapeProblem = (): MathProblem => {
    const shapes = ["🔴", "🔵", "🟡", "🟢", "🟣", "🟠"]
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)]
    const count = Math.floor(Math.random() * 5) + 3
    const shapeString = targetShape.repeat(count)

    return {
      question: `How many ${targetShape} do you see?\n${shapeString}`,
      answer: count,
    }
  }

  const generateCountingProblem = (): MathProblem => {
    const emojis = ["🍎", "🐱", "⭐", "🌸", "🚗", "🎈"]
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const count = Math.floor(Math.random() * 8) + 2
    const emojiString = emoji.repeat(count)

    return {
      question: `Count the ${emoji}:\n${emojiString}`,
      answer: count,
    }
  }

  const generateProblem = () => {
    let problem: MathProblem
    switch (gameMode) {
      case "addition":
        problem = generateAdditionProblem()
        break
      case "subtraction":
        problem = generateSubtractionProblem()
        break
      case "shapes":
        problem = generateShapeProblem()
        break
      case "counting":
        problem = generateCountingProblem()
        break
      default:
        problem = generateAdditionProblem()
    }
    setCurrentProblem(problem)
    setUserAnswer("")
    setFeedback(null)
  }

  const checkAnswer = () => {
    if (!currentProblem) return

    const isCorrect = Number.parseInt(userAnswer) === currentProblem.answer

    if (isCorrect) {
      setScore((prev) => prev + 10 + streak * 2)
      setStreak((prev) => prev + 1)
      setFeedback("correct")
    } else {
      setLives((prev) => prev - 1)
      setStreak(0)
      setFeedback("incorrect")
    }

    setProblemCount((prev) => prev + 1)

    setTimeout(() => {
      if (lives > 1 || isCorrect) {
        generateProblem()
      } else {
        endGame()
      }
    }, 1500)
  }

  const startGame = (mode: typeof gameMode) => {
    setGameMode(mode)
    setScore(0)
    setStreak(0)
    setLives(3)
    setProblemCount(0)
    generateProblem()
  }

  const endGame = () => {
    const newProgress = {
      ...progress,
      level: Math.max(progress.level, Math.floor(score / 100) + 1),
      score: Math.max(progress.score, score),
      badges: [...progress.badges],
    }

    // Award badges
    if (streak >= 5 && !progress.badges.includes("math-streak")) {
      newProgress.badges.push("math-streak")
    }
    if (score >= 200 && !progress.badges.includes("math-master")) {
      newProgress.badges.push("math-master")
    }

    onProgressUpdate(newProgress)
    setGameMode("menu")
  }

  useEffect(() => {
    if (gameMode !== "menu" && !currentProblem) {
      generateProblem()
    }
  }, [gameMode])

  if (gameMode === "menu") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button onClick={onBack} variant="outline" className="mr-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-purple-600 font-comic">🔢 Math Playground</h1>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🧮</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4 font-comic">Choose Your Math Adventure!</h2>
            <p className="text-xl text-gray-600 font-comic">Pick a game and start solving problems!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Button
              onClick={() => startGame("addition")}
              className="h-32 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">➕</div>
                <h3 className="text-xl font-bold font-comic">Addition Fun</h3>
                <p className="text-sm opacity-90 font-comic">Add numbers together!</p>
              </div>
            </Button>

            <Button
              onClick={() => startGame("subtraction")}
              className="h-32 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">➖</div>
                <h3 className="text-xl font-bold font-comic">Subtraction Quest</h3>
                <p className="text-sm opacity-90 font-comic">Take numbers away!</p>
              </div>
            </Button>

            <Button
              onClick={() => startGame("shapes")}
              className="h-32 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🔴</div>
                <h3 className="text-xl font-bold font-comic">Shape Counter</h3>
                <p className="text-sm opacity-90 font-comic">Count colorful shapes!</p>
              </div>
            </Button>

            <Button
              onClick={() => startGame("counting")}
              className="h-32 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🔢</div>
                <h3 className="text-xl font-bold font-comic">Counting Game</h3>
                <p className="text-sm opacity-90 font-comic">Count fun objects!</p>
              </div>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
              <h3 className="font-bold text-lg font-comic">Best Score</h3>
              <p className="text-2xl text-purple-600 font-bold">{progress.score}</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-bold text-lg font-comic">Level</h3>
              <p className="text-2xl text-blue-600 font-bold">{progress.level}</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-bold text-lg font-comic">Badges</h3>
              <p className="text-2xl text-green-600 font-bold">{progress.badges.length}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => setGameMode("menu")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Menu
          </Button>

          <div className="flex gap-4">
            <div className="bg-white/80 rounded-lg px-3 py-1 text-center">
              <p className="text-sm font-comic">Score</p>
              <p className="text-xl font-bold text-purple-600">{score}</p>
            </div>
            <div className="bg-white/80 rounded-lg px-3 py-1 text-center">
              <p className="text-sm font-comic">Streak</p>
              <p className="text-xl font-bold text-blue-600">{streak}</p>
            </div>
            <div className="bg-white/80 rounded-lg px-3 py-1 text-center">
              <p className="text-sm font-comic">Lives</p>
              <p className="text-xl">{"❤️".repeat(lives)}</p>
            </div>
          </div>
        </div>

        {/* Problem Display */}
        {currentProblem && (
          <div className="bg-white/70 rounded-2xl p-8 mb-6 text-center shadow-lg">
            <div className="text-6xl mb-6">🤔</div>
            <div className="text-3xl font-bold text-gray-700 mb-6 font-comic whitespace-pre-line">
              {currentProblem.question}
            </div>

            <div className="max-w-xs mx-auto">
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Your answer..."
                className="text-2xl p-4 text-center rounded-full border-4 border-purple-300 focus:border-purple-500 font-comic"
                disabled={feedback !== null}
                autoFocus
              />
            </div>

            <Button
              onClick={checkAnswer}
              disabled={!userAnswer || feedback !== null}
              className="mt-4 text-xl px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full font-comic"
            >
              ✅ Check Answer
            </Button>

            {/* Feedback */}
            {feedback && (
              <div
                className={`mt-6 text-2xl font-bold font-comic ${
                  feedback === "correct" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback === "correct" ? (
                  <div>
                    <div className="text-4xl mb-2">🎉</div>
                    Correct! Great job!
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">😅</div>
                    Not quite! The answer was {currentProblem.answer}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        <div className="bg-white/50 rounded-xl p-4">
          <div className="flex justify-between text-sm font-comic mb-2">
            <span>Problems Solved</span>
            <span>{problemCount}/10</span>
          </div>
          <Progress value={(problemCount / 10) * 100} className="h-3" />
        </div>
      </div>
    </div>
  )
}
