import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React и их жизненного цикла', 
      status: 'completed',
      category: 'Основы React'
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и его отличий от HTML', 
      status: 'in-progress',
      category: 'Основы React'
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов (useState, useEffect)', 
      status: 'not-started',
      category: 'Продвинутый React'
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение основных и пользовательских хуков', 
      status: 'not-started',
      category: 'Продвинутый React'
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Навигация в React приложениях', 
      status: 'in-progress',
      category: 'Библиотеки'
    },
    { 
      id: 6, 
      title: 'Context API', 
      description: 'Глобальное управление состоянием приложения', 
      status: 'completed',
      category: 'Продвинутый React'
    },
    { 
      id: 7, 
      title: 'Redux Toolkit', 
      description: 'State management с помощью Redux', 
      status: 'not-started',
      category: 'Библиотеки'
    },
    { 
      id: 8, 
      title: 'Next.js', 
      description: 'Фреймворк для React с SSR', 
      status: 'in-progress',
      category: 'Фреймворки'
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

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
      alert('Все технологии уже начаты или завершены!');
      return;
    }
    
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    updateTechnologyStatus(randomTech.id);
    
    alert(`Следующая технология: ${randomTech.title}! Начинаем изучение!`);
  };

  const filteredTechnologies = () => {
    switch(activeFilter) {
      case 'not-started':
        return technologies.filter(tech => tech.status === 'not-started');
      case 'in-progress':
        return technologies.filter(tech => tech.status === 'in-progress');
      case 'completed':
        return technologies.filter(tech => tech.status === 'completed');
      case 'react-basics':
        return technologies.filter(tech => tech.category === 'Основы React');
      case 'advanced-react':
        return technologies.filter(tech => tech.category === 'Продвинутый React');
      default:
        return technologies;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Трекер изучения технологий</h1>
        <p className="subtitle">Ваш персональный план обучения фронтенд-разработке</p>
      </header>

      <main className="app-container">
        <ProgressHeader technologies={technologies} />
        
        <QuickActions 
          markAllAsCompleted={markAllAsCompleted}
          resetAllStatuses={resetAllStatuses}
          pickRandomTechnology={pickRandomTechnology}
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
            <span className="count-badge">{filteredTechnologies().length}</span>
          </h2>
          
          {filteredTechnologies().length === 0 ? (
            <div className="empty-state">
              <p>Нет технологий с выбранным фильтром</p>
              <button 
                onClick={() => setActiveFilter('all')}
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
                  updateStatus={updateTechnologyStatus}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Кликайте по карточкам, чтобы менять статус!</p>
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