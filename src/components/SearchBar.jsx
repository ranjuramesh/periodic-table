function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, symbol, or atomic number..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button 
          className="search-clear" 
          onClick={() => onSearchChange('')}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
