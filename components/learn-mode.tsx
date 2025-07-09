"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

interface LearnModeProps {
  progress: any
  onProgressUpdate: (progress: any) => void
  onBack: () => void
}

const LESSONS = [
  {
    id: 0,
    title: "Meet Your Computer",
    emoji: "🖥️",
    content: {
      text: "A computer is like a smart friend that helps us learn and play! Let's meet the parts of a computer.",
      image: "💻",
      points: [
        "🖥️ Monitor - This is the screen where you see everything!",
        "⌨️ Keyboard - Use this to type letters and numbers",
        "🖱️ Mouse - Click and move things on the screen",
        "🏠 CPU - The computer's brain that thinks really fast!",
      ],
    },
  },
  {
    id: 1,
    title: "Using the Mouse",
    emoji: "🖱️",
    content: {
      text: "The mouse is your magic wand for the computer! Let's learn how to use it.",
      image: "👆",
      points: [
        "👆 Left Click - Press the left button to select things",
        "👆 Right Click - Press the right button for more options",
        "🔄 Scroll - Roll the wheel to move up and down",
        "↔️ Move - Slide the mouse to move the pointer",
      ],
    },
  },
  {
    id: 2,
    title: "Files and Folders",
    emoji: "📁",
    content: {
      text: "Files and folders help keep your computer organized, just like your toy box!",
      image: "🗂️",
      points: [
        "📄 File - A single document, picture, or game",
        "📁 Folder - A container that holds many files",
        "🏠 Desktop - The main screen with all your shortcuts",
        "🗑️ Recycle Bin - Where deleted files go (like a trash can)",
      ],
    },
  },
  {
    id: 3,
    title: "Staying Safe Online",
    emoji: "🛡️",
    content: {
      text: "The internet is fun, but we need to stay safe! Here are important safety rules.",
      image: "🔒",
      points: [
        "🤐 Never share personal information with strangers",
        "👨‍👩‍👧‍👦 Always ask a grown-up before downloading anything",
        "🚫 Don't click on suspicious links or pop-ups",
        "💬 Tell a trusted adult if something makes you uncomfortable",
      ],
    },
  },
]

export default function LearnMode({ progress, onProgressUpdate, onBack }: LearnModeProps) {
  const [currentLesson, setCurrentLesson] = useState(progress.currentLesson || 0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState("")

  const lesson = LESSONS[currentLesson]
  const isCompleted = progress.completedLessons.includes(currentLesson)

  const completeLesson = () => {
    const newProgress = {
      ...progress,
      completedLessons: [...new Set([...progress.completedLessons, currentLesson])],
      currentLesson: Math.min(currentLesson + 1, LESSONS.length - 1),
    }
    onProgressUpdate(newProgress)
  }

  const nextLesson = () => {
    if (currentLesson < LESSONS.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold text-green-600 font-comic">🖥️ Computer Explorer</h1>
          <div className="text-right">
            <p className="text-sm font-comic text-gray-600">
              Lesson {currentLesson + 1} of {LESSONS.length}
            </p>
            <Progress value={((currentLesson + 1) / LESSONS.length) * 100} className="w-32" />
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white/50 rounded-2xl p-8 mb-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{lesson.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4 font-comic">{lesson.title}</h2>
            {isCompleted && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span className="font-comic">Completed!</span>
              </div>
            )}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{lesson.content.image}</div>
              <p className="text-xl text-gray-700 font-comic leading-relaxed">{lesson.content.text}</p>
            </div>

            <div className="space-y-4">
              {lesson.content.points.map((point, index) => (
                <div key={index} className="bg-white/70 rounded-xl p-4 shadow-sm">
                  <p className="text-lg font-comic text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center">
          <Button
            onClick={prevLesson}
            disabled={currentLesson === 0}
            variant="outline"
            className="font-comic bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-4">
            {!isCompleted && (
              <Button
                onClick={completeLesson}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-comic px-8 py-3"
              >
                ✅ Mark Complete
              </Button>
            )}

            <Button
              onClick={nextLesson}
              disabled={currentLesson === LESSONS.length - 1}
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-comic"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-8 bg-white/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4 font-comic">📚 Learning Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {LESSONS.map((lessonItem, index) => (
              <div
                key={lessonItem.id}
                className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                  progress.completedLessons.includes(index)
                    ? "bg-green-200 border-2 border-green-400"
                    : index === currentLesson
                      ? "bg-blue-200 border-2 border-blue-400"
                      : "bg-white/50 border-2 border-gray-200"
                }`}
                onClick={() => setCurrentLesson(index)}
              >
                <div className="text-2xl mb-2">{lessonItem.emoji}</div>
                <p className="text-sm font-comic font-bold">{lessonItem.title}</p>
                {progress.completedLessons.includes(index) && (
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
