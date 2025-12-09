import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTechnology() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    status: 'not-started',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const technologies = JSON.parse(localStorage.getItem('technologies') || '[]');
    const newTech = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    technologies.push(newTech);
    localStorage.setItem('technologies', JSON.stringify(technologies));
    
    navigate('/technologies');
  };

  return (
    <div className="page">
      <h1>Добавить новую технологию</h1>
      
      <form onSubmit={handleSubmit} className="tech-form">
        <div className="form-group">
          <label>Название технологии *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            placeholder="Например: React, Vue.js, Node.js"
          />
        </div>

        <div className="form-group">
          <label>Категория</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="frontend">Фронтенд</option>
            <option value="backend">Бэкенд</option>
            <option value="database">Базы данных</option>
            <option value="devops">DevOps</option>
            <option value="mobile">Мобильная разработка</option>
          </select>
        </div>

        <div className="form-group">
          <label>Статус изучения</label>
          <div className="status-options">
            {['not-started', 'in-progress', 'completed'].map(status => (
              <label key={status}>
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                />
                {status === 'not-started' && 'Не начато'}
                {status === 'in-progress' && 'В процессе'}
                {status === 'completed' && 'Завершено'}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="4"
            placeholder="Краткое описание технологии..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Добавить технологию
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/technologies')}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;