// Утилиты для доступности

// Фокусировка на первом поле с ошибкой
export const focusFirstError = (errors) => {
  if (errors && Object.keys(errors).length > 0) {
    const firstErrorField = Object.keys(errors)[0];
    const element = document.getElementById(firstErrorField) || 
                   document.querySelector(`[name="${firstErrorField}"]`);
    
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

// Обновление ARIA live региона
export const updateLiveRegion = (message, priority = 'polite') => {
  let liveRegion = document.getElementById('a11y-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.padding = '0';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    liveRegion.style.border = '0';
    document.body.appendChild(liveRegion);
  }
  
  // Очищаем предыдущее сообщение
  liveRegion.textContent = '';
  
  // Добавляем новое сообщение с небольшой задержкой
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
};

// Проверка клавиатурной навигации
export const isKeyboardNavigation = () => {
  return document.documentElement.classList.contains('keyboard-user') ||
         document.activeElement?.matches(':focus-visible');
};

// Инициализация доступности
export const initAccessibility = () => {
  // Добавляем класс для отслеживания клавиатурной навигации
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('keyboard-user');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.documentElement.classList.remove('keyboard-user');
  });
  
  // Создаем скрытый live регион
  updateLiveRegion('Приложение загружено', 'assertive');
};

// Валидация ARIA атрибутов
export const validateAriaAttributes = (element) => {
  const errors = [];
  
  if (element.hasAttribute('aria-labelledby')) {
    const labelId = element.getAttribute('aria-labelledby');
    const labelElement = document.getElementById(labelId);
    if (!labelElement) {
      errors.push(`Элемент с id="${labelId}" не найден для aria-labelledby`);
    }
  }
  
  if (element.hasAttribute('aria-describedby')) {
    const descId = element.getAttribute('aria-describedby');
    const descElement = document.getElementById(descId);
    if (!descElement) {
      errors.push(`Элемент с id="${descId}" не найден для aria-describedby`);
    }
  }
  
  return errors;
};