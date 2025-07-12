import React, { useState } from "react"

interface RewardsShopProps {
  progress: any
  onBack: () => void
}

const DAILY_CHALLENGE = {
  description: "Score 50 points in any game today!",
  reward: 10,
}
const WEEKLY_CHALLENGE = {
  description: "Earn 3 new badges this week!",
  reward: 50,
}
const SHOP_ITEMS = [
  { id: "avatar1", name: "Cool Cat Avatar", cost: 30 },
  { id: "avatar2", name: "Super Star Avatar", cost: 50 },
  { id: "theme1", name: "Rainbow Theme", cost: 40 },
]

export default function RewardsShop({ progress, onBack }: RewardsShopProps) {
  const [points, setPoints] = useState(progress.quiz.score + progress.math.score + progress.typing.score)
  const [owned, setOwned] = useState<string[]>([])
  const [claimedDaily, setClaimedDaily] = useState(false)
  const [claimedWeekly, setClaimedWeekly] = useState(false)
  const [streak, setStreak] = useState(3) // Example streak

  const claimDaily = () => {
    if (!claimedDaily) {
      setPoints(points + DAILY_CHALLENGE.reward)
      setClaimedDaily(true)
    }
  }
  const claimWeekly = () => {
    if (!claimedWeekly) {
      setPoints(points + WEEKLY_CHALLENGE.reward)
      setClaimedWeekly(true)
    }
  }
  const buyItem = (item: typeof SHOP_ITEMS[0]) => {
    if (points >= item.cost && !owned.includes(item.id)) {
      setPoints(points - item.cost)
      setOwned([...owned, item.id])
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-4">Back</button>
        <h1 className="text-4xl font-bold text-blue-600 mb-6 font-comic">🎁 Rewards & Shop</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Daily Challenge</h2>
          <p className="mb-2">{DAILY_CHALLENGE.description}</p>
          <button onClick={claimDaily} disabled={claimedDaily} className="bg-green-500 text-white px-4 py-2 rounded-xl">
            {claimedDaily ? "Claimed" : `Claim +${DAILY_CHALLENGE.reward} points`}
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Weekly Challenge</h2>
          <p className="mb-2">{WEEKLY_CHALLENGE.description}</p>
          <button onClick={claimWeekly} disabled={claimedWeekly} className="bg-purple-500 text-white px-4 py-2 rounded-xl">
            {claimedWeekly ? "Claimed" : `Claim +${WEEKLY_CHALLENGE.reward} points`}
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Streak</h2>
          <p className="mb-2">Current streak: <span className="font-bold">{streak} days</span></p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Virtual Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOP_ITEMS.map(item => (
              <div key={item.id} className="bg-white/90 rounded-lg p-4 shadow flex flex-col items-center">
                <span className="font-comic mb-2">{item.name}</span>
                <span className="mb-2">Cost: {item.cost} points</span>
                <button
                  onClick={() => buyItem(item)}
                  disabled={points < item.cost || owned.includes(item.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded font-comic disabled:bg-gray-300"
                >
                  {owned.includes(item.id) ? "Owned" : "Buy"}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-xl font-comic">Total Points: <span className="font-bold">{points}</span></div>
      </div>
    </div>
  )
} 