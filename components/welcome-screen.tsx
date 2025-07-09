"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Sparkles, Heart } from "lucide-react"

interface WelcomeScreenProps {
  onComplete: (name: string) => void
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)

  const handleStart = () => {
    if (name.trim()) {
      onComplete(name.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          <div className="text-8xl mb-4 animate-bounce">🎓</div>
          <div className="absolute -top-2 -right-2 animate-spin">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse">
            <Sparkles className="w-6 h-6 text-purple-400 fill-current" />
          </div>
          <div className="absolute top-4 left-8 animate-ping">
            <Heart className="w-4 h-4 text-red-400 fill-current" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-purple-600 mb-4 font-comic">SafeLearn Junior</h1>

        <p className="text-2xl text-gray-700 mb-8 font-comic">🌟 Fun Learning Adventures Await! 🌟</p>

        {!showNameInput ? (
          <Button
            onClick={() => setShowNameInput(true)}
            className="text-2xl px-12 py-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-comic"
          >
            🚀 Start Learning!
          </Button>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-xl text-gray-700 mb-4 font-comic">What's your name, young learner?</p>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name here..."
                className="text-xl p-4 text-center rounded-full border-4 border-purple-300 focus:border-purple-500 font-comic"
                maxLength={20}
                onKeyPress={(e) => e.key === "Enter" && handleStart()}
              />
            </div>

            <Button
              onClick={handleStart}
              disabled={!name.trim()}
              className="text-xl px-10 py-4 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-comic"
            >
              ✨ Let's Go!
            </Button>
          </div>
        )}

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/50 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">⌨️</div>
            <p className="text-sm font-comic text-gray-600">Typing Games</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">🖥️</div>
            <p className="text-sm font-comic text-gray-600">Computer Basics</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">🔢</div>
            <p className="text-sm font-comic text-gray-600">Math Fun</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 shadow-lg">
            <div className="text-3xl mb-2">🧠</div>
            <p className="text-sm font-comic text-gray-600">Quiz Time</p>
          </div>
        </div>
      </div>
    </div>
  )
}
