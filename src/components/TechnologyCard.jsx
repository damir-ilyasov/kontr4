import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, category, updateStatus }) {
  const getStatusIcon = () => {
    switch(status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'not-started':
        return '⏳';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return '';
    }
  };

  const getNextStatusText = () => {
    switch(status) {
      case 'completed':
        return 'Начать заново';
      case 'in-progress':
        return 'Завершить изучение';
      case 'not-started':
        return 'Начать изучение';
      default:
        return '';
    }
  };

  const handleClick = () => {
    updateStatus(id);
  };

  return (
    <div 
      className={`technology-card ${status} ${category.toLowerCase().replace(' ', '-')}`}
      onClick={handleClick}
      title={`Кликните, чтобы изменить статус. Сейчас: ${getStatusText()}`}
    >
      <div className="card-header">
        <div className="title-container">
          <h3 className="card-title">{title}</h3>
          <span className="card-category">{category}</span>
        </div>
        <span className="status-indicator">
          {getStatusIcon()} {getStatusText()}
        </span>
      </div>
      
      <p className="card-description">{description}</p>
      
      <div className="card-footer">
        <div className="status-info">
          <div className={`status-badge ${status}`}>
            {getStatusText()}
          </div>
          <div className="next-action-hint">
            <span className="hint-icon">👉</span>
            <span className="hint-text">{getNextStatusText()}</span>
          </div>
        </div>
        <div className="card-id">#{id}</div>
      </div>
      
      <div className="progress-line">
        <div 
          className={`progress-fill ${status}`}
          style={{
            width: status === 'completed' ? '100%' : 
                   status === 'in-progress' ? '50%' : '0%'
          }}
        />
      </div>
    </div>
  );
}

export default TechnologyCard;