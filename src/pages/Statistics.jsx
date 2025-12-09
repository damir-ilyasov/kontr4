// pages/Statistics.js
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Statistics() {
  const [stats, setStats] = useState({
    byStatus: [],
    byCategory: [],
    progressOverTime: []
  });

  useEffect(() => {
    const technologies = JSON.parse(localStorage.getItem('technologies') || '[]');
    
    // Анализ данных
    const byStatus = technologies.reduce((acc, tech) => {
      acc[tech.status] = (acc[tech.status] || 0) + 1;
      return acc;
    }, {});

    // Преобразование для графика
    const chartData = Object.keys(byStatus).map(status => ({
      name: status,
      count: byStatus[status]
    }));

    setStats(prev => ({ ...prev, byStatus: chartData }));
  }, []);

  return (
    <div className="page">
      <h1>Статистика изучения</h1>
      
      <div className="stats-section">
        <h2>Распределение по статусам</h2>
        <BarChart width={600} height={300} data={stats.byStatus}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default  Statistics;