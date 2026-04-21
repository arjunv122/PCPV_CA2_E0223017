import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ActivityFilter() {
  const { state } = useContext(AppContext);
  const [filters, setFilters] = useState({
    status: '',
    name: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredActivities = (state.activities || []).filter(activity => {
    if (filters.status && activity?.status !== filters.status) return false;
    if (filters.name && !activity?.name?.toLowerCase().includes(filters.name.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1>Filter Activities</h1>
      <Link to="/activities" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back to Activities</Link>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Filters</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            className="input"
            value={filters.status}
            onChange={handleFilterChange}
            placeholder="e.g., achieved"
            data-testid="filter-input"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="input"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Activity name"
            data-testid="filter-input"
          />
        </div>
      </div>

      <div className="grid">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <Link
              key={activity?.id}
              to={`/activities/${activity?.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card" data-testid="activity-item">
                <h3>{activity?.id}</h3>
                <p><strong>Name:</strong> {activity?.name}</p>
                <p><strong>Status:</strong> {activity?.status}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No activities match the filters</p>
        )}
      </div>
    </div>
  );
}
