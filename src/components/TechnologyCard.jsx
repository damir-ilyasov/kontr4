import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
  return (
    <div className={`technology-card ${status}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <div className={`status-badge ${status}`}>
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;