"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Lock, RotateCcw, Volume2, VolumeX } from "lucide-react"

interface SettingsProps {
  onBack: () => void
  onReset: () => void
}

export default function Settings({ onBack, onReset }: SettingsProps) {
  const [isParentMode, setIsParentMode] = useState(false)
  const [parentPassword, setParentPassword] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const PARENT_PASSWORD = "parent123" // In a real app, this would be more secure

  const handleParentLogin = () => {
    if (parentPassword === PARENT_PASSWORD) {
      setIsParentMode(true)
      setParentPassword("")
    } else {
      alert("Incorrect password! Try: parent123")
    }
  }

  const handleReset = () => {
    if (showResetConfirm) {
      onReset()
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 5000)
    }
  }

  if (!isParentMode) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Button onClick={onBack} variant="outline" className="mr-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-gray-600 font-comic">⚙️ Settings</h1>
          </div>

          <div className="bg-white/50 rounded-2xl p-8 text-center">
            <div className="text-8xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4 font-comic">Parent Access Required</h2>
            <p className="text-xl text-gray-600 mb-6 font-comic">Settings are protected to keep your learning safe!</p>

            <div className="max-w-sm mx-auto space-y-4">
              <Input
                type="password"
                value={parentPassword}
                onChange={(e) => setParentPassword(e.target.value)}
                placeholder="Enter parent password..."
                className="text-lg p-4 text-center rounded-full border-4 border-gray-300 focus:border-purple-500 font-comic"
                onKeyPress={(e) => e.key === "Enter" && handleParentLogin()}
              />

              <Button
                onClick={handleParentLogin}
                className="w-full text-lg py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full font-comic"
              >
                <Lock className="w-5 h-5 mr-2" />
                Access Settings
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-100 rounded-xl">
              <p className="text-sm font-comic text-blue-800">
                💡 Demo Password: <strong>parent123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button onClick={onBack} variant="outline" className="mr-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-purple-600 font-comic">⚙️ Parent Settings</h1>
          </div>
          <Button onClick={() => setIsParentMode(false)} variant="outline" className="font-comic">
            <Lock className="w-4 h-4 mr-2" />
            Lock Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* App Settings */}
          <div className="bg-white/50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 font-comic">🎮 App Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/70 rounded-lg">
                <div>
                  <h4 className="font-bold font-comic text-gray-700">Sound Effects</h4>
                  <p className="text-sm font-comic text-gray-600">Enable audio feedback</p>
                </div>
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant={soundEnabled ? "default" : "outline"}
                  size="sm"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>

              <div className="p-4 bg-white/70 rounded-lg">
                <h4 className="font-bold font-comic text-gray-700 mb-2">Time Limits</h4>
                <p className="text-sm font-comic text-gray-600 mb-3">Set daily usage limits</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="font-comic bg-transparent">
                    30 min
                  </Button>
                  <Button variant="outline" size="sm" className="font-comic bg-transparent">
                    1 hour
                  </Button>
                  <Button variant="outline" size="sm" className="font-comic bg-transparent">
                    2 hours
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-white/70 rounded-lg">
                <h4 className="font-bold font-comic text-gray-700 mb-2">Language</h4>
                <p className="text-sm font-comic text-gray-600 mb-3">Choose app language</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="default" size="sm" className="font-comic">
                    🇺🇸 English
                  </Button>
                  <Button variant="outline" size="sm" className="font-comic bg-transparent">
                    🇷🇼 Kinyarwanda
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Data */}
          <div className="bg-white/50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 font-comic">📊 Progress & Data</h3>

            <div className="space-y-6">
              <div className="p-4 bg-white/70 rounded-lg">
                <h4 className="font-bold font-comic text-gray-700 mb-2">Export Progress</h4>
                <p className="text-sm font-comic text-gray-600 mb-3">Save learning data to file</p>
                <Button variant="outline" size="sm" className="font-comic bg-transparent">
                  📄 Export Data
                </Button>
              </div>

              <div className="p-4 bg-white/70 rounded-lg">
                <h4 className="font-bold font-comic text-gray-700 mb-2">Backup Settings</h4>
                <p className="text-sm font-comic text-gray-600 mb-3">Automatically save progress</p>
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="font-comic">
                    ✅ Enabled
                  </Button>
                  <Button variant="outline" size="sm" className="font-comic bg-transparent">
                    Daily
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <h4 className="font-bold font-comic text-red-700 mb-2">⚠️ Reset All Data</h4>
                <p className="text-sm font-comic text-red-600 mb-3">This will delete all progress and start fresh</p>
                <Button onClick={handleReset} variant="destructive" size="sm" className="font-comic">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {showResetConfirm ? "Click Again to Confirm" : "Reset Everything"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Information */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 font-comic">🛡️ Safety Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold font-comic text-gray-700">Offline Only</h4>
              <p className="text-sm font-comic text-gray-600">No internet connection required</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚫</div>
              <h4 className="font-bold font-comic text-gray-700">No Ads</h4>
              <p className="text-sm font-comic text-gray-600">Completely ad-free experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏠</div>
              <h4 className="font-bold font-comic text-gray-700">Local Storage</h4>
              <p className="text-sm font-comic text-gray-600">All data stays on this device</p>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="mt-8 bg-white/30 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-2 font-comic">SafeLearn Junior v1.0</h3>
          <p className="text-sm font-comic text-gray-600">A safe, educational app designed for children aged 5-12</p>
          <p className="text-xs font-comic text-gray-500 mt-2">Built with ❤️ for young learners everywhere</p>
        </div>
      </div>
    </div>
  )
}
