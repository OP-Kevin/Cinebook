"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaUserCircle, FaFilm } from "react-icons/fa"
import BackButton from "@/Component/BackButton"
import { BACKEND_URL } from "@/utils/api"
import { getLoggedUser } from "@/utils/auth"

type User = {
    _id: string
    name: string
    email: string
}

type Booking = {
    movieName: string
    theaterName: string
    date: string
    seats: string[]
    total: number
}

export default function ProfilePage() {

    const router = useRouter()

    const [user] = useState<User | null>(() => getLoggedUser())
    const [history, setHistory] = useState<Booking[]>([])
 
    useEffect(() => {
        const userData = getLoggedUser()
        if (!userData) {
            window.location.href = "/login"
            return
        }

        fetch(`${BACKEND_URL}/api/bookings/history/${userData._id}`)
            .then((res) => res.json())
            .then((data) => {
                setHistory(data.bookings || [])
            })
            .catch(() => {
                setHistory([])
            })

    }, [])

    const handleLogout = () => {
        fetch(`${BACKEND_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        }).finally(() => {
            document.cookie = "loggedUser=; Max-Age=0; path=/"
            router.push("/login")
        })
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black px-3 sm:px-6 py-6">

            <BackButton />

            {/* ⭐ CENTER CARD */}
            {/* ⭐ CENTER CARD */}
            <div className="mt-24 md:mt-16 flex justify-center items-start md:items-center min-h-[85vh]">

                <div
                    className=" w-full max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10 ">

                    {/* ⭐ PROFILE HEADER */}
                    {/* ⭐ PROFILE HEADER */}
                    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-4">

                        {/* ⭐ LEFT SIDE (Icon + Info) */}
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-4">

                            <FaUserCircle className="text-white text-6xl md:text-7xl" />

                            <div className="text-white">
                                <h1 className="text-xl md:text-2xl font-bold">
                                    {user.name}
                                </h1>

                                <p className="text-gray-300 text-sm break-all">
                                    {user.email}
                                </p>
                            </div>

                        </div>

                        {/* ⭐ RIGHT SIDE LOGOUT (Desktop) */}
                        <button
                            onClick={handleLogout}
                            className=" hidden md:block bg-red-500 hover:bg-red-600  px-6 py-3 rounded-xl text-white font-semibold"
                        >
                            Logout
                        </button>

                    </div>

                    {/* ⭐ MOBILE LOGOUT BUTTON */}
                    <button
                        onClick={handleLogout}
                        className=" md:hidden  mt-4  w-full bg-red-500 hover:bg-red-600  py-2  rounded-xl text-white font-semibold"
                    >
                        Logout
                    </button>

                    {/* ⭐ HISTORY TITLE */}
                    <h2 className="text-white text-lg sm:text-xl mt-6 mb-3">
                        Booking History
                    </h2>

                    {history.length === 0 ? (
                        <p className="text-gray-300 text-sm">
                            No Bookings Yet
                        </p>
                    ) : (

                        // ⭐ SCROLL CONTAINER ADD KARVO
                        <div className="space-y-3 max-h-100 overflow-y-auto overflow-x-hidden pr-2">

                            {history.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white/10 border border-white/20 rounded-xl p-3 text-white"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <FaFilm />
                                        <p className="font-semibold">
                                            {item.movieName}
                                        </p>
                                    </div>

                                    <p className="text-sm">
                                        Theater: {item.theaterName}
                                    </p>

                                    <p className="text-sm">
                                        Date: {item.date}
                                    </p>

                                    <p className="text-sm break-words">
                                        Seats: {item.seats.join(", ")}
                                    </p>

                                    <p className="font-bold mt-1">
                                        ₹ {item.total}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}