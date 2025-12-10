import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import TechnologySearch from './components/TechnologySearch';
import './App.css';

function App() {
  return (
      <Router>
        <div className="app">
          <Navigation />
          
          <div className="app-container">
            <aside className="app-sidebar">
              <TechnologySearch />
            </aside>
            
            <main className="app-main">
              <Routes>
                <Route path="/" element={<TechnologyList />} />
                <Route path="/technologies" element={<TechnologyList />} />
                <Route path="/technologies/:id" element={<TechnologyDetail />} />
                <Route path="/add-technology" element={<AddTechnology />} />
                <Route path="/statistics" element={<Statistics />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
}

export default App;