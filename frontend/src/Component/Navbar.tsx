"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  clearAuthSession,
  getAuthToken,
  getLoggedUser,
  isLoggedIn,
  type LoggedUser,
} from "@/utils/auth"
import { BACKEND_URL } from "@/utils/api"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  // ⭐ Profile dropdown container નો ref
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    queueMicrotask(() => {
      const user = getLoggedUser()
      if (user) setLoggedUser(user)
    })

    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_TOKEN_KEY || e.key === AUTH_USER_KEY) {
        queueMicrotask(() => setLoggedUser(getLoggedUser()))
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  // ⭐ Outside click detect કરવા માટે mousedown event listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // જો click profileRef ની બહાર થઈ હોય તો menu બંધ કરો
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }

    // ⭐ Menu open હોય ત્યારે જ listener add કરો
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // ⭐ Cleanup — component unmount અથવા profileOpen change થાય
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [profileOpen])

  const handleLogout = async () => {
    const headers: Record<string, string> = {}
    const token = getAuthToken()
    if (token) headers.Authorization = `Bearer ${token}`

    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: Object.keys(headers).length ? headers : undefined,
        credentials: "include",
      })
    } catch {
      /* ignore */
    }
    clearAuthSession()
    setLoggedUser(null)
    setProfileOpen(false)
    router.push("/")
  }

  const goProtected = (path: string) => {
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }
    router.push(path)
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4">

      {/* TOP NAV */}
      <div className="relative flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-black w-9 h-9 flex items-center justify-center rounded-md">🎬</div>
          <Link
            href="/"
            className="text-white font-extrabold text-xl tracking-wider hover:[-webkit-text-stroke:1px_#ec4899] hover:[text-shadow:0_0_5px_#ec4899] transition duration-300"
          >
            CineBook
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg text-white rounded-full px-16 py-3 shadow-lg gap-10">

          <Link href="/" className={`relative group ${pathname === "/" ? "text-pink-500" : ""}`}>
            Home
            <span className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </Link>

          <p onClick={() => goProtected("/movie")} className={`cursor-pointer relative group ${pathname.includes("/movie") ? "text-pink-500" : ""}`}>
            Movie
            <span className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${pathname.includes("/movie") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </p>

          <p onClick={() => goProtected("/theater")} className={`cursor-pointer relative group ${pathname.includes("/theater") ? "text-pink-500" : ""}`}>
            Theater
            <span className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${pathname.includes("/theater") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </p>

          <p onClick={() => goProtected("/contact")} className={`cursor-pointer relative group ${pathname.includes("/contact") ? "text-pink-500" : ""}`}>
            Contact
            <span className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${pathname.includes("/contact") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </p>

          <p onClick={() => goProtected("/about")} className={`cursor-pointer relative group ${pathname.includes("/about") ? "text-pink-500" : ""}`}>
            About
            <span className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${pathname.includes("/about") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </p>

        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* LOGIN / PROFILE */}
          {loggedUser ? (
            // ⭐ ref આ container પર attach કર્યો — icon + dropdown બંને અંદર છે
            <div className="relative" ref={profileRef}>

              {/* ⭐ Profile Icon — toggle કરે */}
              <div
                onClick={() => setProfileOpen(prev => !prev)}
                className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold cursor-pointer select-none"
              >
                {loggedUser.name?.charAt(0).toUpperCase()}
              </div>

              {/* ⭐ Dropdown — profileRef ની અંદર છે, click અહીં થાય તો menu open રહે */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 bg-black p-4 rounded-xl w-44 text-white shadow-xl z-50">
                  <p className="mb-2 font-semibold">{loggedUser.name}</p>

                  <p
                    onClick={() => {
                      setProfileOpen(false)
                      goProtected("/profile")
                    }}
                    className="cursor-pointer hover:text-purple-400 mb-2"
                  >
                    Profile
                  </p>

                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-red-400"
                  >
                    Logout
                  </p>
                </div>
              )}

            </div>
          ) : (
            <Link href="/login">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold">
                Login
              </button>
            </Link>
          )}

          {/* HAMBURGER */}
          <button
            className="flex lg:hidden flex-col gap-1 bg-white/10 p-3 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-[2px] bg-white transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-[2px] bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-white transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 space-y-5 items-center text-white flex flex-col">

          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>

          <p onClick={() => { setMenuOpen(false); goProtected("/movie") }}>Movie</p>
          <p onClick={() => { setMenuOpen(false); goProtected("/theater") }}>Theater</p>
          <p onClick={() => { setMenuOpen(false); goProtected("/contact") }}>Contact</p>
          <p onClick={() => { setMenuOpen(false); goProtected("/about") }}>About</p>

        </div>
      </div>

    </div>
  )
}