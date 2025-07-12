import React, { useState } from "react"

interface ReadingRoomProps {
  progress: any
  onProgressUpdate: (progress: any) => void
  onBack: () => void
}

const STORIES = [
  {
    title: "The Lost Kitten",
    text: "Once upon a time, a little kitten got lost in the garden. She looked for her mother and meowed loudly. Soon, her mother heard her and came running. The kitten was happy again!",
    question: "Who got lost in the garden?",
    options: ["A puppy", "A kitten", "A bird", "A rabbit"],
    correct: 1,
    explanation: "The story is about a kitten who got lost!",
  },
  {
    title: "The Big Red Ball",
    text: "Tom had a big red ball. He loved to play with it every day. One day, the ball rolled under the bed. Tom found it and was happy!",
    question: "What color was Tom's ball?",
    options: ["Blue", "Green", "Red", "Yellow"],
    correct: 2,
    explanation: "Tom's ball was red!",
  },
]

export default function ReadingRoom({ progress, onProgressUpdate, onBack }: ReadingRoomProps) {
  const [gameState, setGameState] = useState<"menu" | "reading" | "result">("menu")
  const [currentStory, setCurrentStory] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const startReading = () => {
    setGameState("reading")
    setCurrentStory(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowExplanation(false)
  }

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === STORIES[currentStory].correct
    if (isCorrect) setScore((prev) => prev + 10)
    setShowExplanation(true)
  }

  const nextStory = () => {
    if (currentStory < STORIES.length - 1) {
      setCurrentStory((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      endReading()
    }
  }

  const endReading = () => {
    const newProgress = {
      ...progress,
      score: Math.max(progress.score, score),
      badges: [...progress.badges],
    }
    if (score >= 10 && !progress.badges.includes("reading-star")) {
      newProgress.badges.push("reading-star")
    }
    onProgressUpdate(newProgress)
    setGameState("result")
  }

  const story = STORIES[currentStory]

  if (gameState === "menu") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack} className="mb-4">Back</button>
          <h1 className="text-4xl font-bold text-purple-600">📚 Reading Room</h1>
          <p className="text-xl mt-4">Read stories and answer questions!</p>
          <button onClick={startReading} className="mt-8 px-6 py-2 bg-purple-500 text-white rounded-xl">Start Reading</button>
        </div>
      </div>
    )
  }

  if (gameState === "reading") {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
          <div className="mb-4 text-lg">{story.text}</div>
          <div className="mb-4 text-lg">{story.question}</div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            {story.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className={`px-4 py-2 rounded-xl border ${selectedAnswer === idx ? (idx === story.correct ? 'bg-green-300' : 'bg-red-300') : 'bg-white'}`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {showExplanation && <div className="mb-4 text-blue-700">{story.explanation}</div>}
          <button onClick={nextStory} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl" disabled={selectedAnswer === null}>Next</button>
        </div>
      </div>
    )
  }

  if (gameState === "result") {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Reading Complete!</h2>
        <p className="text-xl mb-4">Your Score: {score}</p>
        <button onClick={onBack} className="px-6 py-2 bg-purple-500 text-white rounded-xl">Back to Menu</button>
      </div>
    )
  }

  return null
} 