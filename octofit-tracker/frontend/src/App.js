import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <BrowserRouter>
      <div className="App container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4">
          <div className="container-fluid">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navbar-brand d-flex align-items-center gap-2${isActive ? ' active' : ''}`
              }
            >
              <img
                src="/octofitapp-small.svg"
                alt="OctoFit Tracker logo"
                className="app-logo"
              />
              <div>
                <div className="fs-5 mb-0">OctoFit Tracker</div>
                <small className="text-muted">Fitness progress, teams, and leaderboards</small>
              </div>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#octofitNavbar"
              aria-controls="octofitNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="octofitNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/activities"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/leaderboard"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/teams"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/workouts"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
