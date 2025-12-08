import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getProgressLevel = () => {
    if (percentage >= 70) return 'high';
    if (percentage >= 40) return 'medium';
    return 'low';
  };

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
        </div>
        <div className="stat-item">
          <span className="stat-number">{total - completed}</span>
          <span className="stat-label">Осталось</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span className="progress-text">Общий прогресс</span>
          <span className="progress-percentage">{percentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressLevel()}`}
            style={{ width: `${percentage}%` }}
          >
            <div className="progress-glow"></div>
          </div>
        </div>
      </div>

      <div className="motivation-message">
        {percentage === 100 ? (
          <span className="completed">Поздравляем! Вы изучили все технологии!</span>
        ) : percentage >= 70 ? (
          <span className="almost">Вы на финишной прямой! Продолжайте в том же духе!</span>
        ) : percentage >= 40 ? (
          <span className="good"> Хороший прогресс! Следующая технология уже ждет!</span>
        ) : (
          <span className="start">Начните с первой технологии! Каждый шаг важен!</span>
        )}
      </div>
    </div>
  );
}

export default ProgressHeader;