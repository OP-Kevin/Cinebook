"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function CastSwiper({ movie }: any) {

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl">

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center sm:text-left">
          Cast & Crew
        </h2>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          loop
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}

          navigation
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >

          {/* Director */}
          <SwiperSlide>
            <div className="text-center">
              <img
                src="/D.png"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto object-cover"
              />
              <h4 className="mt-3 text-sm sm:text-base font-semibold">
                {movie.director}
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">Director</p>
            </div>
          </SwiperSlide>

          {/* Cast */}
          {movie.cast.map((actor: any, i: number) => (
            <SwiperSlide key={i}>
              <div className="text-center">
                <img
                  src="/person.png"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto object-cover"
                />
                <h4 className="mt-3 text-sm sm:text-base font-semibold">
                  {actor.name}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {actor.role}
                </p>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  )
}