"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star } from "lucide-react"

interface QuizCornerProps {
  progress: any
  onProgressUpdate: (progress: any) => void
  onBack: () => void
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  emoji: string
  explanation: string
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What do you use to type on a computer?",
    options: ["Mouse", "Keyboard", "Monitor", "Speaker"],
    correct: 1,
    emoji: "⌨️",
    explanation: "The keyboard has letters and numbers for typing!",
  },
  {
    question: "What part of the computer shows you pictures and text?",
    options: ["CPU", "Keyboard", "Monitor", "Mouse"],
    correct: 2,
    emoji: "🖥️",
    explanation: "The monitor is like a TV screen for your computer!",
  },
  {
    question: "What color do you get when you mix red and yellow?",
    options: ["Purple", "Green", "Orange", "Blue"],
    correct: 2,
    emoji: "🎨",
    explanation: "Red + Yellow = Orange, like a beautiful sunset!",
  },
  {
    question: "How many legs does a cat have?",
    options: ["2", "3", "4", "6"],
    correct: 2,
    emoji: "🐱",
    explanation: "Cats have 4 legs, just like dogs and many other animals!",
  },
  {
    question: "What do you click to select things on the computer?",
    options: ["Keyboard", "Monitor", "Mouse", "Speaker"],
    correct: 2,
    emoji: "🖱️",
    explanation: "The mouse helps you point and click on things!",
  },
  {
    question: "What shape has 3 sides?",
    options: ["Circle", "Square", "Triangle", "Rectangle"],
    correct: 2,
    emoji: "🔺",
    explanation: "A triangle has exactly 3 sides and 3 corners!",
  },
  {
    question: "Where do deleted files go on a computer?",
    options: ["Desktop", "Recycle Bin", "Keyboard", "Mouse"],
    correct: 1,
    emoji: "🗑️",
    explanation: "The Recycle Bin keeps deleted files safe until you empty it!",
  },
  {
    question: "What should you do before downloading something online?",
    options: ["Download immediately", "Ask a grown-up", "Close the computer", "Delete everything"],
    correct: 1,
    emoji: "🛡️",
    explanation: "Always ask a trusted adult before downloading anything!",
  },
]

export default function QuizCorner({ progress, onProgressUpdate, onBack }: QuizCornerProps) {
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
    setAnsweredQuestions(new Array(QUIZ_QUESTIONS.length).fill(false))
  }

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === QUIZ_QUESTIONS[currentQuestion].correct

    if (isCorrect) {
      setScore((prev) => prev + 10)
    }

    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)

    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
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

    // Award badges
    if (score >= 60 && !progress.badges.includes("quiz-master")) {
      newProgress.badges.push("quiz-master")
    }
    if (score === QUIZ_QUESTIONS.length * 10 && !progress.badges.includes("perfect-score")) {
      newProgress.badges.push("perfect-score")
    }

    onProgressUpdate(newProgress)
    setGameState("result")
  }

  const question = QUIZ_QUESTIONS[currentQuestion]

  if (gameState === "menu") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button onClick={onBack} variant="outline" className="mr-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-pink-600 font-comic">🧠 Quiz Corner</h1>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4 font-comic">Test Your Knowledge!</h2>
            <p className="text-xl text-gray-600 font-comic">Answer questions about computers, colors, and more!</p>
          </div>

          <div className="bg-white/50 rounded-2xl p-8 mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 font-comic">Quiz Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 rounded-xl p-4">
                <div className="text-3xl mb-2">❓</div>
                <p className="font-comic text-gray-700">{QUIZ_QUESTIONS.length} Fun Questions</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4">
                <div className="text-3xl mb-2">🎓</div>
                <p className="font-comic text-gray-700">Learn While Playing</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-comic text-gray-700">Earn Badges</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <Button
              onClick={startQuiz}
              className="text-2xl px-12 py-6 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-comic"
            >
              🚀 Start Quiz!
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
              <h3 className="font-bold text-lg font-comic">Best Score</h3>
              <p className="text-2xl text-pink-600 font-bold">{progress.score}</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-bold text-lg font-comic">Badges Earned</h3>
              <p className="text-2xl text-purple-600 font-bold">{progress.badges.length}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "result") {
    const percentage = Math.round((score / (QUIZ_QUESTIONS.length * 10)) * 100)

    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-8xl mb-4">{percentage >= 80 ? "🎉" : percentage >= 60 ? "😊" : "🤔"}</div>
          <h2 className="text-4xl font-bold text-purple-600 mb-4 font-comic">
            {percentage >= 80 ? "Amazing Work!" : percentage >= 60 ? "Great Job!" : "Keep Learning!"}
          </h2>

          <div className="bg-white/50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-comic text-gray-600">Final Score</p>
                <p className="text-3xl font-bold text-pink-600">{score}</p>
              </div>
              <div>
                <p className="text-lg font-comic text-gray-600">Percentage</p>
                <p className="text-3xl font-bold text-purple-600">{percentage}%</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={startQuiz}
              className="text-xl px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full font-comic mr-4"
            >
              🔄 Try Again
            </Button>
            <Button
              onClick={() => setGameState("menu")}
              className="text-xl px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full font-comic"
            >
              📊 Back to Menu
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Quiz Header */}
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => setGameState("menu")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Menu
          </Button>

          <div className="text-center">
            <p className="text-sm font-comic text-gray-600">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <Progress value={((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100} className="w-32" />
          </div>

          <div className="bg-white/80 rounded-lg px-3 py-1 text-center">
            <p className="text-sm font-comic">Score</p>
            <p className="text-xl font-bold text-pink-600">{score}</p>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/70 rounded-2xl p-8 mb-6 text-center shadow-lg">
          <div className="text-6xl mb-4">{question.emoji}</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-6 font-comic">{question.question}</h3>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => selectAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-lg font-comic rounded-xl transition-all duration-200 ${
                  selectedAnswer === null
                    ? "bg-white/80 hover:bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400"
                    : selectedAnswer === index
                      ? index === question.correct
                        ? "bg-green-500 text-white border-2 border-green-600"
                        : "bg-red-500 text-white border-2 border-red-600"
                      : index === question.correct
                        ? "bg-green-500 text-white border-2 border-green-600"
                        : "bg-gray-300 text-gray-500 border-2 border-gray-400"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-100 rounded-xl">
              <div className="text-2xl mb-2">💡</div>
              <p className="text-lg font-comic text-blue-800">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {showExplanation && (
          <div className="text-center">
            <Button
              onClick={nextQuestion}
              className="text-xl px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full font-comic"
            >
              {currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"} ➡️
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
