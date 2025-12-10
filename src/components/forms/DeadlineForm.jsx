import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { validateForm } from '../../utils/validators';

const deadlineValidationSchema = {
  startDate: (value) => {
    if (!value) return 'Укажите дату начала';
    return null;
  },
  endDate: (value, values) => {
    if (!value) return 'Укажите дату завершения';
    if (values.startDate && new Date(value) < new Date(values.startDate)) {
      return 'Дата завершения должна быть позже даты начала';
    }
    return null;
  },
  hoursPerWeek: (value) => {
    if (!value) return 'Укажите количество часов в неделю';
    if (value < 1 || value > 40) {
      return 'Введите значение от 1 до 40 часов';
    }
    return null;
  }
};

const DeadlineForm = ({ technology, onSubmit }) => {
  const [estimatedHours, setEstimatedHours] = useState(0);
  
  const { values, errors, touched, handleChange, handleBlur } = useForm(
    {
      startDate: '',
      endDate: '',
      hoursPerWeek: 10,
      priority: 'medium',
      reminder: false,
      reminderDays: 7
    },
    (values) => validateForm(values, deadlineValidationSchema)
  );

  // Расчет времени
  const calculateTimeline = () => {
    if (values.startDate && values.endDate && values.hoursPerWeek) {
      const start = new Date(values.startDate);
      const end = new Date(values.endDate);
      const weeks = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));
      const totalHours = weeks * values.hoursPerWeek;
      setEstimatedHours(totalHours);
      return totalHours;
    }
    return 0;
  };

  React.useEffect(() => {
    calculateTimeline();
  }, [values.startDate, values.endDate, values.hoursPerWeek]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm(values, deadlineValidationSchema);
    if (Object.keys(errors).length === 0) {
      onSubmit({
        ...values,
        technologyId: technology.id,
        estimatedHours,
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="deadline-form">
      <h3>Планирование изучения: {technology.title}</h3>
      
      <div className="date-range">
        <div className="form-group">
          <label htmlFor="startDate">Дата начала *</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={values.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.startDate ? 'error' : ''}
            aria-describedby={errors.startDate ? 'startDate-error' : undefined}
            aria-invalid={!!errors.startDate}
            required
          />
          {errors.startDate && (
            <div id="startDate-error" className="error-message">
              {errors.startDate}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">Дата завершения *</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={values.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.endDate ? 'error' : ''}
            aria-describedby={errors.endDate ? 'endDate-error' : undefined}
            aria-invalid={!!errors.endDate}
            required
          />
          {errors.endDate && (
            <div id="endDate-error" className="error-message">
              {errors.endDate}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="hoursPerWeek">
          Часов в неделю * (рекомендуется 10-20)
        </label>
        <input
          id="hoursPerWeek"
          name="hoursPerWeek"
          type="range"
          min="1"
          max="40"
          value={values.hoursPerWeek}
          onChange={handleChange}
          className="hours-slider"
        />
        <div className="slider-value">{values.hoursPerWeek} часов/неделю</div>
      </div>

      <div className="form-group">
        <label htmlFor="priority">Приоритет</label>
        <select
          id="priority"
          name="priority"
          value={values.priority}
          onChange={handleChange}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
          <option value="critical">Критический</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="reminder"
            checked={values.reminder}
            onChange={handleChange}
          />
          Напоминать о дедлайне
        </label>
        
        {values.reminder && (
          <div className="reminder-settings">
            <label htmlFor="reminderDays">
              За сколько дней напоминать:
            </label>
            <input
              id="reminderDays"
              name="reminderDays"
              type="number"
              min="1"
              max="30"
              value={values.reminderDays}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="timeline-summary">
        <h4>Сводка плана:</h4>
        <ul>
          <li>Недель: {Math.ceil(estimatedHours / values.hoursPerWeek)}</li>
          <li>Всего часов: {estimatedHours}</li>
          <li>Часов в день: {(values.hoursPerWeek / 7).toFixed(1)}</li>
        </ul>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="btn-primary"
        >
          Сохранить план
        </button>
      </div>
    </form>
  );
};

export default DeadlineForm;