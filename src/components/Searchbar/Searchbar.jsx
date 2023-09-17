export const Searchbar = ({ onSubmit }) => {
  return (
    <form onSubmit={evt => onSubmit(evt)}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="query"
      />
      <button type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};
