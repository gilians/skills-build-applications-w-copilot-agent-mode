import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Construct API endpoint using REACT_APP_CODESPACE_NAME environment variable
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const port = process.env.REACT_APP_CODESPACE_NAME ? '' : ':8000';
        const apiUrl = `${protocol}://${codespace}${codespace === 'localhost' ? port : '-8000.app.github.dev'}/api/leaderboard/`;
        
        console.log('Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Leaderboard list:', leaderboardList);
        
        setLeaderboard(leaderboardList);
        setError(null);
      } catch (error) {
        console.error('Error fetching Leaderboard:', error);
        setError(error.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-warning text-dark';
    return 'bg-primary';
  };

  return (
    <div className="container-lg mt-5 mb-5">
      <div className="component-container">
        <h2 className="mb-4">🏅 Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <div className="empty-state">
            <p>No leaderboard data found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{width: '10%'}}>Rank</th>
                  <th>User</th>
                  <th className="text-center" style={{width: '12%'}}>Score</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td className="text-center">
                      <span className={`badge ${getRankBadgeColor(index + 1)}`}>{index + 1}</span>
                    </td>
                    <td>
                      <strong>{entry.user ? entry.user.username : entry.username}</strong>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-success fs-6">{entry.score}</span>
                    </td>
                    <td>{entry.team ? entry.team.name : entry.team_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
