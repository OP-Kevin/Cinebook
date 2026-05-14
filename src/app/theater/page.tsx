"use client"

import TheaterCard from "@/Component/TheaterCard"
import data from "@/Data/Moviedata.json"

export default function TheaterDetails() {

  const theaters = data.theaters

  return (
    <div className="bg-linear from-black via-purple-900 to-black py-20">

      <h1 className="text-4xl text-white text-center font-bold mt-5 mb-12">
        All Theaters
      </h1>

      <div className="flex flex-col gap-16 items-center">

        {theaters.map((theater) => (
          <TheaterCard key={theater.theaterId} theaters={theater} />
        ))}

      </div>

    </div>
  )
}