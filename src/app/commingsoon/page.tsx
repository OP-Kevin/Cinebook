import Sooncard from "@/Component/SoonCard"
import data from "@/Data/Moviedata.json"
import Link from "next/link"

export default function Movies() {

    const movies = data.movies.filter((m) => m.comingSoon === true)

    return (

        <div className="
        bg-linear from-black via-purple-900 to-black 
        py-12 sm:py-16 md:py-20">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between shadow-xl shadow-purple-900/40 hover:shadow-purple-600/40 transition">

                    <h1 className="
                    text-lg sm:text-2xl md:text-3xl 
                    font-bold text-white">
                        🎬 Coming Soon
                    </h1>

                    <Link
                        href="/movie"
                        className="text-sm sm:text-lg text-pink-400 font-semibold hover:text-pink-300 transition flex items-center gap-2">
                        In Cinemas near you →
                    </Link>

                </div>

            </div>


            {/* MOVIE GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-14">

                <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">

                    {movies.map((movie) => (
                        <div key={movie.id} className="w-full max-w-sm mx-auto sm:max-w-none">
                            <Sooncard movies={movie} />
                        </div>
                    ))}

                </div>

            </div>

        </div>

    )
}