import React, { useState } from "react"

interface ScienceZoneProps {
  progress: any
  onProgressUpdate: (progress: any) => void
  onBack: () => void
}

const SCIENCE_QUESTIONS = [
  {
    question: "What do plants need to grow?",
    options: ["Sunlight", "Chocolate", "Plastic", "Sand"],
    correct: 0,
    explanation: "Plants need sunlight, water, and soil to grow!",
  },
  {
    question: "Which animal can fly?",
    options: ["Dog", "Cat", "Bird", "Fish"],
    correct: 2,
    explanation: "Birds have wings and can fly!",
  },
  {
    question: "What do we breathe in to live?",
    options: ["Water", "Oxygen", "Juice", "Milk"],
    correct: 1,
    explanation: "We breathe in oxygen from the air!",
  },
  {
    question: "Which is a source of water?",
    options: ["River", "Book", "Shoe", "Pencil"],
    correct: 0,
    explanation: "Rivers, lakes, and rain are sources of water!",
  },
]

export default function ScienceZone({ progress, onProgressUpdate, onBack }: ScienceZoneProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "result">("menu")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])

  const startQuiz = () => {
    setGameState("playing")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowExplanation(false)
    setAnsweredQuestions(new Array(SCIENCE_QUESTIONS.length).fill(false))
  }

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === SCIENCE_QUESTIONS[currentQuestion].correct
    if (isCorrect) setScore((prev) => prev + 10)
    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < SCIENCE_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      endQuiz()
    }
  }

  const endQuiz = () => {
    const newProgress = {
      ...progress,
      score: Math.max(progress.score, score),
      badges: [...progress.badges],
    }
    if (score >= 30 && !progress.badges.includes("science-star")) {
      newProgress.badges.push("science-star")
    }
    onProgressUpdate(newProgress)
    setGameState("result")
  }

  const question = SCIENCE_QUESTIONS[currentQuestion]

  if (gameState === "menu") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="mb-4">Back</button>
          <h1 className="text-4xl font-bold text-green-600">🌱 Science Zone</h1>
          <p className="text-xl mt-4">Explore the world of science with fun questions!</p>
          <button onClick={startQuiz} className="mt-8 px-6 py-2 bg-green-500 text-white rounded-xl">Start Science Quiz</button>
        </div>
      </div>
    )
  }

  if (gameState === "playing") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
          <div className="mb-4 text-lg">{question.question}</div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className={`px-4 py-2 rounded-xl border ${selectedAnswer === idx ? (idx === question.correct ? 'bg-green-300' : 'bg-red-300') : 'bg-white'}`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {showExplanation && <div className="mb-4 text-blue-700">{question.explanation}</div>}
          <button onClick={nextQuestion} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl" disabled={selectedAnswer === null}>Next</button>
        </div>
      </div>
    )
  }

  if (gameState === "result") {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">Your Score: {score}</p>
        <button onClick={onBack} className="px-6 py-2 bg-green-500 text-white rounded-xl">Back to Menu</button>
      </div>
    )
  }

  return null
} 