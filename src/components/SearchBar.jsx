import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, setSearchQuery, resultCount, totalCount }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Загрузка истории поиска из localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Сохранение поискового запроса в историю
  useEffect(() => {
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const selectFromHistory = (query) => {
    setSearchQuery(query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const searchStats = () => {
    if (!searchQuery) return '';
    
    const percentage = Math.round((resultCount / totalCount) * 100);
    return `Найдено: ${resultCount} из ${totalCount} (${percentage}%)`;
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Поиск технологий по названию, описанию или заметкам..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-search-btn">
              ✕
            </button>
          )}
        </div>
        
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="advanced-toggle"
        >
          {showAdvanced ? 'Скрыть' : 'История поиска'}
        </button>
      </div>
      
      <div className="search-info">
        <span className="search-stats">{searchStats()}</span>
        <span className="search-hint">
          💡 Ищет в названии, описании и заметках
        </span>
      </div>
      
      {showAdvanced && (
        <div className="advanced-search">
          <div className="search-history">
            <h4>История поиска</h4>
            {searchHistory.length > 0 ? (
              <>
                <div className="history-items">
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => selectFromHistory(query)}
                      className="history-item"
                    >
                      {query}
                    </button>
                  ))}
                </div>
                <button onClick={clearHistory} className="clear-history-btn">
                  Очистить историю
                </button>
              </>
            ) : (
              <p className="empty-history">История поиска пуста</p>
            )}
          </div>
          
          <div className="search-tips">
            <h4>Советы по поиску:</h4>
            <ul>
              <li>Поиск не зависит от регистра</li>
              <li>Ищет в названии, описании и заметках</li>
              <li>Можно искать по частям слов</li>
              <li>Используйте несколько слов для точного поиска</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;