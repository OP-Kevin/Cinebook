"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { requireLogin } from "@/utils/auth"

type Movies = {
  id: number
  title: string
  poster?: string
  rating: number
  price: number
  runtime: string | number
  language: string | string[]
  releaseDate: string
}

export default function HomeCard({ movies }: { movies: Movies }) {

  const fullDate = new Date(movies.releaseDate).toDateString()
  const router = useRouter()

  const handleClick = (e: any) => {
    e.preventDefault()
    requireLogin(router, `/movies/${movies.id}`)
  }

  return (

    <div className="group">

      {/* Poster */}
      <Link href={`/movies/${movies.id}`} onClick={handleClick}>
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">

          <img
            src={movies.poster || "/defaultmovie.jpg"}
            alt={movies.title}
            className="w-full h-[260px] sm:h-[260px] md:h-[340px] lg:h-[420px] object-cover rounded-xl sm:rounded-2xl transition duration-300 group-hover:scale-105 cursor-pointer"
          />

          {/* Rating */}
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg font-bold shadow">
            ⭐ {movies.rating}
          </div>

        </div>
      </Link>

      {/* Content */}
      <div className="mt-2 sm:mt-3">

        {/* Title */}
        <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl leading-tight line-clamp-1">
          {movies.title}
        </h3>

        {/* Language + Runtime */}
        <div className="flex justify-between text-gray-400 text-[11px] sm:text-sm mt-1">

          <span className="line-clamp-1">
            {Array.isArray(movies.language)
              ? movies.language.join(", ")
              : movies.language}
          </span>

          <span className="bg-white/10 px-2 rounded text-[11px] sm:text-sm">
            {movies.runtime}
          </span>

        </div>

        {/* Price */}
        <p className="text-green-400 font-bold text-sm sm:text-lg mt-1 sm:mt-2">
          ₹ {movies.price}
        </p>

        <Link href={`/movies/${movies.id}`} onClick={handleClick}>
          <button className="mt-2 w-full cursor-pointer text-white border border-white bg-gradient-to-r from-black via-purple-600 to-black py-2 rounded-lg font-medium transition hover:scale-105">
            Book Tickets
          </button>
        </Link>

      </div>

    </div>

  )
}