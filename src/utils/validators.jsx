// Базовые валидаторы
export const required = (value) => {
  if (!value || value.toString().trim() === '') {
    return 'Это поле обязательно для заполнения';
  }
  return null;
};

export const minLength = (min) => (value) => {
  if (value && value.toString().length < min) {
    return `Минимум ${min} символов`;
  }
  return null;
};

export const maxLength = (max) => (value) => {
  if (value && value.toString().length > max) {
    return `Максимум ${max} символов`;
  }
  return null;
};

export const email = (value) => {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Введите корректный email адрес';
  }
  return null;
};

export const url = (value) => {
  if (value) {
    try {
      new URL(value);
    } catch (_) {
      return 'Введите корректный URL';
    }
  }
  return null;
};

export const dateNotInPast = (value) => {
  if (value) {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      return 'Дата не может быть в прошлом';
    }
  }
  return null;
};

// Составные валидаторы
export const composeValidators = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

// Схема валидации для TechnologyForm
export const technologyValidationSchema = {
  title: composeValidators(required, minLength(2), maxLength(50)),
  description: composeValidators(required, minLength(10), maxLength(500)),
  deadline: dateNotInPast,
  resources: (value) => {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] && url(value[i])) {
          return `Ресурс ${i + 1}: ${url(value[i])}`;
        }
      }
    }
    return null;
  }
};

// Функция валидации формы
export const validateForm = (values, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(key => {
    const validator = schema[key];
    const value = values[key];
    const error = validator(value);
    
    if (error) {
      errors[key] = error;
    }
  });
  
  return errors;
};  