import React, { useState, useEffect } from 'react';
import BeerCard from './BeerCard';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = () => {
    const filteredBeers = beers.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBeers(filteredBeers);
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a beer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="beer-list">
        {filteredBeers.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
