"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getLoggedUser, isLoggedIn } from "@/utils/auth"
import { BACKEND_URL } from "@/utils/api"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedUser, setLoggedUser] = useState<any>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const user = getLoggedUser()
    if (user) setLoggedUser(user)
  }, [])

  const handleLogout = async () => {
    await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
    document.cookie = "loggedUser=; Max-Age=0; path=/"
    setLoggedUser(null)
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
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 ">

      {/* TOP NAV */}
      <div className="relative flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-black w-9 h-9 flex items-center justify-center rounded-md">🎬</div>
          <Link
            href="/"
            className="text-white font-extrabold text-xl tracking-wider hover:[-webkit-text-stroke:1px_#ec4899] hover:[text-shadow:0_0_5px_#ec4899] transition duration-300" >
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
            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold cursor-pointer"
              >
                {loggedUser.name?.charAt(0).toUpperCase()}
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-3 bg-black p-4 rounded-xl w-44 text-white">
                  <p className="mb-2">{loggedUser.name}</p>

                  <p onClick={() => goProtected("/profile")} className="cursor-pointer hover:text-purple-400 mb-2">
                    Profile
                  </p>

                  <p onClick={handleLogout} className="cursor-pointer hover:text-red-400">
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

          {/* ⭐ HAMBURGER */}
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

      {/* ⭐ MOBILE MENU */}
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