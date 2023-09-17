const defaultImg =
  'https://excelautomationinc.com/wp-content/webp-express/webp-images/uploads/2021/07/No-Photo-Available-768x960.jpg.webp';

export const CastItem = ({ cast }) => {
  return (
    <div>
      <ul>
        {cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : defaultImg
              }
              alt="name"
              width={150}
            />
            <p>{name}</p>
            <p>{character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
