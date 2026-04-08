import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Construct API endpoint using REACT_APP_CODESPACE_NAME environment variable
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const port = process.env.REACT_APP_CODESPACE_NAME ? '' : ':8000';
        const apiEndpoint = '-8000.app.github.dev/api/workouts';
        const apiUrl = `${protocol}://${codespace}${codespace === 'localhost' ? port : apiEndpoint}/`;
        
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Workouts list:', workoutsList);
        
        setWorkouts(workoutsList);
        setError(null);
      } catch (error) {
        console.error('Error fetching Workouts:', error);
        setError(error.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-lg mt-5 mb-5">
      <div className="component-container">
        <h2 className="mb-4">💪 Workouts</h2>
        {workouts.length === 0 ? (
          <div className="empty-state">
            <p>No workouts found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{width: '8%'}}>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th className="text-center" style={{width: '15%'}}>Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td className="text-center">{workout.id}</td>
                    <td>
                      <strong>{workout.name}</strong>
                    </td>
                    <td>{workout.description}</td>
                    <td className="text-center">
                      <span className="badge bg-success">{workout.duration}</span>
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

export default Workouts;
