"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { isLoggedIn } from "@/utils/auth"

export default function Footer() {

  const router = useRouter()

  const goProtected = (path:string) => {
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }
    router.push(path)
  }

  return (
    <footer className="bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">CineBook</h1>
          <p className="text-gray-400 mt-2">
            Book movie tickets online easily and quickly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">

            {/* HOME Always Open */}
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>

            {/* Protected */}
            <li>
              <p onClick={() => goProtected("/movie")} className="cursor-pointer hover:text-white">
                Movie
              </p>
            </li>

            <li>
              <p onClick={() => goProtected("/theater")} className="cursor-pointer hover:text-white">
                Theater
              </p>
            </li>

            <li>
              <p onClick={() => goProtected("/contact")} className="cursor-pointer hover:text-white">
                Contact
              </p>
            </li>

            <li>
              <p onClick={() => goProtected("/about")} className="cursor-pointer hover:text-white">
                About
              </p>
            </li>

          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-semibold mb-3">Support</h2>
          <ul className="space-y-2 text-gray-400">
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4 text-gray-400">
            <Link href="https://www.instagram.com/">Instagram</Link>
            <Link href="https://x.com/">Twitter</Link>
            <Link href="https://www.facebook.com/">Facebook</Link>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-gray-500">
        © 2026 CineBook. All rights reserved.
      </div>

    </footer>
  )
}