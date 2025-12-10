import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validateFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обработчик изменения полей
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Сразу валидируем при изменении, если поле уже было тронуто
    if (touched[name]) {
      const validationErrors = validateFn 
        ? validateFn({ ...values, [name]: value })
        : {};
      setErrors(prev => ({
        ...prev,
        [name]: validationErrors[name]
      }));
    }
  }, [values, touched, validateFn]);

  // Обработчик blur (потери фокуса)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Валидируем при потере фокуса
    if (validateFn) {
      const validationErrors = validateFn(values);
      setErrors(prev => ({
        ...prev,
        [name]: validationErrors[name]
      }));
    }
  }, [values, validateFn]);

  // Сброс формы
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Установка значений
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // Установка ошибок
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    setErrors,
    setTouched,
    setIsSubmitting
  };
};