import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <ul>
        {movies.map(({ id, title, release_date }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
              {location.pathname === '/movies' ? (
                <span> ({release_date.slice(0, 4) || '?'})</span>
              ) : (
                <></>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
