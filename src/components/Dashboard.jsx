import React from 'react';
import ProgressBar from './ProgressBar';
import './Dashboard.css';

function Dashboard({ stats, onShowStats, onAddTechnology }) {
  const categoryProgress = Object.entries(stats.categoryStats || {}).map(([category, data]) => ({
    category,
    progress: Math.round((data.completed / data.total) * 100),
    completed: data.completed,
    total: data.total
  }));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📈 Обзор прогресса</h2>
        <div className="dashboard-actions">
          <button onClick={onShowStats} className="btn btn-outline">
            📊 Подробная статистика
          </button>
          <button onClick={onAddTechnology} className="btn btn-primary">
            ➕ Добавить технологию
          </button>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Общий прогресс</h3>
            <ProgressBar
              progress={stats.progress}
              height={10}
              animated={true}
            />
            <p className="stat-value">{stats.progress}%</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Изучено</h3>
            <p className="stat-value">{stats.completed}</p>
            <p className="stat-label">из {stats.total} технологий</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>В процессе</h3>
            <p className="stat-value">{stats.inProgress}</p>
            <p className="stat-label">активно изучается</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Осталось</h3>
            <p className="stat-value">{stats.notStarted}</p>
            <p className="stat-label">технологий к изучению</p>
          </div>
        </div>
      </div>
      
      {categoryProgress.length > 0 && (
        <div className="category-progress">
          <h3>Прогресс по категориям</h3>
          <div className="category-bars">
            {categoryProgress.map((cat, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <span className="category-name">{cat.category}</span>
                  <span className="category-stats">{cat.completed}/{cat.total}</span>
                </div>
                <ProgressBar
                  progress={cat.progress}
                  height={8}
                  showPercentage={false}
                  color="#3498db"
                />
                <div className="category-percentage">{cat.progress}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;