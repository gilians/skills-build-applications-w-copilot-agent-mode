import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Construct API endpoint using REACT_APP_CODESPACE_NAME environment variable
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const port = process.env.REACT_APP_CODESPACE_NAME ? '' : ':8000';
        const apiUrl = `${protocol}://${codespace}${codespace === 'localhost' ? port : '-8000.app.github.dev'}/api/activities/`;
        
        console.log('Fetching Activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Activities list:', activitiesList);
        
        setActivities(activitiesList);
        setError(null);
      } catch (error) {
        console.error('Error fetching Activities:', error);
        setError(error.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-lg mt-5 mb-5">
      <div className="component-container">
        <h2 className="mb-4">📋 Activities</h2>
        {activities.length === 0 ? (
          <div className="empty-state">
            <p>No activities found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{width: '10%'}}>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="text-center">{activity.id}</td>
                    <td>
                      <strong>{activity.name}</strong>
                    </td>
                    <td>{activity.description}</td>
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

export default Activities;
