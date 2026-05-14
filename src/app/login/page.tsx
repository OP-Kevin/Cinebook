"use client"

import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaEye, FaEyeSlash, FaRegEnvelope, FaRegUser } from "react-icons/fa"
import { BACKEND_URL } from "@/utils/api"

export default function LoginPage() {

    const [isLogin, setIsLogin] = useState(true)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const isStrongPassword = (pass: string) => {
        return pass.length >= 6
    }

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name.trim().length < 3) {
            toast.error("Username must be at least 3 characters", { autoClose: 800 })
            return
        }

        if (!isValidEmail(email)) {
            toast.error("Enter valid email", { autoClose: 800 })
            return
        }

        if (!isStrongPassword(password)) {
            toast.error("Password must be at least 6 characters", { autoClose: 800 })
            return
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()
            if (!res.ok) {
                toast.warning(data.message || "Registration failed", { autoClose: 800 })
                return
            }

            toast.success("Registration Successful 🎉", { autoClose: 800 })
        } catch {
            toast.error("Backend server not running", { autoClose: 1000 })
            return
        }

        setName("")
        setEmail("")
        setPassword("")

        setTimeout(() => setIsLogin(true), 1500)
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isValidEmail(email)) {
            toast.error("Enter valid email", { autoClose: 800 })
            return
        }

        if (!password) {
            toast.error("Enter password", { autoClose: 800 })
            return
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            if (!res.ok) {
                toast.error(data.message || "Invalid Credentials", { autoClose: 800 })
                return
            }

            toast.success("Login Successful 🎬", { autoClose: 800 })
        } catch {
            toast.error("Backend server not running", { autoClose: 1000 })
            return
        }

        setTimeout(() => {
            window.location.href = "/"
        }, 2000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">

            <div className="relative w-full max-w-5xl lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_0_70px_#7c3aed] flex flex-col lg:flex-row">

                {/* LOGIN */}
                <div className={`w-full lg:w-1/2 flex items-center justify-center bg-black p-8 ${isLogin ? "block" : "hidden lg:flex"}`}>

                    <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
                        <h2 className="text-white text-3xl font-bold text-center">Login</h2>

                        <div className="relative">

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-purple-500 text-white p-2 pr-8 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <FaRegEnvelope className="absolute right-2 top-1  text-sm" />

                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full bg-transparent border-b border-purple-500 text-white p-2 outline-none pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-3 text-gray-400 cursor-pointer"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 p-3 rounded-full text-white">
                            Login
                        </button>

                        <p className="text-gray-400 text-sm text-center">
                            Don’t have account ?
                            <span onClick={() => setIsLogin(false)} className="text-purple-500 ml-2 cursor-pointer">
                                Sign Up
                            </span>
                        </p>
                    </form>
                </div>

                {/* REGISTER */}
                <div className={`w-full lg:w-1/2 flex items-center justify-center bg-black p-8 ${!isLogin ? "block" : "hidden lg:flex"}`}>

                    <form onSubmit={handleRegister} className="w-full max-w-sm space-y-6">
                        <h2 className="text-white text-3xl font-bold text-center">Sign Up</h2>

                        <div className="relative">

                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full bg-transparent border-b border-purple-500 text-white p-2 pr-8 outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <FaRegUser className="absolute right-2 top-1 text-sm" />

                        </div>
                        <div className="relative">

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-purple-500 text-white p-2 pr-8 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <FaRegEnvelope className="absolute right-2 top-1 text-sm" />

                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full bg-transparent border-b border-purple-500 text-white p-2 outline-none pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-3 text-gray-400 cursor-pointer"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 p-3 rounded-full text-white">
                            Sign Up
                        </button>

                        <p className="text-gray-400 text-sm text-center">
                            Already have account ?
                            <span onClick={() => setIsLogin(true)} className="text-purple-500 ml-2 cursor-pointer">
                                Login
                            </span>
                        </p>
                    </form>
                </div>

                {/* PANEL */}
                <div className={`hidden lg:flex absolute top-0 w-1/2 h-full bg-gradient-to-br from-purple-700 to-purple-900 text-white p-12 flex-col justify-center transition-all duration-700
${isLogin ? "left-1/2 rounded-l-[120px]" : "left-0 rounded-r-[120px]"}`}>

                    {isLogin ? (
                        <>
                            <h1 className="text-4xl font-bold mb-4">WELCOME BACK!</h1>
                            <p className="opacity-80 text-sm">
                                Login to continue your movie booking journey.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                            <p className="opacity-80 text-sm">
                                Register with your personal details to book your movies.
                            </p>
                        </>
                    )}

                </div>

            </div>

            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </div>
    )
}