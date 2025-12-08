import React from 'react';
import './QuickActions.css';

function QuickActions({ markAllAsCompleted, resetAllStatuses, pickRandomTechnology }) {
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-grid">
        <button 
          onClick={markAllAsCompleted}
          className="action-btn complete-all"
          title="Отметить все технологии как изученные"
        >
          <span className="action-icon">✅</span>
          <span className="action-text">Все выполнено</span>
        </button>
        
        <button 
          onClick={resetAllStatuses}
          className="action-btn reset-all"
          title="Сбросить статусы всех технологий"
        >
          <span className="action-icon">🔄</span>
          <span className="action-text">Сбросить все</span>
        </button>
        
        <button 
          onClick={pickRandomTechnology}
          className="action-btn random-tech"
          title="Выбрать случайную не начатую технологию"
        >
          <span className="action-icon">🎲</span>
          <span className="action-text">Случайная</span>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;