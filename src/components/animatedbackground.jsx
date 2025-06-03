// components/AnimatedBackground.jsx
import { motion } from "motion/react"

const balls = [
  {
    size: 300,
    color: "bg-gray-800/90",
    top: "top-[-100px]",
    left: "left-[-100px]",
  },
  {
    size: 400,
    color: "bg-green-400/90",
    top: "top-[20%]",
    left: "left-[60%]",
  },
  {
    size: 250,
    color: "bg-gray-800/90",
    top: "top-[75%]",
    left: "left-[-100px]",
  },
]

export default function AnimatedBackground() {

    
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {balls.map((ball, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${ball.color} ${ball.top} ${ball.left}`}
          style={{
            width: ball.size,
            height: ball.size,
            filter: "blur(10px)",
          }}
          animate={{
            y: [0, 60, -40, 0],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: 15 + i * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
