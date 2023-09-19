import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  const yearInQueryList = location.pathname === '/movies';

  return (
    <>
      <ul>
        {movies.map(({ id, title, release_date }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
              {yearInQueryList ? (
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
