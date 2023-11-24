const SearchBar = () => {
  return (
    <form>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search for rooms"
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
