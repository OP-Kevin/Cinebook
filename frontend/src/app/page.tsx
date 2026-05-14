import data from "@/Data/Moviedata.json"
import Herosection from "@/Component/Herosection"
import HomeCard from "@/Component/HomeCard"
import SoonCard from "@/Component/SoonCard"

export default function Home() {

  const popularMovies = data.movies
    .filter((m) => m.rating >= 7 && m.comingSoon === false)
    .slice(0, 8)

  const upcomingMovies = data.movies
    .filter((m) => m.comingSoon === true)
    .slice(0, 4)

  return (
 
    <div className="bg-black text-white">

      {/* HERO SECTION */}
      <Herosection />


      {/* POPULAR MOVIES */}
      <section className="bg-gradient-to-b from-black via-purple-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-12 text-center">
            Now Showing
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularMovies.map((m) => (
              <HomeCard key={m.id} movies={m} />
            ))}
          </div>

        </div>
      </section>


      {/* UPCOMING MOVIES */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-12 text-center">
            Coming Soon
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingMovies.map((m) => (
              <SoonCard key={m.id} movies={m} />
            ))}
          </div>

        </div>
      </section>


      {/* OFFER BANNER */}
      <section className="bg-purple-500 py-16 text-center">
        <h2 className="text-3xl font-bold">
          🎉 Get 200RS OFF on First Booking
        </h2>
        <p className="mt-3 text-gray-200">
          Use Code <span className="font-bold text-white">MOVIE20</span>
        </p>
      </section>


      {/* WHY CHOOSE US */}
      <section className="bg-gradient-to-b from-black via-purple-950 to-black py-24">

        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose Us
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

          {/* Card 1 */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center transition duration-300 hover:scale-105 hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-2xl">

            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-2xl">
              ⚡
            </div>

            <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
            <p className="text-gray-400 text-sm">
              Book movie tickets instantly with smooth experience.
            </p>

          </div>


          {/* Card 2 */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center transition duration-300 hover:scale-105 hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-2xl">

            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-2xl">
              🎬
            </div>

            <h3 className="text-xl font-semibold mb-2">Best Cinemas</h3>
            <p className="text-gray-400 text-sm">
              Enjoy movies in top rated theaters with premium sound.
            </p>

          </div>


          {/* Card 3 */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center transition duration-300 hover:scale-105 hover:border-purple-500 hover:shadow-purple-500/20 hover:shadow-2xl">

            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-2xl">
              🔒
            </div>

            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-400 text-sm">
              100% safe and encrypted payment gateway system.
            </p>

          </div>

        </div>

      </section>

    </div>

  )
}