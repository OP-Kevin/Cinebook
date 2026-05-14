"use client"

import React, { useState } from "react"
import data from "@/Data/Moviedata.json"
import Link from "next/link"
import { useParams } from "next/navigation"
import BackButton from "@/Component/BackButton"

export default function Page() {

  const params = useParams()
  const movieId = Number(params.id)

  const movie = data.movies.find(m => m.id === movieId)

  const today = new Date()

  // ⭐ Dynamic Date Generate
  const dates = [...Array(4)].map((_, i) => {
    const d = new Date()
    d.setDate(today.getDate() + i)
    return d.toISOString().split("T")[0]
  })

  const [selectedDate, setSelectedDate] = useState(dates[0])

  const theaters = data.theaters.filter(th =>
    th.movieIds.includes(movieId)
  )

  const getTag = (seats: number) => {
    if (seats === 0) return { text: "HOUSEFULL", color: "bg-gray-600" }
    if (seats < 30) return { text: "FAST FILLING", color: "bg-orange-500" }
    if (seats < 70) return { text: "FILLING", color: "bg-yellow-500" }
    return { text: "AVAILABLE", color: "bg-green-600 text-white" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white py-16 relative">

    {/* ⭐ Back Button */}
    <BackButton/>

    <div className="max-w-5xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-8 mt-10">
          
          {movie?.title}
        </h1>

        {/* ⭐ Date Selector */}
        <div className="flex gap-3 mb-10 flex-wrap">
  
          {dates.map((d, i) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-5 py-2 rounded-xl border transition
              ${selectedDate === d
                  ? "bg-red-500 border-red-500"
                  : "border-white/20 hover:bg-white/10"
                }`}
            >
              {i === 0 ? "Today" : i === 1 ? "Tomorrow" : d}
            </button>
          ))}
        </div>

        {/* ⭐ Theater List */}
        <div className="space-y-8">

          {theaters.map((t) => {

            const shows = data.shows.filter((s: any) => {

              const showDate = new Date()
              showDate.setDate(today.getDate() + s.dayOffset)

              const formatted = showDate.toISOString().split("T")[0]

              return (
                s.movieId === movieId &&
                s.theaterId === t.theaterId &&
                formatted === selectedDate
              )
            })

            if (shows.length === 0) return null

            return (
              <div
                key={t.theaterId}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl"
              >

                <div className="flex justify-between">

                  <div>
                    <div className="text-2xl font-semibold">
                      {t.name}
                    </div>

                    <div className="text-gray-400 text-sm">
                      📍 {t.location}, {t.city}
                    </div>
                  </div>

                  <div className="text-gray-400">
                    🎥 {t.screens} Screens
                  </div>

                </div>

                <div className="flex flex-wrap gap-4 mt-6">

                  {shows.map((sh: any) => {

                    const tag = getTag(sh.availableSeats)

                    return (
                      <Link
                        key={sh.showId}
                       href={`/seat/${sh.showId}?date=${selectedDate}`}
                        className="px-6 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
                      >
                        <div>{sh.time}</div>

                        <div className={`text-xs mt-1 px-2 rounded ${tag.color}`}>
                          {tag.text}
                        </div>
                      </Link>
                    )
                  })}

                </div>

              </div>
            )
          })}

        </div>

      </div>

    </div>
  )
}