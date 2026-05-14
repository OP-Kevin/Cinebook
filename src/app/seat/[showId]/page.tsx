"use client"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import data from "@/Data/Moviedata.json"
import BackButton from "@/Component/BackButton"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSearchParams } from "next/navigation"
import { BACKEND_URL } from "@/utils/api"
import { getLoggedUser } from "@/utils/auth"

export default function SeatPage() {

  const params = useParams()
  const showId = Number(params.showId)
  const router = useRouter()
  const show = data.shows.find(s => s.showId === showId)
  const movie = data.movies.find(m => m.id === show?.movieId)
  const theater = data.theaters.find(t => t.theaterId === show?.theaterId)
  const search = useSearchParams()
  const selectedDate = search.get("date")
  const totalSeats = show?.availableSeats || 60

  const seatsPerRow = 10
  const totalRows = Math.ceil(totalSeats / seatsPerRow)

  const rows = Array.from({ length: totalRows }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  const [bookedSeats, setBookedSeats] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/seats/${showId}`)
        const data = await res.json()
        setBookedSeats(data.bookedSeats || [])
      } catch {
        setBookedSeats([])
      }
    }

    fetchBookedSeats()
  }, [showId])

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return

    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    )
  }
  const bookNow = () => {

    const loggedUser = getLoggedUser()

    if (!loggedUser?.email) {
      toast.error("Login Required", { autoClose: 900 })
      return
    }

    const total = selectedSeats.length * (show?.price || 200)

    // ⭐ IMPORTANT — NO line break in URL
    router.push(
      `/payment/${showId}?seats=${JSON.stringify(selectedSeats)}&total=${total}&date=${selectedDate}`
    )
  }

  return (
    <div className="min-h-screenbg-linear from-black via-purple-900 to-black  flex flex-col items-center mt-20 pb-10">
      <BackButton />
      {/* ⭐⭐⭐ CINEMA TOP AREA */}
      <div className="w-full  pt-6 pb-10 flex flex-col items-center">

        <div className="text-gray-400 text-sm mb-3 tracking-widest">
          SCREEN
        </div>

        {/* ⭐ CURVED ARC SCREEN */}
        <div className="relative w-[95%] max-w-[650px] h-24">

          {/* Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-24 
          bg-gradient-to-t from-red-900/40 via-red-600/20 to-transparent 
          rounded-t-[100%] blur-md"></div>

          {/* Red Curve Line */}
          <div className="absolute bottom-0 left-0 right-0 h-24 
          border-t-2 border-red-500 rounded-t-[100%]"></div>

        </div>

      </div>

      {/* ⭐ SEAT MAP */}
      <div className="space-y-2 w-full mt-6">

        {rows.map((row) => (

          <div key={row} className="flex items-center justify-center gap-2">

            <div className="text-xs text-gray-400 w-6 text-center">{row}</div>

            {/* LEFT */}
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, colIndex) => {

                const seatNo = `${row}${colIndex + 1}`
                const isBooked = bookedSeats.includes(seatNo)
                const isSelected = selectedSeats.includes(seatNo)

                return (
                  <div
                    key={seatNo}
                    onClick={() => toggleSeat(seatNo)}
                    className={`w-8 h-8 rounded-t-md border flex items-center justify-center text-[10px] font-bold cursor-pointer transition
                    ${isBooked
                        ? "bg-gray-600 border-gray-600 cursor-not-allowed"
                        : isSelected
                          ? "bg-red-500 border-red-500 scale-110"
                          : "bg-white border-white text-black"}
                    `}
                  >
                    {seatNo}
                  </div>
                )
              })}
            </div>

            {/* AISLE */}
            <div className="w-4"></div>

            {/* RIGHT */}
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, colIndex) => {

                const seatNo = `${row}${colIndex + 6}`
                const isBooked = bookedSeats.includes(seatNo)
                const isSelected = selectedSeats.includes(seatNo)

                return (
                  <div
                    key={seatNo}
                    onClick={() => toggleSeat(seatNo)}
                    className={`w-8 h-8 rounded-t-md border flex items-center justify-center text-[10px] font-bold cursor-pointer transition
                    ${isBooked
                        ? "bg-gray-600 border-gray-600 cursor-not-allowed"
                        : isSelected
                          ? "bg-red-500 border-red-500 scale-110"
                          : "bg-white border-white text-black"}
                    `}
                  >
                    {seatNo}
                  </div>
                )
              })}
            </div>

            <div className="text-xs text-gray-400 w-6 text-center">{row}</div>

          </div>

        ))}

      </div>

      {/* ⭐ LEGEND */}
      <div className="flex gap-6 mt-10 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded"></div> Booked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded"></div> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div> Selected
        </div>
      </div>

      {/* ⭐ BOOK BUTTON */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 flex flex-col items-center">

          <div className="text-sm mb-3">
            Selected Seats: {selectedSeats.join(", ")}
          </div>

          <button
            onClick={bookNow}
            className="bg-red-500 hover:bg-red-600 px-10 py-3 rounded-xl"
          >
            Book Now
          </button>

        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>

  )
}