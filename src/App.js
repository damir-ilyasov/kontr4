import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import LocalStorageStatus from './components/LocalStorageStatus';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React и их жизненного цикла', 
      status: 'completed',
      category: 'Основы React',
      notes: '✅ Изучены классовые и функциональные компоненты\n✅ Понимаю жизненный цикл'
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и его отличий от HTML', 
      status: 'in-progress',
      category: 'Основы React',
      notes: '📝 JSX - это синтаксическое расширение для JavaScript\n⚠️ Нужно попрактиковаться с условным рендерингом'
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов (useState, useEffect)', 
      status: 'not-started',
      category: 'Продвинутый React',
      notes: ''
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение основных и пользовательских хуков', 
      status: 'not-started',
      category: 'Продвинутый React',
      notes: '📚 Планирую изучить: useState, useEffect, useContext, useReducer'
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Навигация в React приложениях', 
      status: 'in-progress',
      category: 'Библиотеки',
      notes: '✅ Установлен react-router-dom\n🔄 Изучаю динамические маршруты'
    },
    { 
      id: 6, 
      title: 'Context API', 
      description: 'Глобальное управление состоянием приложения', 
      status: 'completed',
      category: 'Продвинутый React',
      notes: '🚀 Отличный инструмент для передачи данных без пропс-дриллинга!\n💡 Использовал для темы приложения и авторизации'
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  // Загрузка из localStorage при первом рендере
  useEffect(() => {
    const savedData = localStorage.getItem('techTrackerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setTechnologies(parsedData);
          console.log('✅ Данные загружены из localStorage');
        }
      } catch (error) {
        console.error('❌ Ошибка при загрузке из localStorage:', error);
      }
    }
  }, []);

  // Автосохранение в localStorage при изменении технологий
  useEffect(() => {
    const saveData = () => {
      try {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        setLastSaved(new Date().toLocaleTimeString());
        console.log('💾 Данные сохранены в localStorage');
      } catch (error) {
        console.error('❌ Ошибка при сохранении в localStorage:', error);
      }
    };

    // Сохраняем с задержкой для производительности
    const timeoutId = setTimeout(saveData, 500);
    return () => clearTimeout(timeoutId);
  }, [technologies]);

  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          let newStatus;
          switch(tech.status) {
            case 'not-started':
              newStatus = 'in-progress';
              break;
            case 'in-progress':
              newStatus = 'completed';
              break;
            case 'completed':
              newStatus = 'not-started';
              break;
            default:
              newStatus = 'not-started';
          }
          return { ...tech, status: newStatus };
        }
        return tech;
      })
    );
  };

  const updateTechnologyNotes = (id, notes) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === id ? { ...tech, notes } : tech
      )
    );
  };

  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const pickRandomTechnology = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты или завершены! 🎉');
      return;
    }
    
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    updateTechnologyStatus(randomTech.id);
    
    alert(`Следующая технология: ${randomTech.title}! Начинаем изучение! 🚀`);
  };

  const clearAllData = () => {
    if (window.confirm('Вы уверены, что хотите очистить все данные? Это действие нельзя отменить.')) {
      localStorage.removeItem('techTrackerData');
      setTechnologies([]);
      console.log('🗑️ Все данные очищены');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'tech-tracker-backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredTechnologies = () => {
    let filtered = technologies;
    
    // Применяем фильтр по статусу/категории
    switch(activeFilter) {
      case 'not-started':
        filtered = filtered.filter(tech => tech.status === 'not-started');
        break;
      case 'in-progress':
        filtered = filtered.filter(tech => tech.status === 'in-progress');
        break;
      case 'completed':
        filtered = filtered.filter(tech => tech.status === 'completed');
        break;
      case 'react-basics':
        filtered = filtered.filter(tech => tech.category === 'Основы React');
        break;
      case 'advanced-react':
        filtered = filtered.filter(tech => tech.category === 'Продвинутый React');
        break;
      default:
        break;
    }

    // Применяем поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tech => 
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query) ||
        tech.notes.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p className="subtitle">Ваш персональный план обучения фронтенд-разработке</p>
      </header>

      <main className="app-container">
        <LocalStorageStatus lastSaved={lastSaved} />
        
        <ProgressHeader technologies={technologies} />
        
        <QuickActions 
          markAllAsCompleted={markAllAsCompleted}
          resetAllStatuses={resetAllStatuses}
          pickRandomTechnology={pickRandomTechnology}
          clearAllData={clearAllData}
          exportData={exportData}
        />
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resultCount={filteredTechnologies().length}
          totalCount={technologies.length}
        />
        
        <FilterBar 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          technologies={technologies}
        />
        
        <div className="technologies-section">
          <h2>
            {activeFilter === 'all' ? 'Все технологии' :
             activeFilter === 'not-started' ? 'Не начатые технологии' :
             activeFilter === 'in-progress' ? 'Технологии в процессе' :
             activeFilter === 'completed' ? 'Изученные технологии' :
             activeFilter === 'react-basics' ? 'Основы React' :
             activeFilter === 'advanced-react' ? 'Продвинутый React' : 'Все технологии'}
            
            {searchQuery && ` (поиск: "${searchQuery}")`}
            <span className="count-badge">{filteredTechnologies().length}</span>
          </h2>
          
          {filteredTechnologies().length === 0 ? (
            <div className="empty-state">
              <p>🚫 Не найдено технологий с выбранными фильтрами</p>
              <button 
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="clear-filter-btn"
              >
                Показать все технологии
              </button>
            </div>
          ) : (
            <div className="technologies-list">
              {filteredTechnologies().map(tech => (
                <TechnologyCard
                  key={tech.id}
                  id={tech.id}
                  title={tech.title}
                  description={tech.description}
                  status={tech.status}
                  category={tech.category}
                  notes={tech.notes}
                  updateStatus={updateTechnologyStatus}
                  updateNotes={updateTechnologyNotes}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>💾 Данные автоматически сохраняются в localStorage</p>
        <p className="footer-stats">
          Всего технологий: {technologies.length} | 
          Изучено: {technologies.filter(t => t.status === 'completed').length} | 
          В процессе: {technologies.filter(t => t.status === 'in-progress').length}
        </p>
      </footer>
    </div>
  );
}

export default App;