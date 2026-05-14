"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import data from "@/Data/Moviedata.json"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { requireLogin } from "@/utils/auth"

export default function HeroCarousel() {
 const router = useRouter()
  const movies = data.movies.filter((m) => m.comingSoon == false && m.rating >= 7).slice(0, 5)

  return (
    <div className="md:h-auto md:h-[70vh] bg-linear-to from-black via-purple-900 to-black  flex items-center pb-10">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full "
      >

        {movies.map((movie) => (

          <SwiperSlide key={movie.id}>

            <div
              className="h-auto md:h-[80vh] py-20 md:py-0 relative flex items-center justify-center"
              style={{
                backgroundImage: `url(${movie.poster})`,
                backgroundPosition: "center",
                backgroundSize: "90%"
              }}
            >

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-purple-950"></div>

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:grid md:grid-cols-2 items-center px-6 md:px-10 gap-6 md:gap-10 pt-16 md:pt-0">

                {/* POSTER (Mobile first) */}
                <div className="flex justify-center order-1 md:order-2  ">

                  <img
                    src={movie.poster || "/defaultmovie.jpg"}
                    alt={movie.title}
                    className="h-[320px] md:h-[420px] w-[220px] md:w-[300px] object-cover rounded-xl shadow-2xl hover:scale-105 transition duration-300"
                  />

                </div>

                {/* MOVIE DETAILS */}
                <div className="order-2 md:order-1 text-center md:text-left">

                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {movie.title}
                  </h1>

                  <p className="text-gray-300 mb-4">
                    ⭐ {movie.rating} | {movie.genre?.join(", ")}
                  </p>
                  <Link href={`/movies/${movie.id}`}>
                    <button  onClick={() => requireLogin(router, `/movies/${movie.id}`)}
                    className="bg-gradient-to-r from-purple-900 to-purple-700 px-6 py-3 rounded-lg font-medium hover:scale-105 transition shadow-xl shadow-purple-900/50 cursor-pointer">
                      Book Now
                    </button>
                  </Link>
                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>

  )

}
