import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navigation({ isLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>
      
      <ul className="nav-menu">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Главная
          </Link>
        </li>
        <li>
          <Link to="/technologies" className={location.pathname.includes('/technologies') ? 'active' : ''}>
            Все технологии
          </Link>
        </li>
        <li>
          <Link to="/add-technology" className={location.pathname === '/add-technology' ? 'active' : ''}>
            Добавить
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>
            Статистика
          </Link>
        </li>
        
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                Панель управления
              </Link>
            </li>
            <li>
              <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
                Настройки
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Выйти
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              Войти
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;