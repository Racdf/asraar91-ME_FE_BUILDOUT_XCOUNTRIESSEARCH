import React, { useEffect, useState } from 'react';
import './flags.css';

function FlagCard({ name, flag }) {
  return (
    <div className="countryCard">
      <img src={flag} alt={`Flag of ${name}`} />
      <p>{name}</p>
    </div>
  );
}

export default function Flags() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries?q=a')
      .then(res => res.json())
      .then(setCountries)
      .catch(err => console.error('Failed to fetch countries:', err));
  }, []);

  const filtered = countries
  .filter((c) =>
    (c.common)
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const nameA = a.common.toLowerCase();
    const nameB = b.common.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  
  return (
    <div>
      <div className='searchBar-BG'>
      <input
        type="text"
        className="searchBar"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <div className="countriesGrid">
        {filtered.length === 0 ? (
          <> </>
        ) : (
          filtered.map((c, i) => (
            <FlagCard
              key={i}
              name={c.common}
              flag={c.png}
            />
          ))
        )}
      </div>
    </div>
  );
}
