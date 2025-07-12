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
import ScienceZone from "@/components/science-zone"
import ReadingRoom from "@/components/reading-room"
import LogicPuzzles from "@/components/logic-puzzles"
import RewardsShop from "@/components/rewards-shop"

export default function SafeLearnJunior() {
  const [currentScreen, setCurrentScreen] = useState("welcome")
  const [childName, setChildName] = useState("")
  const [userProgress, setUserProgress] = useState({
    typing: { level: 1, score: 0, badges: [] },
    learn: { completedLessons: [], currentLesson: 0 },
    math: { level: 1, score: 0, badges: [] },
    quiz: { score: 0, badges: [] },
    science: { level: 1, score: 0, badges: [] },
    reading: { level: 1, score: 0, badges: [] },
    logic: { level: 1, score: 0, badges: [] },
  })

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("safelearn-child-name")
    if (savedName) {
      setChildName(savedName)
      setCurrentScreen("menu")
    }
    
    const savedProgress = localStorage.getItem("safelearn-progress")
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
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
      case "science":
        return (
          <ScienceZone
            progress={userProgress.science}
            onProgressUpdate={(science) => saveProgress({ ...userProgress, science })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "reading":
        return (
          <ReadingRoom
            progress={userProgress.reading}
            onProgressUpdate={(reading) => saveProgress({ ...userProgress, reading })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "logic":
        return (
          <LogicPuzzles
            progress={userProgress.logic}
            onProgressUpdate={(logic) => saveProgress({ ...userProgress, logic })}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "rewards":
        return <RewardsShop progress={userProgress} onBack={() => setCurrentScreen("menu")} />
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
                science: { level: 1, score: 0, badges: [] },
                reading: { level: 1, score: 0, badges: [] },
                logic: { level: 1, score: 0, badges: [] },
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
