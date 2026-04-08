import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Construct API endpoint using REACT_APP_CODESPACE_NAME environment variable
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const port = process.env.REACT_APP_CODESPACE_NAME ? '' : ':8000';
        const apiEndpoint = '-8000.app.github.dev/api/users';
        const apiUrl = `${protocol}://${codespace}${codespace === 'localhost' ? port : apiEndpoint}/`;
        
        console.log('Fetching Users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersList = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Users list:', usersList);
        
        setUsers(usersList);
        setError(null);
      } catch (error) {
        console.error('Error fetching Users:', error);
        setError(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-lg mt-5 mb-5">
      <div className="component-container">
        <h2 className="mb-4">👥 Users</h2>
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{width: '8%'}}>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-center">{user.id}</td>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
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

export default Users;
