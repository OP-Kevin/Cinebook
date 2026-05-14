"use client"

import BackButton from "@/Component/BackButton"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 py-12">

      <BackButton/>

      <div className="max-w-6xl mx-auto mt-10">

        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to CineBook 🎬
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-8">
            CineBook is a modern online movie ticket booking platform designed
            to make cinema experience faster, easier and more enjoyable.
            Users can explore latest movies, check real-time show timings,
            select seats visually and manage booking history in one place.
          </p>
        </div>

        {/* OUR STORY */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <img
            src="/Cinema.jpg"
            className="rounded-3xl shadow-2xl"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-400 leading-7 mb-4">
              CineBook was created with the vision of simplifying movie ticket
              booking. Traditional booking systems are slow and confusing.
              Our platform focuses on user-friendly design and fast performance.
            </p>
            <p className="text-gray-400 leading-7">
              We aim to provide a seamless digital cinema experience where users
              can instantly discover movies, compare theaters and book tickets
              without waiting in long queues.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Platform Features 🚀
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
              <div className="text-3xl mb-2">🎥</div>
              <h3 className="font-semibold mb-2">Latest Movies</h3>
              <p className="text-gray-400 text-sm">
                Explore trending and upcoming movies with full details.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
              <div className="text-3xl mb-2">💺</div>
              <h3 className="font-semibold mb-2">Seat Selection</h3>
              <p className="text-gray-400 text-sm">
                Interactive cinema seat layout for easy booking.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Fast Booking</h3>
              <p className="text-gray-400 text-sm">
                Instant ticket confirmation and smooth performance.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Booking History</h3>
              <p className="text-gray-400 text-sm">
                Track all your movie bookings in your profile.
              </p>
            </div>

          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-gradient-to-br from-red-500/20 to-purple-500/20 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-3">🎯 User Friendly</h3>
            <p className="text-gray-300 text-sm">
              Simple and clean interface designed for everyone.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-purple-500/20 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-3">🔒 Secure Booking</h3>
            <p className="text-gray-300 text-sm">
              Safe data storage and reliable ticket management.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-purple-500/20 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-3">🌍 Multiple Cities</h3>
            <p className="text-gray-300 text-sm">
              Book tickets across various theaters and locations.
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 text-center mb-16">

          <div>
            <h2 className="text-4xl font-bold text-red-500">50+</h2>
            <p className="text-gray-400">Movies</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-red-500">25+</h2>
            <p className="text-gray-400">Theaters</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-red-500">10K+</h2>
            <p className="text-gray-400">Bookings</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-red-500">5+</h2>
            <p className="text-gray-400">Cities</p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Book Your Movie?
          </h2>
          <p className="text-gray-400 mb-6">
            Explore movies now and reserve your favorite seats instantly.
          </p>

          <Link
            href="/"
            className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-semibold"
          >
            Browse Movies
          </Link>
        </div>

      </div>
    </div>
  )
}