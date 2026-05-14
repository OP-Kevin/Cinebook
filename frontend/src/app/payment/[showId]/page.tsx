"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import data from "@/Data/Moviedata.json"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BACKEND_URL } from "@/utils/api"
import { getAuthHeaders, getAuthToken, getLoggedUser } from "@/utils/auth"

type RazorpayInstance = {
    open: () => void
}

type RazorpayConstructor = new (options: unknown) => RazorpayInstance

declare global {
    interface Window {
        Razorpay?: RazorpayConstructor
    }
}

export default function PaymentPage() {

    const params = useParams()
    const router = useRouter()
    const search = useSearchParams()

    const date = search.get("date") || "Today"
    const showId = Number(params.showId)
    const seats = JSON.parse(search.get("seats") || "[]") as string[]

    const show = data.shows.find(s => s.showId === showId)
    const movie = data.movies.find(m => m.id === show?.movieId)
    const theater = data.theaters.find(t => t.theaterId === show?.theaterId)

    const price = show?.price || 200
    const subtotal = seats.length * price

    const [coupon, setCoupon] = useState("")
    const [discount, setDiscount] = useState(0)
    const [loading, setLoading] = useState(false)

    const total = Math.max(subtotal - discount, 0)

    const applyCoupon = () => {

        const coupons: Record<string, number> = {
            MOVIE50: 50,
            CINEMA100: 100,
            SUPER200: 200,
            HARI500: 500,
            MOVIE20: 200
        }

        if (!coupon) {
            toast.error("Enter Coupon",{autoClose:900})
            return
        }

        if (coupons[coupon]) {
            setDiscount(coupons[coupon])
            toast.success(`₹${coupons[coupon]} OFF Applied`,{autoClose:900})
        } else {
            toast.error("Invalid Coupon",{autoClose:900})
        }
    }


    const handlePayment = async () => {
    setLoading(true)

    const user = getLoggedUser()

    if (!user?.email) {
        toast.error("Login Required",{autoClose:900})
        router.push("/login")
        setLoading(false)
        return
    }

    if (!getAuthToken()) {
        toast.error("Please login again to continue",{autoClose:900})
        router.push("/login")
        setLoading(false)
        return
    }

   
    try {

        const res = await fetch("/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total })
        })

        if (!res.ok) {
            alert("Server Error")
            setLoading(false)
            return
        }

        const order = await res.json()

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string,
            amount: order.amount,
            currency: "INR",
            name: "CineBook",
            description: movie?.title,
            order_id: order.id,

            handler: function () {

                const newBooking = {
                    showId,
                    movieName: movie?.title,
                    theaterName: theater?.name,
                    date,
                    seats,
                    total
                }

                fetch(`${BACKEND_URL}/api/bookings`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(newBooking)
                })
                    .then(async (response) => {
                        const data = await response.json()
                        if (!response.ok) {
                            toast.error(data.message || "Booking save failed", { autoClose: 1000 })
                            setLoading(false)
                            return
                        }

                        toast.success("Payment Successful 🎉",{autoClose:900})
                        setTimeout(() => {
                            router.push("/bill")
                        }, 1200)
                    })
                    .catch(() => {
                        toast.error("Booking save failed", { autoClose: 1000 })
                        setLoading(false)
                    })
            },

            theme: {
                color: "#ec4899"
            }
        }

        if (!window.Razorpay) {
            toast.error("Razorpay SDK not loaded", { autoClose: 1000 })
            setLoading(false)
            return
        }

        const rzp = new window.Razorpay(options)
        rzp.open()

    } catch {
        alert("Payment Failed")
        setLoading(false)
    }
}
    const removeCoupon = () => {
        setCoupon("")
        setDiscount(0)
        toast.info("Coupon Removed",{autoClose:900})
    }
    return (

        <div className="min-h-screen  bg-linear from-black via-purple-900 to-black  text-white flex items-center justify-center p-6">


            <div className="w-[440px] bg-white/5 backdrop-blur-3xl border border-cyan-400/20 rounded-[40px] p-6 shadow-[0_0_80px_#00eaff30] space-y-2">
                {/* ⭐ MOVIE CARD */}
                <div className="bg-white/5 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-5 shadow-[0_0_40px_#00eaff30]">

                    <div className="flex gap-4">

                        <img
                            src={movie?.poster}
                            className="w-24 h-32 object-cover rounded-2xl shadow-xl"
                        />

                        <div className="flex-1">

                            <h1 className="text-xl font-bold tracking-wide">
                                {movie?.title}
                            </h1>

                            <div className="text-xs text-gray-300 mt-2 space-y-1">

                                <p className="text-cyan-300">⭐ {movie?.rating}</p>
                                <p>🎬 {theater?.name}</p>
                                <p>📅 {date}</p>
                                <p>⏰ {show?.time}</p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ⭐ SEATS CARD */}
                <div className="bg-white/5 backdrop-blur-2xl border border-pink-400/20 rounded-3xl p-5 shadow-[0_0_40px_#ff00ff20]">

                    <p className="text-sm text-gray-400 mb-3">Selected Seats</p>

                    <div className="flex flex-wrap gap-2">
                        {seats.map(s => (
                            <div
                                key={s}
                                className="px-3 py-1 text-sm rounded-full bg-pink-500/20 border border-pink-400 text-pink-300"
                            >
                                {s}
                            </div>
                        ))}
                    </div>

                </div>

                {/* ⭐ PRICE CARD */}
                <div className="bg-white/5 backdrop-blur-2xl border border-purple-400/20 rounded-3xl p-5 shadow-[0_0_40px_#8b5cf620] space-y-3">

                    <div className="flex justify-between text-sm">
                        <span>Ticket Price</span>
                        <span>₹{price}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Seats</span>
                        <span>{seats.length}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between text-green-400 text-sm">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                    </div>

                    <div className="border-t border-white/10 pt-3 flex justify-between text-2xl font-bold">
                        <span>Total</span>
                        <span className="text-cyan-300">₹{total}</span>
                    </div>

                </div>

                {/* ⭐ COUPON */}
                <div className="bg-white/5 backdrop-blur-2xl border border-blue-400/20 rounded-3xl p-4 shadow-[0_0_40px_#00aaff20] flex gap-2">

                    <input
                        value={coupon}
                        onChange={(e) => {
                            const value = e.target.value.toUpperCase()
                            setCoupon(value)

                            // ⭐ If user clears input manually
                            if (value === "") {
                                setDiscount(0)
                            }
                        }}
                        placeholder="Enter Coupon"
                        className="flex-1 bg-transparent border border-white/20 rounded-xl px-3 py-2 outline-none text-sm"
                    />

                    {/* ⭐ Button Logic */}
                    {discount > 0 ? (
                        <button
                            onClick={removeCoupon}
                            className="bg-red-500 hover:bg-red-600 px-4 rounded-xl text-sm font-semibold"
                        >
                            Remove
                        </button>
                    ) : (
                        <button
                            onClick={applyCoupon}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 rounded-xl text-sm font-semibold"
                        >
                            Apply
                        </button>
                    )}

                </div>

                {/* ⭐ PAY BUTTON */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 rounded-3xl font-bold text-lg bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 shadow-[0_0_25px_#ff00ff80] hover:scale-105 transition"
                >
                    {loading ? "Processing..." : `Pay ₹${total}`}
                </button>
            </div>


            <ToastContainer theme="dark" position="top-center" />

        </div>
    )
}