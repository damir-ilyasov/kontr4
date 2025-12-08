import React, { useState, useEffect } from 'react';
import './LocalStorageStatus.css';

function LocalStorageStatus({ lastSaved }) {
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    total: 0,
    percentage: 0
  });

  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(true);

  useEffect(() => {
    // Проверяем доступность localStorage
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      setIsLocalStorageAvailable(true);
    } catch (error) {
      console.error('LocalStorage недоступен:', error);
      setIsLocalStorageAvailable(false);
    }
  }, []);

  useEffect(() => {
    // Рассчитываем использование localStorage
    const calculateStorage = () => {
      try {
        let total = 0;
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length * 2; // UTF-16, 2 байта на символ
          }
        }
        
        // Обычно лимит ~5MB = 5,000,000 байт
        const totalBytes = 5 * 1024 * 1024; // 5MB
        const percentage = Math.round((total / totalBytes) * 100);
        
        setStorageInfo({
          used: Math.round(total / 1024), // в КБ
          total: Math.round(totalBytes / 1024), // в КБ
          percentage
        });
      } catch (error) {
        console.error('Ошибка при расчете использования localStorage:', error);
      }
    };

    calculateStorage();
  }, [lastSaved]);

  const getStorageStatus = () => {
    if (!isLocalStorageAvailable) return 'blocked';
    if (storageInfo.percentage > 90) return 'critical';
    if (storageInfo.percentage > 70) return 'warning';
    return 'normal';
  };

  if (!isLocalStorageAvailable) {
    return (
      <div className="storage-status blocked">
        <div className="status-header">
          <span className="status-icon">⚠️</span>
          <span className="status-title">LocalStorage недоступен</span>
        </div>
        <p className="status-message">
          Ваш браузер заблокировал доступ к localStorage. Данные не будут сохраняться между сессиями.
        </p>
      </div>
    );
  }

  const status = getStorageStatus();

  return (
    <div className={`storage-status ${status}`}>
      <div className="status-header">
        <span className="status-icon">
          {status === 'critical' ? '🔥' : 
           status === 'warning' ? '⚠️' : 
           status === 'blocked' ? '🚫' : '💾'}
        </span>
        <span className="status-title">
          {status === 'critical' ? 'Критическое заполнение' :
           status === 'warning' ? 'Высокое заполнение' :
           'Автосохранение'}
        </span>
        <span className="last-saved">
          {lastSaved ? `Последнее сохранение: ${lastSaved}` : 'Данные не сохранены'}
        </span>
      </div>
      
      <div className="storage-progress">
        <div className="progress-info">
          <span>Использовано: {storageInfo.used} КБ из {storageInfo.total} КБ</span>
          <span>{storageInfo.percentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${status}`}
            style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
          />
        </div>
        
        <div className="storage-tips">
          {status === 'critical' && (
            <p className="tip critical">
              ⚠️ Место в localStorage почти закончилось! Рекомендуется экспортировать и очистить данные.
            </p>
          )}
          {status === 'warning' && (
            <p className="tip warning">
              📝 Заметки занимают много места. Можно удалить старые или ненужные заметки.
            </p>
          )}
          {status === 'normal' && (
            <p className="tip normal">
              ✅ Данные автоматически сохраняются при любых изменениях.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocalStorageStatus;