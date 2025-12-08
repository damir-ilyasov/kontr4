import React, { useEffect, useState } from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const [percentage, setPercentage] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const newPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    setPercentage(newPercentage);
    
    // Анимация прогресс-бара
    const timer = setTimeout(() => {
      setAnimatedPercentage(newPercentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [completed, total]);

  const getProgressLevel = () => {
    if (percentage >= 70) return 'high';
    if (percentage >= 40) return 'medium';
    return 'low';
  };

  const getCategoryStats = () => {
    const categories = {};
    technologies.forEach(tech => {
      categories[tech.category] = categories[tech.category] || { total: 0, completed: 0 };
      categories[tech.category].total++;
      if (tech.status === 'completed') {
        categories[tech.category].completed++;
      }
    });
    
    return Object.entries(categories)
      .map(([name, stats]) => ({
        name,
        percentage: Math.round((stats.completed / stats.total) * 100)
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  const topCategory = getCategoryStats()[0];

  return (
    <div className="progress-header">
      <div className="stats-overview">
        <div className="stat-item">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Изучено</span>
          <span className="stat-subtext">{percentage}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{inProgress}</span>
          <span className="stat-label">В процессе</span>
          <span className="stat-subtext">{inProgress > 0 ? `${Math.round((inProgress / total) * 100)}%` : '0%'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{notStarted}</span>
          <span className="stat-label">Осталось</span>
          <span className="stat-subtext">{notStarted > 0 ? `${Math.round((notStarted / total) * 100)}%` : '0%'}</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span className="progress-text">Общий прогресс изучения</span>
          <span className="progress-percentage">{animatedPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressLevel()}`}
            style={{ width: `${animatedPercentage}%` }}
            title={`${completed} из ${total} технологий изучено`}
          >
            <div className="progress-glow"></div>
          </div>
        </div>
        <div className="progress-details">
          <span>Изучено: {completed}</span>
          <span>В процессе: {inProgress}</span>
          <span>Осталось: {notStarted}</span>
        </div>
      </div>

      {topCategory && (
        <div className="category-stats">
          <h4>📊 Статистика по категориям</h4>
          <div className="categories-list">
            {getCategoryStats().map(category => (
              <div key={category.name} className="category-item">
                <span className="category-name">{category.name}</span>
                <div className="category-progress">
                  <div 
                    className="category-progress-fill"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <span className="category-percentage">{category.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="top-category">
            <span className="top-category-label">Лучшая категория:</span>
            <span className="top-category-value">{topCategory.name} ({topCategory.percentage}%)</span>
          </div>
        </div>
      )}

      <div className="motivation-message">
        {percentage === 100 ? (
          <span className="completed">🎉 Поздравляем! Вы изучили все технологии! Вы - мастер React!</span>
        ) : percentage >= 80 ? (
          <span className="almost">🔥 Фантастический прогресс! Осталось совсем немного!</span>
        ) : percentage >= 60 ? (
          <span className="good">💪 Отличные результаты! Продолжайте в том же духе!</span>
        ) : percentage >= 40 ? (
          <span className="medium">👍 Хороший темп! Следующая технология уже ждет изучения!</span>
        ) : percentage >= 20 ? (
          <span className="ok">🚀 Вы на правильном пути! Продолжайте движение!</span>
        ) : (
          <span className="start">🌟 Начинаем путешествие! Каждый шаг приближает к цели!</span>
        )}
      </div>
    </div>
  );
}

export default ProgressHeader;