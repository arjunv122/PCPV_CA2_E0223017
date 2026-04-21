import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Activities() {
  const { state } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = state.activities?.filter(activity =>
    activity?.id?.toString().includes(searchTerm) ||
    activity?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Activities</h1>
        <Link to="/activities/filter" className="btn btn-primary">Filters</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="input"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="filter-input"
        />
      </div>

      {state.loading ? (
        <p>Loading activities...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
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
            <p>No activities found</p>
          )}
        </div>
      )}
    </div>
  );
}
