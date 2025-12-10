import React from 'react';

const FormError = ({ id, message }) => {
  return (
    <div
      id={id}
      className="form-error"
      role="alert"
      aria-live="polite"
    >
      <span className="error-icon" aria-hidden="true">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
};

export default FormError;