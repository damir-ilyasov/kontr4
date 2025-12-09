import React, { useState } from 'react';
import './AddTechnologyModal.css';

function AddTechnologyModal({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Основы React',
    priority: 'medium'
  });

  const categories = [
    'Основы React',
    'Продвинутый React',
    'Библиотеки',
    'Фреймворки',
    'Инструменты',
    'Базы данных',
    'DevOps'
  ];

  const priorities = [
    { value: 'high', label: 'Высокий', color: '#F44336' },
    { value: 'medium', label: 'Средний', color: '#FF9800' },
    { value: 'low', label: 'Низкий', color: '#4CAF50' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onAdd(formData);
    }
  };

  const isFormValid = formData.title.trim() && formData.description.trim();

  return (
    <form onSubmit={handleSubmit} className="add-tech-form">
      <div className="form-group">
        <label htmlFor="title">Название технологии *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Например: React Hooks, Redux Toolkit..."
          required
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Что вы планируете изучить? Какие навыки получить?"
          rows="4"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Приоритет</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{
              color: priorities.find(p => p.value === formData.priority)?.color || '#000'
            }}
          >
            {priorities.map(priority => (
              <option 
                key={priority.value} 
                value={priority.value}
                style={{ color: priority.color }}
              >
                {priority.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Отмена
        </button>
        <button 
          type="submit" 
          disabled={!isFormValid}
          className="btn btn-primary"
        >
          Добавить технологию
        </button>
      </div>
    </form>
  );
}

export default AddTechnologyModal;