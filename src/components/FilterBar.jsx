import React from 'react';
import './FilterBar.css';

function FilterBar({ activeFilter, setActiveFilter, technologies }) {
  const statusCounts = {
    all: technologies.length,
    'not-started': technologies.filter(t => t.status === 'not-started').length,
    'in-progress': technologies.filter(t => t.status === 'in-progress').length,
    'completed': technologies.filter(t => t.status === 'completed').length,
    'react-basics': technologies.filter(t => t.category === 'Основы React').length,
    'advanced-react': technologies.filter(t => t.category === 'Продвинутый React').length,
  };

  const filters = [
    { key: 'all', label: 'Все', icon: '📚', color: '#3498db' },
    { key: 'not-started', label: 'Не начатые', icon: '⏳', color: '#FF9800' },
    { key: 'in-progress', label: 'В процессе', icon: '🔄', color: '#2196F3' },
    { key: 'completed', label: 'Выполнено', icon: '✅', color: '#4CAF50' },
    { key: 'react-basics', label: 'Основы React', icon: '⚛️', color: '#9C27B0' },
    { key: 'advanced-react', label: 'Продвинутый', icon: '🚀', color: '#3F51B5' },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3>Фильтры</h3>
        <div className="active-filter-info">
          Активный фильтр: <strong>{filters.find(f => f.key === activeFilter)?.label}</strong>
        </div>
      </div>
      
      <div className="filters-container">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            style={{ 
              '--filter-color': filter.color,
              borderColor: activeFilter === filter.key ? filter.color : '#e0e0e0'
            }}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">{statusCounts[filter.key] || 0}</span>
          </button>
        ))}
      </div>
      
      <div className="filter-stats">
        <div className="stat-item">
          <span className="stat-label">Всего:</span>
          <span className="stat-value">{technologies.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Не начато:</span>
          <span className="stat-value">{statusCounts['not-started']}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">В процессе:</span>
          <span className="stat-value">{statusCounts['in-progress']}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Выполнено:</span>
          <span className="stat-value">{statusCounts['completed']}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;