import { useState, useEffect } from 'react';

function ResourceLoader({ technologyId, technologyName }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Имитация запроса к API для получения ресурсов
      // В реальном приложении: fetch(`/api/technologies/${technologyId}/resources`)
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock данные ресурсов
      const mockResources = [
        {
          id: 1,
          type: 'documentation',
          title: 'Официальная документация',
          url: `https://${technologyName.toLowerCase()}.org/docs`,
          description: 'Полное руководство и API reference'
        },
        {
          id: 2,
          type: 'tutorial',
          title: 'Введение в технологию',
          url: `https://tutorials.example.com/${technologyName.toLowerCase()}`,
          description: 'Пошаговое руководство для начинающих'
        },
        {
          id: 3,
          type: 'video',
          title: 'Видеокурс на YouTube',
          url: `https://youtube.com/search?q=${encodeURIComponent(technologyName)}+tutorial`,
          description: 'Бесплатные видеоуроки'
        }
      ];
      
      setResources(mockResources);
    } catch (err) {
      setError('Не удалось загрузить ресурсы');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (technologyId && technologyName) {
      fetchResources();
    }
  }, [technologyId, technologyName]);

  if (loading) return <div className="resources-loading">Загрузка ресурсов...</div>;
  if (error) return <div className="resources-error">{error}</div>;

  return (
    <div className="resource-loader">
      <div className="resources-header">
        <h4>Ресурсы для изучения {technologyName}</h4>
        <button onClick={fetchResources} className="refresh-resources">
          Обновить
        </button>
      </div>

      <div className="resources-list">
        {resources.map(resource => (
          <div key={resource.id} className="resource-item">
            <div className="resource-type">{resource.type}</div>
            <h5>{resource.title}</h5>
            <p>{resource.description}</p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              Перейти →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceLoader;