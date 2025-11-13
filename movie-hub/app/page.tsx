// 1. Import the Image component
import Image from 'next/image';
import Link from 'next/link';

// Define a type for the movie object
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// The base URL for all TMDb posters
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
  );

  const data = await res.json();
  const movies: Movie[] = data.results;

 return (
    <main className="p-12">
      <h1 className="text-4xl font-bold mb-8">Trending Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          // 2. Add the Link component here
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div>
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-lg shadow-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}