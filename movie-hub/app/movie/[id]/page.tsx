import Image from 'next/image';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// 1. This function fetches data for *one* movie
async function getMovie(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
  );
  if (!res.ok) {
    // Log the error to your terminal
    console.error("API Error Status:", res.status);
    const errorBody = await res.json();
    console.error("API Error Body:", errorBody);
    
    // Throw a more specific error
    throw new Error(`Failed to fetch movie. Status: ${res.status}. Message: ${errorBody.status_message}`);
  }
  const data = await res.json();
  return data as MovieDetails;
}

// 2. This is the page component
export default async function MoviePage({ params }: { params: { id: string } }) {
  // params.id will be the movie ID from the URL
  const movie = await getMovie(params.id);

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Poster Image */}
        <Image
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded-lg shadow-lg w-full md:w-1/3"
        />

        {/* Movie Details */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-300 mb-4">{movie.overview}</p>
          <div className="flex gap-4 mb-4">
            <span className="font-semibold">Release Date:</span>
            <span>{movie.release_date}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Rating:</span>
            <span>{movie.vote_average.toFixed(1)} / 10</span>
          </div>
        </div>

      </div>
    </div>
  );
}