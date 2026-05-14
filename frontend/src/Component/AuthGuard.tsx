"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { isLoggedIn } from "@/utils/auth"

export default function AuthGuard({ children }: { children: React.ReactNode }) {

  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login")
    }
  }, [])

  return <>{children}</>
}