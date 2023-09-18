import { Suspense, useRef } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

export const MovieDetailsItem = ({
  movie: { poster_path, title, release_date, vote_average, overview, genres },
}) => {
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : defaultImg;
  const year = release_date ? release_date.slice(0, 4) : release_date;
  const votePercentage = Math.round(vote_average * 10);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  return (
    <main>
      <Link to={backLinkHref.current}>Go back</Link>
      <img src={poster} alt="poster" width={250} />
      <div>
        <h2>
          {title} ({year})
        </h2>
        <p>User score: {votePercentage}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h4>Genres</h4>
        {genres && (
          <ul>
            {genres.map(({ id, name }) => (
              <li key={id}>
                <p>{name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};
