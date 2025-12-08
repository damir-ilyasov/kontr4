import React, { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, category, notes, updateStatus, updateNotes }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);

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

  const handleCardClick = () => {
    updateStatus(id);
  };

  const handleNotesChange = (e) => {
    setLocalNotes(e.target.value);
  };

  const saveNotes = () => {
    updateNotes(id, localNotes);
    setIsEditingNotes(false);
  };

  const cancelEditing = () => {
    setLocalNotes(notes);
    setIsEditingNotes(false);
  };

  return (
    <div 
      className={`technology-card ${status} ${category.toLowerCase().replace(' ', '-')}`}
      onClick={handleCardClick}
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
      
      {/* Секция заметок */}
      <div className="notes-section">
        <div className="notes-header">
          <h4>📝 Мои заметки:</h4>
          {!isEditingNotes ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingNotes(true);
              }}
              className="edit-notes-btn"
            >
              {notes ? 'Редактировать' : 'Добавить заметку'}
            </button>
          ) : (
            <div className="notes-actions">
              <button onClick={saveNotes} className="save-btn">Сохранить</button>
              <button onClick={cancelEditing} className="cancel-btn">Отмена</button>
            </div>
          )}
        </div>
        
        {isEditingNotes ? (
          <textarea
            value={localNotes}
            onChange={handleNotesChange}
            placeholder="Записывайте сюда важные моменты, ссылки, мысли..."
            rows="4"
            className="notes-textarea"
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <div className="notes-display">
            {notes ? (
              <pre className="notes-content">{notes}</pre>
            ) : (
              <p className="notes-empty">Нажмите "Добавить заметку" чтобы записать важные моменты</p>
            )}
            {notes && (
              <div className="notes-stats">
                <span className="char-count">{notes.length} символов</span>
                <span className="line-count">{notes.split('\n').length} строк</span>
              </div>
            )}
          </div>
        )}
      </div>
      
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