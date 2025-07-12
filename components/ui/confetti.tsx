import React, { useEffect } from "react"

export default function Confetti({ show }: { show: boolean }) {
  useEffect(() => {
    if (!show) return
    const duration = 1000
    const end = Date.now() + duration
    const colors = ["#FFC700", "#FF0000", "#2E3192", "#41BBC7"]
    function frame() {
      if (Date.now() > end) return
      for (let i = 0; i < 10; i++) {
        const conf = document.createElement("div")
        conf.textContent = "🎉"
        conf.style.position = "fixed"
        conf.style.left = Math.random() * 100 + "%"
        conf.style.top = Math.random() * 30 + 30 + "%"
        conf.style.fontSize = Math.random() * 24 + 24 + "px"
        conf.style.pointerEvents = "none"
        conf.style.zIndex = "9999"
        conf.style.transition = "opacity 1s"
        conf.style.color = colors[Math.floor(Math.random() * colors.length)]
        document.body.appendChild(conf)
        setTimeout(() => {
          conf.style.opacity = "0"
          setTimeout(() => conf.remove(), 1000)
        }, duration)
      }
      requestAnimationFrame(frame)
    }
    frame()
    // Cleanup
    return () => {
      document.querySelectorAll(".confetti-emoji").forEach((el) => el.remove())
    }
  }, [show])
  return null
} 