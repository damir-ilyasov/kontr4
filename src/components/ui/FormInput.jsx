import React from 'react';
import FormError from './FormError';

const FormInput = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  options = [],
  rows,
  hideLabel = false,
  ...props
}) => {
  const inputId = id || name;
  const errorId = `${inputId}-error`;
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={error ? 'error' : ''}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            placeholder={placeholder}
            rows={rows}
            required={required}
            {...props}
          />
        );
        
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={error ? 'error' : ''}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            required={required}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      default:
        return (
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={error ? 'error' : ''}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            placeholder={placeholder}
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className="form-input">
      {!hideLabel && (
        <label htmlFor={inputId}>
          {label}
          {required && <span className="required" aria-hidden="true"> *</span>}
          {required && (
            <span className="sr-only"> (обязательное поле)</span>
          )}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <FormError id={errorId} message={error} />
      )}
    </div>
  );
};

export default FormInput;