import useLocalStorage from './useLocalStorage';
import { useCallback } from 'react';

// Начальные данные для технологий
const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов React и их жизненного цикла', 
    status: 'completed',
    notes: '✅ Изучены классовые и функциональные компоненты\n✅ Понимаю жизненный цикл',
    category: 'Основы React',
    priority: 'high',
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-30'
  },
  { 
    id: 2, 
    title: 'JSX Syntax', 
    description: 'Освоение синтаксиса JSX и его отличий от HTML', 
    status: 'in-progress',
    notes: '📝 JSX - это синтаксическое расширение для JavaScript\n⚠️ Нужно попрактиковаться с условным рендерингом',
    category: 'Основы React',
    priority: 'medium',
    createdDate: '2024-01-20',
    lastUpdated: '2024-02-05'
  },
  { 
    id: 3, 
    title: 'State Management', 
    description: 'Работа с состоянием компонентов (useState, useEffect)', 
    status: 'not-started',
    notes: '📚 Планирую изучить: useState, useEffect, useContext, useReducer',
    category: 'Продвинутый React',
    priority: 'high',
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01'
  },
  { 
    id: 4, 
    title: 'React Hooks', 
    description: 'Изучение основных и пользовательских хуков', 
    status: 'not-started',
    notes: '',
    category: 'Продвинутый React',
    priority: 'medium',
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01'
  },
  { 
    id: 5, 
    title: 'React Router', 
    description: 'Навигация в React приложениях', 
    status: 'in-progress',
    notes: '✅ Установлен react-router-dom\n🔄 Изучаю динамические маршруты',
    category: 'Библиотеки',
    priority: 'low',
    createdDate: '2024-02-10',
    lastUpdated: '2024-02-15'
  },
  { 
    id: 6, 
    title: 'Context API', 
    description: 'Глобальное управление состоянием приложения', 
    status: 'completed',
    notes: '🚀 Отличный инструмент для передачи данных без пропс-дриллинга!\n💡 Использовал для темы приложения и авторизации',
    category: 'Продвинутый React',
    priority: 'high',
    createdDate: '2024-01-25',
    lastUpdated: '2024-02-10'
  },
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  // Генератор нового ID
  const generateId = useCallback(() => {
    return technologies.length > 0 
      ? Math.max(...technologies.map(t => t.id)) + 1
      : 1;
  }, [technologies]);

  // Функция для обновления статуса технологии
  const updateStatus = useCallback((techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId 
          ? { 
              ...tech, 
              status: newStatus,
              lastUpdated: new Date().toISOString().split('T')[0]
            } 
          : tech
      )
    );
  }, [setTechnologies]);

  // Функция для обновления заметок
  const updateNotes = useCallback((techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId 
          ? { 
              ...tech, 
              notes: newNotes,
              lastUpdated: new Date().toISOString().split('T')[0]
            } 
          : tech
      )
    );
  }, [setTechnologies]);

  // Функция для добавления новой технологии
  const addTechnology = useCallback((newTech) => {
    const techToAdd = {
      ...newTech,
      id: generateId(),
      status: 'not-started',
      notes: '',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setTechnologies(prev => [...prev, techToAdd]);
    return techToAdd;
  }, [generateId, setTechnologies]);

  // Функция для удаления технологии
  const removeTechnology = useCallback((techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
  }, [setTechnologies]);

  // Функция для отметки всех как выполненных
  const markAllAsCompleted = useCallback(() => {
    setTechnologies(prev => 
      prev.map(tech => ({
        ...tech,
        status: 'completed',
        lastUpdated: new Date().toISOString().split('T')[0]
      }))
    );
  }, [setTechnologies]);

  // Функция для сброса всех статусов
  const resetAllStatuses = useCallback(() => {
    setTechnologies(prev => 
      prev.map(tech => ({
        ...tech,
        status: 'not-started',
        lastUpdated: new Date().toISOString().split('T')[0]
      }))
    );
  }, [setTechnologies]);

  // Функция для расчета статистики
  const calculateStats = useCallback(() => {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Статистика по категориям
    const categoryStats = {};
    technologies.forEach(tech => {
      categoryStats[tech.category] = categoryStats[tech.category] || { total: 0, completed: 0 };
      categoryStats[tech.category].total++;
      if (tech.status === 'completed') {
        categoryStats[tech.category].completed++;
      }
    });

    return {
      total,
      completed,
      inProgress,
      notStarted,
      progress,
      categoryStats
    };
  }, [technologies]);

  // Функция для поиска технологий
  const searchTechnologies = useCallback((query, filter = 'all') => {
    let filtered = technologies;
    
    // Применяем фильтр по статусу
    if (filter !== 'all') {
      filtered = filtered.filter(tech => tech.status === filter);
    }
    
    // Применяем поисковый запрос
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(tech => 
        tech.title.toLowerCase().includes(searchQuery) ||
        tech.description.toLowerCase().includes(searchQuery) ||
        tech.notes.toLowerCase().includes(searchQuery) ||
        tech.category.toLowerCase().includes(searchQuery)
      );
    }
    
    return filtered;
  }, [technologies]);

  return {
    technologies,
    stats: calculateStats(),
    
    // Действия
    updateStatus,
    updateNotes,
    addTechnology,
    removeTechnology,
    markAllAsCompleted,
    resetAllStatuses,
    searchTechnologies,
    
    // Утилиты
    generateId
  };
}

export default useTechnologies;