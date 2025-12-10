import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';

const BulkStatusEditor = ({ technologies, onUpdate }) => {
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const { values, handleChange, resetForm } = useForm({
    status: 'in-progress',
    notes: '',
    applyToAll: false
  });

  // Обработчик выбора технологий
  const handleTechSelect = (techId) => {
    setSelectedTechs(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  // Выбрать все/снять выделение
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedTechs([]);
    } else {
      setSelectedTechs(technologies.map(tech => tech.id));
    }
    setSelectAll(!selectAll);
  };

  // Применение изменений
  const handleApplyChanges = () => {
    const updates = selectedTechs.map(techId => ({
      id: techId,
      status: values.status,
      ...(values.notes && { notes: values.notes }),
      updatedAt: new Date().toISOString()
    }));

    onUpdate(updates);
    
    // Сброс формы
    setSelectedTechs([]);
    setSelectAll(false);
    resetForm();
  };

  return (
    <div className="bulk-editor">
      <div className="editor-header">
        <h3>Массовое редактирование статусов</h3>
        <div className="selection-info">
          Выбрано: {selectedTechs.length} из {technologies.length}
        </div>
      </div>

      <div className="tech-selection">
        <div className="select-all-row">
          <label className="select-all-checkbox">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
            Выбрать все
          </label>
        </div>

        <div className="tech-list">
          {technologies.map(tech => (
            <div key={tech.id} className="tech-select-item">
              <label className="tech-checkbox">
                <input
                  type="checkbox"
                  checked={selectedTechs.includes(tech.id)}
                  onChange={() => handleTechSelect(tech.id)}
                />
                <span className="tech-name">{tech.title}</span>
                <span className={`tech-status status-${tech.status}`}>
                  {tech.status}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {selectedTechs.length > 0 && (
        <div className="edit-form">
          <h4>Применить к выбранным ({selectedTechs.length}):</h4>
          
          <div className="form-group">
            <label htmlFor="bulk-status">Новый статус</label>
            <select
              id="bulk-status"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
              <option value="on-hold">Отложено</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bulk-notes">Добавить заметку (опционально)</label>
            <textarea
              id="bulk-notes"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Общая заметка для всех выбранных технологий..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="applyToAll"
                checked={values.applyToAll}
                onChange={handleChange}
              />
              Применить эти настройки ко всем технологиям в будущем
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleApplyChanges}
              className="btn-primary"
            >
              Применить к выбранным
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedTechs([]);
                setSelectAll(false);
              }}
              className="btn-secondary"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkStatusEditor;