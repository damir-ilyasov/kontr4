import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Трекер технологий</h1>
        <p>Отслеживайте прогресс изучения технологий и фреймворков</p>
        <div className="hero-actions">
          <Link to="/technologies" className="btn btn-primary">
            Посмотреть технологии
          </Link>
          <Link to="/add-technology" className="btn btn-secondary">
            Добавить технологию
          </Link>
        </div>
      </div>

      <div className="features">
        <h2>Возможности приложения</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 Отслеживание прогресса</h3>
            <p>Отмечайте статус изучения каждой технологии</p>
          </div>
          <div className="feature-card">
            <h3>🗂️ Категоризация</h3>
            <p>Группируйте технологии по категориям</p>
          </div>
          <div className="feature-card">
            <h3>📈 Статистика</h3>
            <p>Наглядные графики вашего прогресса</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;