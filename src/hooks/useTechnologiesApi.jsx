import { useState, useCallback } from 'react';
import api from '../services/api';

export const useTechnologiesApi = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTechnologies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // В реальном приложении:
      // const data = await api.get('/technologies');
      
      // Для демо - используем mock данные
      const mockData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: 'React',
              description: 'JavaScript библиотека для создания UI',
              category: 'frontend',
              status: 'in_progress',
              difficulty: 'intermediate',
              resources: ['https://react.dev'],
              progress: 65
            },
            {
              id: 2,
              title: 'Node.js',
              description: 'Среда выполнения JavaScript',
              category: 'backend',
              status: 'not_started',
              difficulty: 'intermediate',
              resources: ['https://nodejs.org'],
              progress: 0
            }
          ]);
        }, 1000);
      });
      
      setTechnologies(mockData);
      return mockData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTechnology = useCallback(async (technologyData) => {
    setLoading(true);
    
    try {
      // В реальном приложении:
      // const newTech = await api.post('/technologies', technologyData);
      
      // Для демо
      const newTech = {
        id: Date.now(),
        ...technologyData,
        createdAt: new Date().toISOString()
      };
      
      setTechnologies(prev => [...prev, newTech]);
      return newTech;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTechnology = useCallback(async (id, updates) => {
    try {
      // В реальном приложении:
      // const updated = await api.put(`/technologies/${id}`, updates);
      
      setTechnologies(prev =>
        prev.map(tech => 
          tech.id === id ? { ...tech, ...updates } : tech
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteTechnology = useCallback(async (id) => {
    try {
      // В реальном приложении:
      // await api.delete(`/technologies/${id}`);
      
      setTechnologies(prev => prev.filter(tech => tech.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    technologies,
    loading,
    error,
    fetchTechnologies,
    addTechnology,
    updateTechnology,
    deleteTechnology,
  };
};

export default useTechnologiesApi;