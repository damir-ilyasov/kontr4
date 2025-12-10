import { useState, useEffect, useCallback } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function TechnologySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { technologies } = useTechnologiesApi();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchLoading(true);
      
      // Имитация поиска по API
      const searchInTechnologies = () => {
        return technologies.filter(tech =>
          tech.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          tech.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          tech.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      };

      setTimeout(() => {
        const results = searchInTechnologies();
        setSearchResults(results);
        setSearchLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, technologies]);

  return (
    <div className="technology-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchLoading && <span className="search-spinner">⌛</span>}
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h4>Результаты поиска ({searchResults.length})</h4>
          <div className="results-list">
            {searchResults.map(tech => (
              <div key={tech.id} className="search-result-item">
                <h5>{tech.title}</h5>
                <p>{tech.description}</p>
                <span className="tech-category">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {debouncedSearchTerm && searchResults.length === 0 && !searchLoading && (
        <p className="no-results">Технологии не найдены</p>
      )}
    </div>
  );
}

export default TechnologySearch;