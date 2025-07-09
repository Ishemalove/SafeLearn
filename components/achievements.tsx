"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Trophy, Award, Zap } from "lucide-react"

interface AchievementsProps {
  progress: any
  childName: string
  onBack: () => void
}

const ALL_BADGES = [
  {
    id: "typing-master",
    name: "Typing Master",
    description: "Score over 500 points in typing game",
    emoji: "⌨️",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Type 20 words in one game",
    emoji: "⚡",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "math-streak",
    name: "Math Streak",
    description: "Get 5 math problems correct in a row",
    emoji: "🔥",
    color: "from-red-400 to-pink-500",
  },
  {
    id: "math-master",
    name: "Math Master",
    description: "Score 200 points in math games",
    emoji: "🧮",
    color: "from-purple-400 to-violet-500",
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 60% or higher on a quiz",
    emoji: "🧠",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get 100% on a quiz",
    emoji: "💯",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "computer-explorer",
    name: "Computer Explorer",
    description: "Complete all computer lessons",
    emoji: "🖥️",
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: "learning-champion",
    name: "Learning Champion",
    description: "Play all game modes",
    emoji: "🏆",
    color: "from-amber-400 to-yellow-500",
  },
]

export default function Achievements({ progress, childName, onBack }: AchievementsProps) {
  const earnedBadges = Object.values(progress).reduce((badges: string[], module: any) => {
    return [...badges, ...(module.badges || [])]
  }, [])

  const totalScore = Object.values(progress).reduce((total: number, module: any) => {
    return total + (module.score || 0)
  }, 0)

  const completedLessons = progress.learn?.completedLessons?.length || 0
  const totalLessons = 4 // Based on learn-mode component

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="outline" className="mr-4 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-4xl font-bold text-yellow-600 font-comic">🏆 My Achievements</h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-3xl font-bold text-gray-700 mb-2 font-comic">Amazing work, {childName}!</h2>
          <p className="text-xl text-gray-600 font-comic">Look at all the incredible things you've accomplished!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl p-6 text-white text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold text-lg font-comic">Total Badges</h3>
            <p className="text-3xl font-bold">{earnedBadges.length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-6 text-white text-center">
            <Star className="w-8 h-8 mx-auto mb-2 fill-current" />
            <h3 className="font-bold text-lg font-comic">Total Score</h3>
            <p className="text-3xl font-bold">{totalScore}</p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-6 text-white text-center">
            <Award className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold text-lg font-comic">Lessons Done</h3>
            <p className="text-3xl font-bold">
              {completedLessons}/{totalLessons}
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white text-center">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold text-lg font-comic">Highest Level</h3>
            <p className="text-3xl font-bold">
              {Math.max(progress.typing?.level || 1, progress.math?.level || 1, progress.learn?.currentLesson + 1 || 1)}
            </p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="bg-white/50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 font-comic">📊 Learning Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-comic mb-1">
                <span>⌨️ Typing Skills</span>
                <span>Level {progress.typing?.level || 1}</span>
              </div>
              <Progress value={Math.min(((progress.typing?.score || 0) / 1000) * 100, 100)} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-comic mb-1">
                <span>🔢 Math Skills</span>
                <span>Level {progress.math?.level || 1}</span>
              </div>
              <Progress value={Math.min(((progress.math?.score || 0) / 500) * 100, 100)} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-comic mb-1">
                <span>🖥️ Computer Knowledge</span>
                <span>
                  {completedLessons}/{totalLessons} lessons
                </span>
              </div>
              <Progress value={(completedLessons / totalLessons) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-comic mb-1">
                <span>🧠 Quiz Performance</span>
                <span>{progress.quiz?.score || 0} points</span>
              </div>
              <Progress value={Math.min(((progress.quiz?.score || 0) / 80) * 100, 100)} className="h-3" />
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-6 font-comic">🏅 Badge Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_BADGES.map((badge) => {
              const isEarned = earnedBadges.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-6 text-center transition-all duration-200 ${
                    isEarned
                      ? `bg-gradient-to-r ${badge.color} text-white shadow-lg transform hover:scale-105`
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <div className={`text-4xl mb-3 ${isEarned ? "" : "grayscale opacity-50"}`}>{badge.emoji}</div>
                  <h4 className={`font-bold text-lg mb-2 font-comic ${isEarned ? "text-white" : "text-gray-600"}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-sm font-comic ${isEarned ? "text-white/90" : "text-gray-500"}`}>
                    {badge.description}
                  </p>
                  {isEarned && (
                    <div className="mt-3">
                      <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-comic">Earned!</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4 font-comic">Keep up the fantastic work!</h3>
          <p className="text-lg text-gray-600 font-comic mb-4">
            Every game you play and every lesson you complete makes you smarter and more skilled!
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/50 rounded-lg px-4 py-2">
              <span className="font-comic text-gray-700">
                🎯 Next Goal: Earn {ALL_BADGES.length - earnedBadges.length} more badges!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
