import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Construct API endpoint using REACT_APP_CODESPACE_NAME environment variable
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const port = process.env.REACT_APP_CODESPACE_NAME ? '' : ':8000';
        const apiUrl = `${protocol}://${codespace}${codespace === 'localhost' ? port : '-8000.app.github.dev'}/api/teams/`;
        
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Teams list:', teamsList);
        
        setTeams(teamsList);
        setError(null);
      } catch (error) {
        console.error('Error fetching Teams:', error);
        setError(error.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-lg mt-5 mb-5">
      <div className="component-container">
        <h2 className="mb-4">🏆 Teams</h2>
        {teams.length === 0 ? (
          <div className="empty-state">
            <p>No teams found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{width: '8%'}}>ID</th>
                  <th>Team Name</th>
                  <th>Description</th>
                  <th className="text-center" style={{width: '12%'}}>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td className="text-center">{team.id}</td>
                    <td>
                      <strong>{team.name}</strong>
                    </td>
                    <td>{team.description}</td>
                    <td className="text-center">
                      <span className="badge bg-info">{team.members ? team.members.length : 0}</span>
                    </td>
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

export default Teams;
