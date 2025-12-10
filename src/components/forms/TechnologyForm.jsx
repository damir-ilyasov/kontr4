import React from 'react';
import { useForm } from '../../hooks/useForm';
import { technologyValidationSchema, validateForm } from '../../utils/validators';
import FormInput from '../ui/FormInput';
import FormError from '../ui/FormError';

const TechnologyForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const initialValues = {
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources || ['']
  };

  const validate = (values) => validateForm(values, technologyValidationSchema);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm
  } = useForm(initialValues, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate(values);
    const hasErrors = Object.keys(validationErrors).length > 0;
    
    if (!hasErrors) {
      const cleanedData = {
        ...values,
        resources: values.resources.filter(r => r.trim() !== '')
      };
      onSubmit(cleanedData);
      resetForm();
    }
  };

  const addResource = () => {
    setFieldValue('resources', [...values.resources, '']);
  };

  const removeResource = (index) => {
    if (values.resources.length > 1) {
      const newResources = values.resources.filter((_, i) => i !== index);
      setFieldValue('resources', newResources);
    }
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...values.resources];
    newResources[index] = value;
    setFieldValue('resources', newResources);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="technology-form"
      aria-labelledby="form-title"
      noValidate
    >
      <h2 id="form-title">
        {initialData.id ? 'Редактирование технологии' : 'Добавление новой технологии'}
      </h2>

      <FormInput
        id="title"
        name="title"
        label="Название технологии *"
        type="text"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title && errors.title}
        required
        placeholder="Например: React, Node.js, TypeScript"
      />

      <FormInput
        id="description"
        name="description"
        label="Описание *"
        type="textarea"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description && errors.description}
        required
        rows={4}
        placeholder="Опишите, что это за технология и зачем её изучать..."
      />

      <FormInput
        id="category"
        name="category"
        label="Категория"
        type="select"
        value={values.category}
        onChange={handleChange}
        options={[
          { value: 'frontend', label: 'Frontend' },
          { value: 'backend', label: 'Backend' },
          { value: 'mobile', label: 'Mobile' },
          { value: 'devops', label: 'DevOps' },
          { value: 'database', label: 'Базы данных' },
          { value: 'tools', label: 'Инструменты' }
        ]}
      />

      <FormInput
        id="difficulty"
        name="difficulty"
        label="Уровень сложности"
        type="select"
        value={values.difficulty}
        onChange={handleChange}
        options={[
          { value: 'beginner', label: 'Начинающий' },
          { value: 'intermediate', label: 'Средний' },
          { value: 'advanced', label: 'Продвинутый' }
        ]}
      />

      <FormInput
        id="deadline"
        name="deadline"
        label="Планируемая дата освоения"
        type="date"
        value={values.deadline}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.deadline && errors.deadline}
      />

      <div className="form-group">
        <label>Ресурсы для изучения</label>
        {values.resources.map((resource, index) => (
          <div key={index} className="resource-field-group">
            <FormInput
              id={`resource-${index}`}
              name={`resource-${index}`}
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              onBlur={handleBlur}
              error={touched[`resource-${index}`] && errors.resources}
              placeholder="https://example.com"
              hideLabel
            />
            {values.resources.length > 1 && (
              <button
                type="button"
                onClick={() => removeResource(index)}
                className="remove-resource"
                aria-label={`Удалить ресурс ${index + 1}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addResource}
          className="btn-add-resource"
        >
          + Добавить ресурс
        </button>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="btn-primary"
        >
          {initialData.id ? 'Обновить' : 'Добавить'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default TechnologyForm;