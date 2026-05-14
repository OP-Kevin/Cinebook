"use client"
type Theater = {
  theaterId: number
  name: string
  city: string
  location: string
  screens: number
  movieIds: number[]
}

import data from "@/Data/Moviedata.json"
import "swiper/css"
import "swiper/css/navigation"
// import { useEffect, useState } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"

export default function TheaterCard({ theaters }: { theaters: Theater }) {

  

  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // if (!mounted) return null

  const movies = data.movies

  const theaterMovies = movies.filter((movie) =>
    theaters.movieIds.includes(Number(movie.id))
  )

  return (
    <div className="w-[95%] md:w-[90%] lg:w-[1200px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 md:p-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-white mb-2">{theaters.name}</h2>
      <p className="text-gray-400 mb-6">{theaters.location}, {theaters.city}</p>

      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 }
        }}
      >
        {theaterMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
            {/* D:\vektosys\Nextjs\my-cinebook\src\app\movies\[id]\page.tsx */}
              <div
                className="cursor-pointer group" >

                <img
                  src={movie.poster || "/defaultmovie.jpg"}
                  className="w-full h-[260px] object-cover rounded-2xl group-hover:scale-105 transition"
                />

                <p className="text-white mt-2 font-semibold line-clamp-1">
                  {movie.title}
                </p>

                <p className="text-yellow-400 text-sm">
                  ⭐ {movie.rating}
                </p>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}