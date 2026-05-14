
"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BackButton() {

  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null   // ⭐ Prevent hydration mismatch

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-16 left-6 z-30 
       w-12 h-10 rounded-full 
       bg-gray/40 backdrop-blur-md 
       text-white text-2xl 
      flex items-center justify-center
       hover:bg-black/60 hover:text-purple-400 transition"
    >
      ←
    </button>
  )
}