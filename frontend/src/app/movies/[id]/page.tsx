
import BackButton from "@/Component/BackButton"
import CastSwiper from "@/Component/Castsilder"
import data from "@/Data/Moviedata.json"
import Link from "next/link"
import AuthGuard from "@/Component/AuthGuard"
type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {

const { id } = await params
  
   const movie = data.movies.find(
    (m) => m.id === Number(id)
  )
  if (!movie) {
    return <div className="text-white p-10">Movie Not Found</div>
  }

  return (
    <AuthGuard>
    <div className="w-full min-h-screen c text-white pt-20">
      {/* HERO */}
      <div
  className="h-[75vh] w-full relative flex items-center"
  style={{
    backgroundImage: `url(${movie.poster})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  {/* ⭐ Back Button HERE */}
  <BackButton />

  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black"></div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row items-center gap-10">

          <img
            src={movie.poster || "/defaultmovie.jpg"}
            alt={movie.title}
            className="h-[320px] md:h-[420px] w-[220px] md:w-[300px] object-cover rounded-2xl shadow-2xl"
          />

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {movie.title}
            </h1>

            <div className="flex gap-5 mt-6 justify-center md:justify-start text-lg">

              {movie.rating > 0 && (
                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  ⭐ {movie.rating}/10
                </span>
              )}

              {/* {movie.rating > 0 && (
                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  ₹ {movie.price}
                </span>
              )} */}

              <span className="bg-white/10 px-4 py-2 rounded-xl">
                {movie.year}
              </span>

            </div>

            {movie.rating > 0 && (
              <Link href={`/theatershow/${movie.id}`}>
                <button className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 px-10 py-3 rounded-2xl font-bold hover:scale-105 cursor-pointer">
                  Book Ticket
                </button>
              </Link>
            )}

          </div>

        </div>
      </div>

      {/* ABOUT */}
      <div className="max-w-6xl mx-auto mt-20 px-6">
        <h2 className="text-3xl font-extrabold mb-6">
          About The Movie
        </h2>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <p className="text-white leading-relaxed mb-6">
            {movie.about}
          </p>

          <div className="space-y-3 text-lg">
            <p><span className="text-gray-400">Runtime :</span> {movie.runtime}</p>
            <p><span className="text-gray-400">Genre :</span> {movie.genre.join(", ")}</p>
            <p><span className="text-gray-400">Language :</span> {movie.language.join(", ")}</p>
            <p><span className="text-gray-400">Release :</span> {movie.releaseDate}</p>
          </div>

        </div>
      </div>

      <CastSwiper movie={movie} />

    </div>
    </AuthGuard>
  )
}