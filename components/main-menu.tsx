"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy, Settings } from "lucide-react"
import MusicToggle from "@/components/ui/music-toggle"

interface MainMenuProps {
  childName: string
  progress: any
  onNavigate: (screen: string) => void
}

export default function MainMenu({ childName, progress, onNavigate }: MainMenuProps) {
  const totalBadges = Object.values(progress).reduce((total: number, module: any) => {
    return total + (module.badges?.length || 0)
  }, 0)

  const menuItems = [
    {
      id: "typing",
      title: "Typing Adventure",
      emoji: "⌨️",
      description: "Catch falling words!",
      color: "from-blue-400 to-cyan-500",
      level: progress.typing.level,
      score: progress.typing.score,
    },
    {
      id: "learn",
      title: "Computer Explorer",
      emoji: "🖥️",
      description: "Learn computer basics!",
      color: "from-green-400 to-emerald-500",
      level: progress.learn.currentLesson + 1,
      score: progress.learn.completedLessons.length,
    },
    {
      id: "math",
      title: "Math Playground",
      emoji: "🔢",
      description: "Fun with numbers!",
      color: "from-purple-400 to-violet-500",
      level: progress.math.level,
      score: progress.math.score,
    },
    {
      id: "quiz",
      title: "Quiz Corner",
      emoji: "🧠",
      description: "Test your knowledge!",
      color: "from-pink-400 to-rose-500",
      level: 1,
      score: progress.quiz.score,
    },
  ]

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <h1 className="text-4xl font-bold text-purple-600 font-comic">Welcome back, {childName}! 🌟</h1>
          <Button onClick={() => onNavigate("settings")} variant="outline" size="sm" className="rounded-full">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-comic text-gray-700">{totalBadges} Badges</span>
          </div>
          <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-comic text-gray-700">Level {Math.max(...menuItems.map((item) => item.level))}</span>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`h-auto p-6 bg-gradient-to-r ${item.color} hover:scale-105 transform transition-all duration-200 shadow-lg rounded-2xl`}
          >
            <div className="text-center w-full">
              <div className="text-6xl mb-3">{item.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2 font-comic">{item.title}</h3>
              <p className="text-white/90 mb-4 font-comic">{item.description}</p>

              <div className="bg-white/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-white text-sm font-comic">
                  <span>Level {item.level}</span>
                  <span>Score: {item.score}</span>
                </div>
                <Progress value={item.score % 100} className="h-2 bg-white/30" />
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Quick Access */}
      <div className="max-w-2xl mx-auto flex justify-center gap-4">
        <MusicToggle />
        <Button
          onClick={() => onNavigate("achievements")}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full px-8 py-3 font-comic"
        >
          🏆 My Achievements
        </Button>
        <Button
          onClick={() => onNavigate("rewards")}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full px-8 py-3 font-comic"
        >
          🎁 Rewards & Shop
        </Button>
      </div>
    </div>
  )
}
