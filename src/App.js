import React, { useState } from 'react';
import './App.css';
import useTechnologies from './hooks/useTechnologies';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Modal from './components/Modal';
import AddTechnologyModal from './components/AddTechnologyModal';
import ProgressBar from './components/ProgressBar';
import Dashboard from './components/Dashboard';

function App() {
  const {
    technologies,
    stats,
    updateStatus,
    updateNotes,
    addTechnology,
    removeTechnology,
    markAllAsCompleted,
    resetAllStatuses,
    searchTechnologies
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Фильтрация технологий
  const filteredTechnologies = searchTechnologies(searchQuery, activeFilter !== 'all' ? activeFilter : undefined);

  const handleAddTechnology = (newTech) => {
    addTechnology(newTech);
    setShowAddModal(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>📚 Трекер изучения технологий</h1>
            <p className="subtitle">Ваш персональный план обучения фронтенд-разработке</p>
          </div>
          
          <div className="header-progress">
            <ProgressBar
              progress={stats.progress}
              label="Общий прогресс"
              color="auto"
              height={12}
              showLabel={false}
              animated={true}
              striped={true}
            />
            <div className="progress-stats">
              <span className="stat-item">
                <strong>{stats.progress}%</strong>
                <small>прогресс</small>
              </span>
              <span className="stat-item">
                <strong>{stats.completed}</strong>
                <small>изучено</small>
              </span>
              <span className="stat-item">
                <strong>{stats.total}</strong>
                <small>всего</small>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-container">
        <Dashboard 
          stats={stats}
          onShowStats={() => setShowStatsModal(true)}
          onAddTechnology={() => setShowAddModal(true)}
        />
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resultCount={filteredTechnologies.length}
          totalCount={technologies.length}
        />
        
        <FilterBar 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          technologies={technologies}
        />
        
        <QuickActions 
          markAllAsCompleted={markAllAsCompleted}
          resetAllStatuses={resetAllStatuses}
          technologies={technologies}
        />
        
        <div className="technologies-section">
          <div className="section-header">
            <h2>
              {activeFilter === 'all' ? 'Все технологии' :
               activeFilter === 'not-started' ? 'Не начатые технологии' :
               activeFilter === 'in-progress' ? 'Технологии в процессе' :
               activeFilter === 'completed' ? 'Изученные технологии' :
               'Технологии'}
              <span className="count-badge">{filteredTechnologies.length}</span>
            </h2>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="add-tech-btn"
            >
              + Добавить технологию
            </button>
          </div>
          
          {filteredTechnologies.length === 0 ? (
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
            <div className="technologies-grid">
              {filteredTechnologies.map(tech => (
                <TechnologyCard
                  key={tech.id}
                  technology={tech}
                  updateStatus={updateStatus}
                  updateNotes={updateNotes}
                  onDelete={removeTechnology}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Модалка добавления технологии */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Добавить новую технологию"
        size="medium"
      >
        <AddTechnologyModal
          onAdd={handleAddTechnology}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Модалка статистики */}
      <Modal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        title="📊 Детальная статистика"
        size="large"
      >
        <div className="stats-modal-content">
          <ProgressHeader stats={stats} technologies={technologies} />
        </div>
      </Modal>

      <footer className="app-footer">
        <p>💾 Данные сохраняются автоматически | 🚀 Всего технологий: {technologies.length}</p>
        <p className="footer-note">Нажмите на карточку технологии, чтобы изменить её статус</p>
      </footer>
    </div>
  );
}

export default App;