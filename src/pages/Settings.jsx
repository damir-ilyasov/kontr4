// pages/Settings.js
import { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'ru',
    exportFormat: 'json'
  });

  useEffect(() => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const exportData = () => {
    const technologies = localStorage.getItem('technologies');
    const blob = new Blob([technologies], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-${new Date().toISOString()}.json`;
    a.click();
  };

  const resetData = () => {
    if (window.confirm('Вы уверены? Все данные будут удалены.')) {
      localStorage.removeItem('technologies');
      alert('Данные сброшены');
    }
  };

  return (
    <div className="page">
      <h1>Настройки приложения</h1>
      
      <div className="settings-section">
        <h2>Внешний вид</h2>
        <label>
          Тема:
          <select 
            value={settings.theme} 
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
          </select>
        </label>
      </div>

      <div className="settings-section">
        <h2>Управление данными</h2>
        <button onClick={exportData} className="btn">
          Экспортировать данные
        </button>
        <button onClick={resetData} className="btn btn-danger">
          Сбросить все данные
        </button>
      </div>
    </div>
  );
}

export default Settings;