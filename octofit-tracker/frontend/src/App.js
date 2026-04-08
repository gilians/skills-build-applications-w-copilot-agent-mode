import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    📋 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏅 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container-lg mt-5 mb-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="card border-0 shadow-lg">
            <div className="card-body text-center py-5">
              <h1 className="display-5 fw-bold mb-3">🐙 Welcome to OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                Track your fitness activities, manage your teams, and compete on the leaderboard!
              </p>
              <hr className="my-4" />
              <div className="row mt-5">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-light">
                    <div className="card-body">
                      <h5 className="card-title">👥 Users</h5>
                      <p className="card-text">Manage user profiles and personal information.</p>
                      <Link to="/users" className="btn btn-primary btn-sm">View Users</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-light">
                    <div className="card-body">
                      <h5 className="card-title">📋 Activities</h5>
                      <p className="card-text">Track and log your daily activities.</p>
                      <Link to="/activities" className="btn btn-primary btn-sm">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-light">
                    <div className="card-body">
                      <h5 className="card-title">💪 Workouts</h5>
                      <p className="card-text">Explore and manage your workout routines.</p>
                      <Link to="/workouts" className="btn btn-primary btn-sm">View Workouts</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100 border-light">
                    <div className="card-body">
                      <h5 className="card-title">🏆 Leaderboard</h5>
                      <p className="card-text">Check the competitive rankings.</p>
                      <Link to="/leaderboard" className="btn btn-primary btn-sm">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="card h-100 border-light">
                    <div className="card-body">
                      <h5 className="card-title">🏅 Teams</h5>
                      <p className="card-text">Create and manage team competitions.</p>
                      <Link to="/teams" className="btn btn-primary btn-sm">View Teams</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
