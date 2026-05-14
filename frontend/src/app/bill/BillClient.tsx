"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BACKEND_URL } from "@/utils/api";
import { getAuthHeaders, getLoggedUser } from "@/utils/auth";

export default function BillPage() {
  const search = useSearchParams();
  const router = useRouter();

  const [booking, setBooking] = useState<{
    movie: string;
    theater: string;
    date: string;
    seats: string[];
    total: number | string;
  } | null>(null);

  useEffect(() => {
    const user = getLoggedUser();

    if (!user?._id) {
      router.push("/login");
      return;
    }

    const fallbackFromQuery = () => {
      const movie = decodeURIComponent(search.get("movie") || "");
      const theater = decodeURIComponent(search.get("theater") || "");
      const date = decodeURIComponent(search.get("date") || "");
      const seatsParam = search.get("seats");

      const seats = seatsParam
        ? decodeURIComponent(seatsParam).split(",")
        : [];

      const total = search.get("total") || "0";

      setBooking({ movie, theater, date, seats, total });
    };

    fetch(`${BACKEND_URL}/api/bookings/latest/${user._id}`, {
      headers: {
        ...getAuthHeaders(),
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (data.booking) {
          setBooking({
            movie: data.booking.movieName,
            theater: data.booking.theaterName,
            date: data.booking.date,
            seats: data.booking.seats,
            total: data.booking.total,
          });
          return;
        }
        fallbackFromQuery();
      })
      .catch(() => {
        fallbackFromQuery();
      });
  }, [search]);

  const handleDownload = () => {
    window.print();
  };

  if (!booking) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-purple-900 to-black text-white flex flex-col items-center justify-center px-4 py-6">

      {/* Glow */}
      <div className="absolute top-10 left-10 w-40 sm:w-72 h-40 sm:h-72 bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-40 sm:w-72 h-40 sm:h-72 bg-pink-600 opacity-20 blur-[120px] rounded-full"></div>

      {/* Wrapper */}
      <div className="w-full flex flex-col items-center">

        {/* Ticket */}
        <div
          id="bill-section"
          className="w-full max-w-md bg-white text-black rounded-2xl overflow-hidden shadow-2xl print:shadow-none"
        >

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 sm:p-4 text-center font-bold text-base sm:text-lg">
            🎬 CineBook Ticket
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 text-xs sm:text-sm">

            <p><b>Movie:</b> {booking.movie}</p>
            <p><b>Theater:</b> {booking.theater}</p>
            <p><b>Date:</b> {booking.date}</p>
            <p><b>Seats:</b> {booking.seats.join(", ")}</p>

            <div className="border-t pt-3 text-base sm:text-lg font-bold">
              Total: ₹{booking.total}
            </div>

            {/* QR */}
            <div className="flex justify-center mt-3 sm:mt-4">
              <QRCodeCanvas
                value={JSON.stringify({
                  movie: booking.movie,
                  seats: booking.seats,
                  total: booking.total,
                  date: booking.date,
                })}
                size={100} // smaller for mobile
              />
            </div>

          </div>

          {/* Footer */}
          <div className="border-t p-2 sm:p-3 text-center text-[10px] sm:text-xs text-gray-500">
            🎟 Show this ticket at entry
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 w-full max-w-md print:hidden">

          <button
            onClick={handleDownload}
            className="w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:scale-105 transition"
          >
            📄 Download PDF
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:scale-105 transition"
          >
            🎬 Home
          </button>

        </div>

      </div>
    </div>
  );
}