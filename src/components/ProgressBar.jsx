import './ProgressBar.css';

function ProgressBar({ 
  progress = 0,
  label = '',
  color = '#4CAF50',
  backgroundColor = '#f0f0f0',
  height = 20,
  borderRadius = 10,
  showPercentage = true,
  showLabel = true,
  animated = false,
  striped = false,
  className = ''
}) {
  // Нормализуем прогресс от 0 до 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Автоматический выбор цвета на основе прогресса
  const getAutoColor = () => {
    if (normalizedProgress >= 80) return '#4CAF50';
    if (normalizedProgress >= 50) return '#FF9800';
    return '#F44336';
  };
  
  const finalColor = color === 'auto' ? getAutoColor() : color;

  return (
    <div className={`progress-bar-container ${className}`}>
      {(label && showLabel) && (
        <div className="progress-bar-label">
          <span>{label}</span>
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}
      
      <div 
        className="progress-bar-outer"
        style={{
          height: `${height}px`,
          backgroundColor,
          borderRadius: `${borderRadius}px`
        }}
      >
        <div
          className={`progress-bar-inner ${animated ? 'animated' : ''} ${striped ? 'striped' : ''}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: finalColor,
            borderRadius: `${borderRadius}px`,
            '--stripe-color': `${finalColor}40`
          }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {!showLabel && showPercentage && (
            <span className="progress-text">{normalizedProgress}%</span>
          )}
        </div>
      </div>
      
      {!showLabel && label && (
        <div className="progress-bar-caption">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;