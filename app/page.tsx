"use client"

import { useState, useEffect } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import MainMenu from "@/components/main-menu"
import TypingGame from "@/components/typing-game"
import LearnMode from "@/components/learn-mode"
import MathZone from "@/components/math-zone"
import QuizCorner from "@/components/quiz-corner"
import Achievements from "@/components/achievements"
import Settings from "@/components/settings"

export default function SafeLearnJunior() {
  const [currentScreen, setCurrentScreen] = useState("welcome")
  const [childName, setChildName] = useState("")
  const [userProgress, setUserProgress] = useState({
    typing: { level: 1, score: 0, badges: [] },
    learn: { completedLessons: [], currentLesson: 0 },
    math: { level: 1, score: 0, badges: [] },
    quiz: { score: 0, badges: [] },
  })

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("safelearn-progress")
    const savedName = localStorage.getItem("safelearn-child-name")

    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
    if (savedName) {
      setChildName(savedName)
      setCurrentScreen("menu")
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (newProgress: typeof userProgress) => {
    setUserProgress(newProgress)
    localStorage.setItem("safelearn-progress", JSON.stringify(newProgress))
  }

  const handleWelcomeComplete = (name: string) => {
    setChildName(name)
    localStorage.setItem("safelearn-child-name", name)
    setCurrentScreen("menu")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onComplete={handleWelcomeComplete} />
      case "menu":
        return <MainMenu childName={childName} progress={userProgress} onNavigate={setCurrentScreen} />
      case "typing":
        return (
          <TypingGame
            progress={userProgress.typing}
            onProgressUpdate={(typing) => saveProgress({ ...userProgress, typing })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "learn":
        return (
          <LearnMode
            progress={userProgress.learn}
            onProgressUpdate={(learn) => saveProgress({ ...userProgress, learn })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "math":
        return (
          <MathZone
            progress={userProgress.math}
            onProgressUpdate={(math) => saveProgress({ ...userProgress, math })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "quiz":
        return (
          <QuizCorner
            progress={userProgress.quiz}
            onProgressUpdate={(quiz) => saveProgress({ ...userProgress, quiz })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "achievements":
        return <Achievements progress={userProgress} childName={childName} onBack={() => setCurrentScreen("menu")} />
      case "settings":
        return (
          <Settings
            onBack={() => setCurrentScreen("menu")}
            onReset={() => {
              localStorage.clear()
              setChildName("")
              setUserProgress({
                typing: { level: 1, score: 0, badges: [] },
                learn: { completedLessons: [], currentLesson: 0 },
                math: { level: 1, score: 0, badges: [] },
                quiz: { score: 0, badges: [] },
              })
              setCurrentScreen("welcome")
            }}
          />
        )
      default:
        return <MainMenu childName={childName} progress={userProgress} onNavigate={setCurrentScreen} />
    }
  }

  return <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">{renderScreen()}</div>
}
